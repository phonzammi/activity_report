<?php

namespace App\Http\Controllers;

use App\Http\Requests\MonthlyReport\StoreMonthlyReportRequest;
use App\Http\Requests\MonthlyReport\UpdateMonthlyReportRequest;
use App\Http\Resources\MonthlyReports\MonthlyReportShowResource;
use App\Http\Resources\MonthlyReports\MonthlyReportsResource;
use App\Models\MonthlyReport;
use App\Models\Notification;
use App\Models\Project;
use App\Models\Role;
use App\Models\User;
use App\Notifications\ApproveRequestNotification;
use App\Notifications\DenyApprovalRequestNotification;
use App\Notifications\RequestForApprovalNotification;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MonthlyReportController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', MonthlyReport::class);

        $monthly_reports = MonthlyReport::with('project.client')->paginate();

        return Inertia::render("MonthlyReport/Index",[
            'monthlyReports' => MonthlyReportsResource::collection($monthly_reports)
        ]);
    }

    public function create()
    {
        $this->authorize('create', MonthlyReport::class);

        $month_start = Carbon::now()->startOfMonth();
        $month_end = Carbon::now()->endOfMonth();

        $projects = Project::whereHas('dailyReports', function (Builder $query) use ($month_start, $month_end) {
            $query->whereNotNull('approved_by')->whereNotNull('weekly_report_id')->whereNull('monthly_report_id')->whereBetween('created_at', [$month_start, $month_end]);
        })->get();

        return Inertia::render("MonthlyReport/Create", [
            'projects' => $projects
        ]);
    }

    public function store(StoreMonthlyReportRequest $request)
    {
        $this->authorize('create', MonthlyReport::class);

        $posts = $request->validated();

        $posts['issued_by'] = auth()->user()->id;

        $new_monthly_report = MonthlyReport::create($posts);

        $month_start = Carbon::now()->startOfMonth();
        $month_end = Carbon::now()->endOfMonth();

        $project = Project::with(['dailyReports' => function ($query) use ($month_start, $month_end) {
            $query->whereNotNull('approved_by')->whereNotNull('weekly_report_id')->whereNull('monthly_report_id')->whereBetween('created_at', [$month_start, $month_end]);
        }])->find($new_monthly_report->project_id);

        if ($project && $project->dailyReports->count() > 0) {
            foreach ($project->dailyReports as $daily_report) {
                $daily_report->monthlyReport()->associate($new_monthly_report)->save();
            }
        }

        return to_route("monthly-reports.show", $new_monthly_report)->with('success', "Monthly Report Baru Berhasil Ditambahkan");
    }

    public function show(MonthlyReport $monthly_report)
    {
        $this->authorize('view', $monthly_report);

        $notification = auth()->user()->notifications()->where('data->report->id', $monthly_report->id)->whereNull('replied_at')->first();
        if ($notification) {
            $notification->markAsRead();

            if ($notification['data']['type'] == "Request Approved") {
                $notification->update(['replied_at' => Carbon::now()]);
            }
        }
        $monthly_report->loadMissing([
            'project.client',
            'personels' => function ($query) {
                $query->select(
                    "personels.id",
                    "personels.direction_id",
                    "personels.personel_name",
                    "personels.unit",
                    "personels.manhours_unit",
                    "personels.remarks",
                    DB::raw("(sum(personels.today)) as today"),
                    DB::raw("(sum(personels.manhours_prev)) as manhours_prev"),
                    DB::raw("(sum(personels.manhours_daily_total)) as manhours_daily_total"),
                    DB::raw("(sum(personels.manhours_cum)) as manhours_cum"),
                )->groupBy("personels.personel_name");
            },
            'hseStatistics' => function ($query) {
                $query->select(
                    "hse_statistics.id",
                    "hse_statistics.description",
                    "hse_statistics.unit",
                    // DB::raw("(sum(hse_statistics.unit)) as unit"),
                    DB::raw("(sum(hse_statistics.total)) as total"),
                )->groupBy("hse_statistics.description");
            },
            'equipment' => function ($query) {
                $query->select(
                    "equipment.id",
                    "equipment.description",
                    "equipment.unit",
                    DB::raw("(sum(equipment.total)) as total"),
                )->groupBy("equipment.description");
            },
            'activities' => function($query){
                $query->with('documentations');
            }
        ]);

        if (auth()->user()->role_id == Role::IS_HSE_SUPERVISOR) {
            return Inertia::render("HSE/Supervisor/ShowMonthlyReport", [
            // return Inertia::render("HSESupervisor/MonthlyReport/Show", [
                'notification' => $notification,
                'monthlyReport' => new MonthlyReportShowResource($monthly_report)
            ]);
        }

        return Inertia::render("MonthlyReport/Show", [
            'notification' => $notification,
            'unrepliedNotification' => Notification::where('data->report->id', $monthly_report->id)->where('data->user->id', auth()->user()->id)->whereNull('replied_at')->latest()->first(),
            'monthlyReport' => new MonthlyReportShowResource($monthly_report)
        ]);
    }

    public function edit(MonthlyReport $monthly_report)
    {
        $this->authorize('update', $monthly_report);

        return Inertia::render("MonthlyReport/Edit", [
            "monthlyReport" => $monthly_report->loadMissing('project'),
        ]);
    }

    public function update(UpdateMonthlyReportRequest $request, MonthlyReport $monthly_report)
    {
        $this->authorize('update', $monthly_report);

        $posts = $request->validated();

        $monthly_report->update($posts);

        return to_route("monthly-reports.show", $monthly_report)->with("success", "Perubahan Berhasil Disimpan");
    }

    public function delete(MonthlyReport $monthly_report)
    {
        $this->authorize('delete', $monthly_report);

        $monthly_report->delete();

        return redirect()->back()->with('success', "Berhasil Menghapus Monthly Report");
    }

    public function request_for_approval(MonthlyReport $monthly_report, Notification $notification = null)
    {
        $this->authorize('request_for_approval', $monthly_report);

        if ($notification) {
            $notification->update(['replied_at' => Carbon::now()]);
        }

        if (Notification::where('data->report->id', $monthly_report->id)->whereNull('replied_at')->first()) {
            return to_route('monthly-reports.show', $monthly_report)->with('info', "Request for Approval sudah dikirim dan menunggu balasan HSE Supervisor");
        }

        if (!$monthly_report->personels->count() > 0 || !$monthly_report->hseStatistics->count() > 0 || !$monthly_report->equipment->count() > 0 || !$monthly_report->activities->count() > 0) {
            return to_route('monthly-reports.show', $monthly_report)->with('error', "Data Monthly Report belum lengkap!!");
        }

        $monthly_report->unsetRelations();
        $monthly_report->setAppends([]);

        // Notifikasi ke HSE Supervisor
        $hse_supervisor = User::where('role_id', Role::IS_HSE_SUPERVISOR)->first();

        $hse_supervisor->notify(new RequestForApprovalNotification($monthly_report, auth()->user(), "Monthly"));

        return redirect()->back()->with('success', "Permintaan Telah dikirim, Mohon tunggu jawaban!");
    }

    public function approve_request(MonthlyReport $monthly_report, Notification $notification)
    {
        $this->authorize('approve_request', $monthly_report);

        $notification->update(['replied_at' => Carbon::now()]);

        $monthly_report->update(['approved_by' => auth()->user()->id]);

        // Notifikasi ke HSE Officer
        $hse_officer = User::find($notification['data']['user']['id']);

        $hse_officer->notify(new ApproveRequestNotification($monthly_report, auth()->user(), "Monthly"));

        return redirect()->back()->with('success', "Persetujuan Telah dikirim!");
    }

    public function deny_approval(Request $request, MonthlyReport $monthly_report, Notification $notification)
    {
        $this->authorize('deny_approval', $monthly_report);

        $request->validate([
            'message' => 'required|string'
        ]);

        $notification->update(['replied_at' => Carbon::now()]);

        // Notifikasi ke HSE Officer
        $hse_officer = User::find($notification['data']['user']['id']);

        $hse_officer->notify(new DenyApprovalRequestNotification($monthly_report, auth()->user(), "Monthly", str($request->message)->title()));

        return redirect()->back()->with('success', "Penolakan Telah dikirim!");
    }

    public function export_view(MonthlyReport $monthly_report)
    {
        $this->authorize('export', $monthly_report);

        $monthly_report->loadMissing([
            'project.client',
            'personels' => function ($query) {
                $query->select(
                    "personels.id",
                    "personels.direction_id",
                    "personels.personel_name",
                    "personels.unit",
                    "personels.manhours_unit",
                    "personels.remarks",
                    DB::raw("(sum(personels.today)) as today"),
                    DB::raw("(sum(personels.manhours_prev)) as manhours_prev"),
                    DB::raw("(sum(personels.manhours_daily_total)) as manhours_daily_total"),
                    DB::raw("(sum(personels.manhours_cum)) as manhours_cum"),
                )->groupBy("personels.personel_name");
            },
            'hseStatistics' => function ($query) {
                $query->select(
                    "hse_statistics.id",
                    "hse_statistics.description",
                    "hse_statistics.unit",
                    // DB::raw("(sum(hse_statistics.unit)) as unit"),
                    DB::raw("(sum(hse_statistics.total)) as total"),
                )->groupBy("hse_statistics.description");
            },
            'equipment' => function ($query) {
                $query->select(
                    "equipment.id",
                    "equipment.description",
                    "equipment.unit",
                    DB::raw("(sum(equipment.total)) as total"),
                )->groupBy("equipment.description");
            },
            'activities' => function($query){
                $query->with('documentations');
            }
        ]);

        $indirect_personels = $monthly_report->personels->where('direction_id', 1);
        $direct_personels = $monthly_report->personels->where('direction_id', 2);

        return view("monthly_report.show", [
            'monthly_report' => $monthly_report,
            'indirect_personels' => $indirect_personels,
            'direct_personels' => $direct_personels,
        ]);
    }
}

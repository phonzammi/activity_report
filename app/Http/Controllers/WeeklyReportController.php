<?php

namespace App\Http\Controllers;

use App\Http\Requests\WeeklyReport\StoreWeeklyReportRequest;
use App\Http\Requests\WeeklyReport\UpdateWeeklyReportRequest;
use App\Http\Resources\WeeklyReports\WeeklyReportShowResource;
use App\Http\Resources\WeeklyReports\WeeklyReportsResource;
use App\Models\Notification;
use App\Models\Project;
use App\Models\Role;
use App\Models\User;
use App\Models\WeeklyReport;
use App\Notifications\ApproveRequestNotification;
use App\Notifications\DenyApprovalRequestNotification;
use App\Notifications\RequestForApprovalNotification;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class WeeklyReportController extends Controller
{

    public function index()
    {
        $this->authorize('viewAny', WeeklyReport::class);
        $weekly_reports = WeeklyReport::with('project.client')->paginate();

        return Inertia::render("WeeklyReport/Index",[
            'weeklyReports' => WeeklyReportsResource::collection($weekly_reports)
        ]);
    }

    public function create()
    {
        $this->authorize('create', WeeklyReport::class);
        $week_start = Carbon::now()->startOfWeek();
        $week_end = Carbon::now()->endOfWeek();

        $projects = Project::whereHas('dailyReports', function (Builder $query) use ($week_start, $week_end) {
            $query->whereNotNull('approved_by')->whereNull('weekly_report_id')->whereBetween('created_at', [$week_start, $week_end]);
        })->get();

        return Inertia::render("WeeklyReport/Create", [
            'projects' => $projects
        ]);
    }

    public function store(StoreWeeklyReportRequest $request)
    {
        $this->authorize('create', WeeklyReport::class);

        $posts = $request->validated();

        $posts['issued_by'] = auth()->user()->id;

        $new_weekly_report = WeeklyReport::create($posts);

        $week_start = Carbon::now()->startOfWeek();
        $week_end = Carbon::now()->endOfWeek();

        $project = Project::with(['dailyReports' => function ($query) use ($week_start, $week_end) {
            $query->whereNotNull('approved_by')->whereNull('weekly_report_id')->whereBetween('created_at', [$week_start, $week_end]);
        }])->find($new_weekly_report->project_id);

        if ($project && $project->dailyReports->count() > 0) {
            foreach ($project->dailyReports as $daily_report) {
                $daily_report->weeklyReport()->associate($new_weekly_report)->save();
            }
        }

        return to_route("weekly-reports.show", $new_weekly_report)->with('success', "Weekly Report Baru Berhasil Ditambahkan");
    }

    public function show(WeeklyReport $weekly_report)
    {
        $this->authorize('view', $weekly_report);
        $notification = auth()->user()->notifications()->where('data->report->id', $weekly_report->id)->whereNull('replied_at')->first();
        if ($notification) {
            $notification->markAsRead();

            if ($notification['data']['type'] == "Request Approved") {
                $notification->update(['replied_at' => Carbon::now()]);
            }
        }
        $weekly_report->loadMissing([
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
            return Inertia::render("HSE/Supervisor/ShowWeeklyReport", [
                'notification' => $notification,
                'weeklyReport' => new WeeklyReportShowResource($weekly_report)
            ]);
        }

        return Inertia::render("WeeklyReport/Show", [
            'notification' => $notification,
            'unrepliedNotification' => Notification::where('data->report->id', $weekly_report->id)->where('data->user->id', auth()->user()->id)->whereNull('replied_at')->latest()->first(),
            'weeklyReport' => new WeeklyReportShowResource($weekly_report)
        ]);
    }

    public function edit(WeeklyReport $weekly_report)
    {
        $this->authorize('update', $weekly_report);

        return Inertia::render("WeeklyReport/Edit", [
            "weeklyReport" => $weekly_report->loadMissing('project'),
        ]);
    }

    public function update(UpdateWeeklyReportRequest $request, WeeklyReport $weekly_report)
    {
        $this->authorize('update', $weekly_report);

        $posts = $request->validated();

        $weekly_report->update($posts);

        return to_route("weekly-reports.show", $weekly_report)->with("success", "Perubahan Berhasil Disimpan");
    }

    public function delete(WeeklyReport $weekly_report)
    {
        $this->authorize('delete', $weekly_report);

        $weekly_report->delete();

        return redirect()->back()->with('success', "Berhasil Menghapus Weekly Report");
    }

    public function request_for_approval(WeeklyReport $weekly_report, Notification $notification = null)
    {
        $this->authorize('request_for_approval', $weekly_report);

        if ($notification) {
            $notification->update(['replied_at' => Carbon::now()]);
        }

        if (Notification::where('data->report->id', $weekly_report->id)->whereNull('replied_at')->first()) {
            return to_route('weekly-reports.show', $weekly_report)->with('info', "Request for Approval sudah dikirim dan menunggu balasan HSE Supervisor");
        }

        if (!$weekly_report->personels->count() > 0 || !$weekly_report->hseStatistics->count() > 0 || !$weekly_report->equipment->count() > 0 || !$weekly_report->activities->count() > 0) {
            return to_route('weekly-reports.show', $weekly_report)->with('error', "Data Weekly Report belum lengkap!!");
        }

        $weekly_report->unsetRelations();
        $weekly_report->setAppends([]);

        // Notifikasi ke HSE Supervisor
        $hse_supervisor = User::where('role_id', Role::IS_HSE_SUPERVISOR)->first();

        $hse_supervisor->notify(new RequestForApprovalNotification($weekly_report, auth()->user(), "Weekly"));

        return redirect()->back()->with('success', "Permintaan Telah dikirim, Mohon tunggu jawaban!");
    }

    public function approve_request(WeeklyReport $weekly_report, Notification $notification)
    {
        $this->authorize('approve_request', $weekly_report);

        $notification->update(['replied_at' => Carbon::now()]);

        $weekly_report->update(['approved_by' => auth()->user()->id]);

        // Notifikasi ke HSE Officer
        $hse_officer = User::find($notification['data']['user']['id']);

        $hse_officer->notify(new ApproveRequestNotification($weekly_report, auth()->user(), "Weekly"));

        return redirect()->back()->with('success', "Persetujuan Telah dikirim!");
    }

    public function deny_approval(Request $request, WeeklyReport $weekly_report, Notification $notification)
    {
        $this->authorize('deny_approval', $weekly_report);

        $request->validate([
            'message' => 'required|string'
        ]);

        $notification->update(['replied_at' => Carbon::now()]);

        // Notifikasi ke HSE Officer
        $hse_officer = User::find($notification['data']['user']['id']);

        $hse_officer->notify(new DenyApprovalRequestNotification($weekly_report, auth()->user(), "Weekly", str($request->message)->title()));

        return redirect()->back()->with('success', "Penolakan Telah dikirim!");
    }

    public function export_view(WeeklyReport $weekly_report)
    {
        $this->authorize('export', $weekly_report);

        $weekly_report->loadMissing([
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

        $indirect_personels = $weekly_report->personels->where('direction_id', 1);
        $direct_personels = $weekly_report->personels->where('direction_id', 2);

        return view("weekly_report.show", [
            'weekly_report' => $weekly_report,
            'indirect_personels' => $indirect_personels,
            'direct_personels' => $direct_personels,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\DailyReport\StoreDailyReportRequest;
use App\Http\Requests\DailyReport\UpdateDailyReportRequest;
use App\Http\Resources\DailyReports\DailyReportEditResource;
use App\Http\Resources\DailyReports\DailyReportsResource;
use App\Http\Resources\DailyReports\DailyReportShowResource;
use App\Http\Resources\Projects\ProjectsResource;
use App\Models\DailyReport;
use App\Models\Notification;
use App\Models\Project;
use App\Models\Role;
use App\Models\User;
use App\Notifications\ApproveRequestNotification;
use App\Notifications\DenyApprovalRequestNotification;
use App\Notifications\RequestForApprovalNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DailyReportController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', DailyReport::class);
        $daily_reports = DailyReport::with(['project' => function($query){
            $query->with('client');
        }])->paginate();
        return Inertia::render("DailyReport/Index", [
            "dailyReports" => DailyReportsResource::collection($daily_reports)
        ]);
    }

    public function create()
    {
        $this->authorize('create', DailyReport::class);
        $projects = Project::all();
        return Inertia::render("DailyReport/Create", [
            'projects' => ProjectsResource::collection($projects)
        ]);
    }

    public function store(StoreDailyReportRequest $request)
    {
        $this->authorize('create', DailyReport::class);
        $posts = $request->validated();

        $posts['issued_by'] = auth()->user()->id;

        $new_daily_report = DailyReport::create($posts);

        return to_route('daily-reports.show', $new_daily_report)->with('success', "Daily Report Baru Berhasil Ditambahkan");
    }

    public function show(DailyReport $daily_report)
    {
        $this->authorize('view', $daily_report);
        $daily_report->loadMissing(['project' => function ($query) {
            $query->with('client');
        }, 'personels', 'hseStatistics', 'equipment', 'activities']);
        $notification = auth()->user()->notifications()->where('data->report->id', $daily_report->id)->whereNull('replied_at')->first();
        if ($notification) {
            $notification->markAsRead();

            if ($notification['data']['type'] == "Request Approved") {
                $notification->update(['replied_at' => Carbon::now()]);
            }
        }
        if (auth()->user()->role_id == Role::IS_HSE_COORDINATOR) {
            return Inertia::render("HSE/Coordinator/ShowDailyReport", [
                'notification' => $notification,
                'dailyReport' => new DailyReportShowResource($daily_report)
            ]);
        }
        return Inertia::render("DailyReport/Show", [
            'notification' => $notification,
            'unrepliedNotification' => Notification::where('data->report->id', $daily_report->id)->where('data->user->id', auth()->user()->id)->whereNull('replied_at')->latest()->first(),
            'dailyReport' => new DailyReportShowResource($daily_report)
        ]);
    }

    public function edit(DailyReport $daily_report)
    {
        $this->authorize('update', $daily_report);

        $projects = Project::all();

        return Inertia::render("DailyReport/Edit", [
            "dailyReport" => new DailyReportEditResource($daily_report->loadMissing("project")),
            'projects' => ProjectsResource::collection($projects)
        ]);
    }

    public function update(UpdateDailyReportRequest $request, DailyReport $daily_report)
    {
        $this->authorize('update', $daily_report);

        $posts = $request->validated();
        $daily_report->update($posts);

        return to_route("daily-reports.show", $daily_report)->with("success", "Perubahan Berhasil Disimpan");
    }

    public function delete(DailyReport $daily_report)
    {
        $this->authorize('delete', $daily_report);

        if ($daily_report->delete()) {
            Storage::disk('public')->deleteDirectory("clients/{$daily_report->project->client_id}/projects/{$daily_report->project_id}/daily_reports/{$daily_report->id}");
        }

        return redirect()->back()->with('success', "Berhasil Menghapus Daily Report");
    }

    public function request_for_approval(DailyReport $daily_report, Notification $notification = null)
    {
        $this->authorize('request_for_approval', $daily_report);

        if ($notification) {
            $notification->update(['replied_at' => Carbon::now()]);
        }

        if (Notification::where('data->report->id', $daily_report->id)->whereNull('replied_at')->first()) {
            return to_route('daily-reports.show', $daily_report)->with('info', "Request for Approval sudah dikirim dan menunggu balasan Project Manager");
        }

        if (!$daily_report->personels->count() > 0 || !$daily_report->hseStatistics->count() > 0 || !$daily_report->equipment->count() > 0) {
            return to_route('daily-reports.show', $daily_report)->with('error', "Data Daily Report belum lengkap!!");
        }

        $daily_report->unsetRelations();
        $daily_report->setAppends([]);

        // Notifikasi ke HSE Coordinator
        $project_manager = User::where('role_id', Role::IS_HSE_COORDINATOR)->first();

        $project_manager->notify(new RequestForApprovalNotification($daily_report, auth()->user(), "Daily"));

        return redirect()->back()->with('success', "Permintaan Telah dikirim, Mohon tunggu jawaban!");
    }

    public function approve_request(DailyReport $daily_report, Notification $notification)
    {
        $this->authorize('approve_request', $daily_report);

        $notification->update(['replied_at' => Carbon::now()]);

        $daily_report->update(['approved_by' => auth()->user()->id]);

        // Notifikasi ke HSE Officer
        $hse_officer = User::find($notification['data']['user']['id']);

        $hse_officer->notify(new ApproveRequestNotification($daily_report, auth()->user(), "Daily"));

        return redirect()->back()->with('success', "Persetujuan Telah dikirim!");
    }

    public function deny_approval(Request $request, DailyReport $daily_report, Notification $notification)
    {
        $this->authorize('deny_approval', $daily_report);

        $request->validate([
            'message' => 'required|string'
        ]);

        $notification->update(['replied_at' => Carbon::now()]);

        // Notifikasi ke HSE Officer
        $hse_officer = User::find($notification['data']['user']['id']);

        $hse_officer->notify(new DenyApprovalRequestNotification($daily_report, auth()->user(), "Daily", str($request->message)->title()));

        return redirect()->back()->with('success', "Penolakan Telah dikirim!");
    }

    public function export_view(DailyReport $daily_report)
    {
        $this->authorize('export', $daily_report);

        $daily_report->loadMissing(['project' => function ($query) {
            $query->with('client');
        }, 'personels', 'hseStatistics', 'equipment', 'activities']);
        $indirect_personels = $daily_report->personels->where('direction_id', 1);
        $direct_personels = $daily_report->personels->where('direction_id', 2);

        return view("daily_report.show", [
            'daily_report' => $daily_report,
            'indirect_personels' => $indirect_personels,
            'direct_personels' => $direct_personels,
        ]);
    }
}

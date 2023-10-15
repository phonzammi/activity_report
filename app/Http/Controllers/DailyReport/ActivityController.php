<?php

namespace App\Http\Controllers\DailyReport;

use App\Http\Controllers\Controller;
use App\Http\Requests\DailyReport\StoreActivityRequest;
use App\Http\Requests\DailyReport\UpdateActivityRequest;
use App\Models\Activity;
use App\Models\DailyReport;
use App\Models\Documentation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class ActivityController extends Controller
{
    public function store(StoreActivityRequest $request, DailyReport $daily_report)
    {
        $this->authorize('manage_activities', $daily_report);
        $posts = $request->validated();
        $posts['daily_report_id'] = $daily_report->id;
        unset($posts['documentations']);

        $new_activity = Activity::create($posts);

        if ($new_activity->count() && $request->hasFile('documentations')) {
            foreach ($request->documentations as $documentation) {
                $documentation_name = 'document-' . $new_activity->id . "-" . uniqid() . '-' . Carbon::now()->isoFormat("D_MMMM_Y") . ".{$documentation->extension()}";
                $document_path =  $documentation->storeAs("document-images", $documentation_name, 'public');
                $new_activity->documentations()->create([
                    'title' => $documentation_name,
                    'path' => $document_path
                ]);
            }
            return back()->with('success', "Activity Berhasil Ditambahkan.");
        }
    }

    // public function showDocumentation(DailyReport $daily_report, Activity $activity, Documentation $documentation)
    // {
    //     // dd($documentation);
    //     abort_if(
    //         !Storage::disk('public')->exists($documentation->path),
    //         404
    //     );

    //     return Storage::disk('public')->response($documentation->path);
    // }

    public function deleteDocumentation(DailyReport $daily_report, Activity $activity, Documentation $documentation)
    {
        $this->authorize('manage_activities', $daily_report);

        // if (Storage::disk('public')->delete($documentation->path)) {
        $documentation->delete();
        // }
        return back()->with('success', "Berhasil Menghapus Documentation.");
        // Session::flash("success", "Berhasil Menghapus Documentation !");
    }

    public function update(UpdateActivityRequest $request, DailyReport $daily_report, Activity $activity)
    {
        $this->authorize('manage_activities', $daily_report);

        $posts = $request->validated();
        unset($posts['documentations']);

        $activity->update($posts);

        if ($request->hasFile('documentations')) {
            foreach ($request->documentations as $documentation) {
                $documentation_name = 'document-' . $activity->id . "-" . uniqid() . '-' . Carbon::now()->isoFormat("D_MMMM_Y") . ".{$documentation->extension()}";
                $document_path = $documentation->storeAs("document-images", $documentation_name, 'public');
                $activity->documentations()->create([
                    'title' => $documentation_name,
                    'path' => $document_path
                ]);
            }
        }

        return back()->with("success", "Berhasil Memperbarui Activity !");
    }

    public function delete(DailyReport $daily_report, Activity $activity)
    {
        $this->authorize('manage_activities', $daily_report);

        $activity->delete();

        return back()->with("success", "Berhasil Menghapus Activity & Documentations !");
    }
}

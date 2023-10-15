<?php

namespace App\Http\Controllers\DailyReport;

use App\Http\Controllers\Controller;
use App\Http\Requests\DailyReport\StoreHSEStatisticRequest;
use App\Http\Requests\DailyReport\UpdateHSEStatisticRequest;
use App\Models\DailyReport;
use App\Models\HSEStatistic;
use Illuminate\Http\Request;

class HSEStatisticController extends Controller
{
    public function store(StoreHSEStatisticRequest $request, DailyReport $daily_report)
    {
        $this->authorize('manage_hse_statistics', $daily_report);
        $posts = $request->validated();

        $daily_report->hseStatistics()->createMany($posts['hse_statistics']);
        return redirect()->back()->with('success', "HSE Statistic Berhasil Ditambahkan.");
    }

    public function update(UpdateHSEStatisticRequest $request, DailyReport $daily_report)
    {
        $this->authorize('manage_hse_statistics', $daily_report);
        $posts = $request->validated();

        HSEStatistic::upsert($posts['hse_statistics'],
        [
            'id'
        ],
        [
            'description',
            'unit',
            'total',
        ]);

        return redirect()->back()->with('success', "HSE Statistic Berhasil Diperbarui.");
    }

    public function delete(DailyReport $daily_report, HSEStatistic $hse_statistic){
        $this->authorize('manage_hse_statistics', $daily_report);

        $hse_statistic->delete();
        return back()->with("success", "Berhasil Menghapus Personel {$hse_statistic->description}");
    }
}

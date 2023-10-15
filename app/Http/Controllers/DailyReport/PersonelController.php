<?php

namespace App\Http\Controllers\DailyReport;

use App\Http\Controllers\Controller;
use App\Http\Requests\DailyReport\StorePersonelRequest;
use App\Http\Requests\DailyReport\UpdatePersonelRequest;
use App\Models\DailyReport;
use App\Models\Personel;
use Illuminate\Http\Request;

class PersonelController extends Controller
{
    public function store(StorePersonelRequest $request, DailyReport $daily_report)
    {
        $this->authorize('manage_personels', $daily_report);

        $posts = $request->validated();

        foreach ($posts as $post) {
            $daily_report->personels()->createMany($post);
        }

        return redirect()->back()->with('success', "Personel Berhasil Ditambahkan.");
    }

    public function update(UpdatePersonelRequest $request, DailyReport $daily_report)
    {
        $this->authorize('manage_personels', $daily_report);
        $posts = $request->validated();

        $updated_personels = [];

        if (array_key_exists('indirect_personels', $posts) && array_key_exists('direct_personels', $posts)) {
            $updated_personels = array_merge($posts['indirect_personels'], $posts['direct_personels']);
        } else if(!array_key_exists('indirect_personels', $posts) && array_key_exists('direct_personels', $posts)) {
            $updated_personels = array_merge($posts['direct_personels']);
        } else if (array_key_exists('indirect_personels', $posts) && !array_key_exists('direct_personels', $posts)) {
            $updated_personels = array_merge($posts['indirect_personels']);
        }

        Personel::upsert($updated_personels,
        [
            'id'
        ],
        [
            'personel_name',
            'unit',
            'today',
            'manhours_unit',
            'manhours_prev',
            'manhours_working_hours',
            'manhours_overtime_hours',
            'manhours_daily_total',
            'manhours_cum',
            'remarks',
        ]);

        return redirect()->back()->with('success', "Personel Berhasil Diperbarui.");
    }

    public function delete(DailyReport $daily_report, Personel $personel){
        $this->authorize('manage_personels', $daily_report);
        $personel->delete();
        return back()->with("success", "Berhasil Menghapus Personel {$personel->personel_name}");
    }
}

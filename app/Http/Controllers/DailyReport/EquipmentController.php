<?php

namespace App\Http\Controllers\DailyReport;

use App\Http\Controllers\Controller;
use App\Http\Requests\DailyReport\StoreEquipmentRequest;
use App\Http\Requests\DailyReport\UpdateEquipmentRequest;
use App\Models\DailyReport;
use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function store(StoreEquipmentRequest $request, DailyReport $daily_report)
    {
        $this->authorize('manage_equipment', $daily_report);

        $posts = $request->validated();

        $daily_report->equipment()->createMany($posts['equipment']);
        return redirect()->back()->with('success', "Equipment & Tools Berhasil Ditambahkan.");
    }

    public function update(UpdateEquipmentRequest $request, DailyReport $daily_report)
    {
        $this->authorize('manage_equipment', $daily_report);

        $posts = $request->validated();

        Equipment::upsert(
            $posts['equipment'],
            [
                'id'
            ],
            [
                'description',
                'unit',
                'total',
            ]
        );

        return redirect()->back()->with('success', "Equipment Berhasil Diperbarui.");
    }

    public function delete(DailyReport $daily_report, Equipment $equipment)
    {
        $this->authorize('manage_equipment', $daily_report);
        $equipment->delete();
        return back()->with("success", "Berhasil Menghapus Personel {$equipment->description}");
    }
}

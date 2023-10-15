<?php

namespace App\Http\Resources\DailyReports;

use App\Http\Resources\ActivitiesResource;
use App\Http\Resources\Projects\ProjectShowResource;
use App\Models\DailyReport;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class DailyReportShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // dd($this->resource);
        $working_hour_start = Carbon::createFromFormat('Y-m-d H:i:s', $this->working_hour_start)->format('H:i');
        $working_hour_end = Carbon::createFromFormat('Y-m-d H:i:s', $this->working_hour_end)->format('H:i');

        $working_hours = $working_hour_start . " - " . $working_hour_end;

        return [
            'id' => $this->id,
            'reportNumber' => $this->report_number,
            'project' => new ProjectShowResource($this->whenLoaded('project')),
            'date' => $this->created_at->format('l, F j, Y'),
            'workingHours' => $working_hours,
            'approvedBy' => $this->approved_by,
            'personels' => $this->whenLoaded('personels'),
            'hseStatistics' => $this->whenLoaded('hseStatistics'),
            'equipment' => $this->whenLoaded('equipment'),
            'activities' => ActivitiesResource::collection($this->whenLoaded('activities')),

            // Indirect Personels
            'indirectPersonelsTodaySum' => $this->indirect_personels_today_sum,
            'indirectPersonelsManhoursPrevSum' => $this->indirect_personels_manhours_prev_sum,
            'indirectPersonelsManhoursDailyTotalSum' => $this->indirect_personels_manhours_daily_total_sum,
            'indirectPersonelsManhoursCumSum' => $this->indirect_personels_manhours_cum_sum,

            // Direct Personels
            'directPersonelsTodaySum' => $this->direct_personels_today_sum,
            'directPersonelsManhoursPrevSum' => $this->direct_personels_manhours_prev_sum,
            'directPersonelsManhoursDailyTotalSum' => $this->direct_personels_manhours_daily_total_sum,
            'directPersonelsManhoursCumSum' => $this->direct_personels_manhours_cum_sum,

            // Total Manpower
            'personelsTodaySum' => $this->personels_today_sum,
            'personelsManhoursPrevSum' => $this->personels_manhours_prev_sum,
            'personelsManhoursDailyTotalSum' => $this->personels_manhours_daily_total_sum,
            'personelsManhoursCumSum' => $this->personels_manhours_cum_sum,
            // 'created_at' => $this->created_at,
            // 'updated_at' => $this->updated_at,
            'can' => [
                'update' => auth()->user()->can('update', $this->resource),
                'export' => auth()->user()->can('export', $this->resource),
                'managePersonels' => auth()->user()->can('manage_personels', $this->resource),
                'manageHseStatistics' => auth()->user()->can('manage_hse_statistics', $this->resource),
                'manageEquipment' => auth()->user()->can('manage_equipment', $this->resource),
                'manageActivities' => auth()->user()->can('manage_activities', $this->resource),
                'requestForApproval' => auth()->user()->can('request_for_approval', $this->resource),
                'approveRequest' => auth()->user()->can('approve_request', $this->resource),
            ],
        ];
    }
}

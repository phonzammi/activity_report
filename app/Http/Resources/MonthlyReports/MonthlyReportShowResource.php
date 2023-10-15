<?php

namespace App\Http\Resources\MonthlyReports;

use App\Http\Resources\ActivitiesResource;
use App\Http\Resources\Projects\ProjectShowResource;
use Illuminate\Http\Resources\Json\JsonResource;

class MonthlyReportShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'reportNumber' => $this->report_number,
            'project' => new ProjectShowResource($this->whenLoaded('project')),
            // 'date' => $this->date->format('l, F j, Y'),
            'date' => $this->created_at->format('l, F j, Y'),
            // 'workingHours' => $working_hours,
            // 'overtimeHours' => $overtime_hours,
            'approvedBy' => $this->approved_by,
            'personels' => $this->whenLoaded('personels'),
            'hseStatistics' => $this->whenLoaded('hseStatistics'),
            'equipment' => $this->whenLoaded('equipment'),
            'activities' => ActivitiesResource::collection($this->whenLoaded('activities')),

            // Indirect Personels
            'indirectPersonelsTodaySum' => $this->indirect_personels_today_sum,
            'indirectPersonelsManhoursPrevSum' => $this->indirect_personels_manhours_prev_sum,
            'indirectPersonelsManhoursWeeklyTotalSum' => $this->indirect_personels_manhours_weekly_total_sum,
            'indirectPersonelsManhoursCumSum' => $this->indirect_personels_manhours_cum_sum,

            // // Direct Personels
            'directPersonelsTodaySum' => $this->direct_personels_today_sum,
            'directPersonelsManhoursPrevSum' => $this->direct_personels_manhours_prev_sum,
            'directPersonelsManhoursWeeklyTotalSum' => $this->direct_personels_manhours_weekly_total_sum,
            'directPersonelsManhoursCumSum' => $this->direct_personels_manhours_cum_sum,

            // // Total Manpower
            'personelsTodaySum' => $this->personels_today_sum,
            'personelsManhoursPrevSum' => $this->personels_manhours_prev_sum,
            'personelsManhoursWeeklyTotalSum' => $this->personels_manhours_weekly_total_sum,
            'personelsManhoursCumSum' => $this->personels_manhours_cum_sum,

            'can' => [
                'update' => auth()->user()->can('update', $this->resource),
                'export' => auth()->user()->can('export', $this->resource),
                'requestForApproval' => auth()->user()->can('request_for_approval', $this->resource),
                'approveRequest' => auth()->user()->can('approve_request', $this->resource),
            ],
        ];
    }
}

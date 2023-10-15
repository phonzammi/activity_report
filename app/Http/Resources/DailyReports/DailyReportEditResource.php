<?php

namespace App\Http\Resources\DailyReports;

use App\Http\Resources\Projects\ProjectShowResource;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class DailyReportEditResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $working_hour_start = Carbon::createFromFormat('Y-m-d H:i:s', $this->working_hour_start)->format('H:i');
        $working_hour_end = Carbon::createFromFormat('Y-m-d H:i:s', $this->working_hour_end)->format('H:i');

        $overtime_start = $this->overtime_start ? Carbon::createFromFormat('Y-m-d H:i:s', $this->overtime_start)->format('H:i') : null;
        $overtime_end = $this->overtime_end ? Carbon::createFromFormat('Y-m-d H:i:s', $this->overtime_end)->format('H:i') : null;



        return [
            'id' => $this->id,
            'reportNumber' => $this->report_number,
            'project' => new ProjectShowResource($this->whenLoaded('project')),
            // 'date' => $this->date,
            'workingHourStart' => $working_hour_start,
            'workingHourEnd' => $working_hour_end,
            'overtimeStart' => $overtime_start,
            'overtimeEnd' => $overtime_end,
            'issuedBy' => $this->issued_by,
            'approvedBy' => $this->approved_by,
            // 'createdAt' => $this->created_at,
            // 'updatedAt' => $this->updated_at,
        ];
    }
}

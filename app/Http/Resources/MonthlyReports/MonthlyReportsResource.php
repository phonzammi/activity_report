<?php

namespace App\Http\Resources\MonthlyReports;

use App\Http\Resources\Projects\ProjectShowResource;
use Illuminate\Http\Resources\Json\JsonResource;

class MonthlyReportsResource extends JsonResource
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
            'date' => $this->created_at->format('l, F j, Y'),
            'issuedBy' => $this->issued_by,
            'approvedBy' => $this->approved_by,
        ];
    }
}

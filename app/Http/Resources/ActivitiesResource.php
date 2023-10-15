<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivitiesResource extends JsonResource
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
            'dailyReportId' => $this->daily_report_id,
            'description' => $this->description,
            'qty1' => $this->qty1,
            'qty2' => $this->qty2,
            'qty3' => $this->qty3,
            'volume' => $this->volume,
            'unit' => $this->unit,
            'documentations' => $this->documentations
        ];
    }
}

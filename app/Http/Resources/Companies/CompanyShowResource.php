<?php

namespace App\Http\Resources\Companies;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CompanyShowResource extends JsonResource
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
            'name' => $this->name,
            'address' => $this->address,
            'hasLogo' => $this->logo_path ? true : false,
            'companyLogoUrl' => $this->company_logo_url,
            'companyLogo' => $this->logo_path && Storage::disk('public')->exists($this->logo_path),
            'can' => [
                'update' => auth()->user()->can('update', $this->resource)
            ]
        ];
    }
}

<?php

namespace App\Http\Resources;

use App\Http\Resources\Companies\CompanyShowResource;
use App\Models\Client;
use App\Models\Company;
use App\Models\DailyReport;
use App\Models\MonthlyReport;
use App\Models\Project;
use App\Models\WeeklyReport;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'role' => $this->role?->only('id', 'name'),
            // 'profilePicture' => $this->profile_pic_path && Storage::disk('public')->exists($this->profile_pic_path),
            'profilePhotoPath' => $this->profile_photo_path,
            'profilePhotoUrl' => $this->profile_photo_url,
            'signaturePhotoPath' => $this->signature_photo_path,
            'signaturePhotoUrl' => $this->signature_photo_url,
            'company' => new CompanyShowResource($this->company),
            'can' => [
                'createCompany' => $this->can('create', Company::class),
                'createClient' => $this->can('create', Client::class),
                'createProject' => $this->can('create', Project::class),
                'createDailyReport' => $this->can('create', DailyReport::class),
                'viewAnyDailyReport' => $this->can('viewAny', DailyReport::class),
                'createWeeklyReport' => $this->can('create', WeeklyReport::class),
                'viewAnyWeeklyReport' => $this->can('viewAny', WeeklyReport::class),
                'createMonthlyReport' => $this->can('create', MonthlyReport::class),
                'viewAnyMonthlyReport' => $this->can('viewAny', MonthlyReport::class),
                // 'viewAccumulationReports' => $this->can('viewAccumulationReports'),
                // 'approvalDailyReport' => $this->can('approvalDailyReport'),
            ],
        ];
    }
}

<?php

namespace App\Http\Resources\Projects;

use App\Http\Resources\Clients\ClientShowResource;
use App\Models\Project;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectsResource extends JsonResource
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
            'location' => $this->location,
            'client' => new ClientShowResource($this->whenLoaded('client')),
            'scopeOfWork' => $this->scope_of_work,
        ];
    }
}

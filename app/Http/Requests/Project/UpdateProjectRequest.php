<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' =>  ['required', 'string', Rule::unique('projects')->ignore($this->project->id)],
            'location' => 'required',
            'client_id' => 'required|exists:clients,id',
            'scope_of_work' => 'required',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Project Name'
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'name' => str()->upper($this->name),
            'location' => str()->upper($this->location),
            'client_name' => str()->upper($this->client_name),
            'scope_of_work' => str()->upper($this->scope_of_work),
        ]);
    }
}

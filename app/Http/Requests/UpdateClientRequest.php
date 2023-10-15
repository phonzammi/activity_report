<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateClientRequest extends FormRequest
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
            'client_name' =>  ['required', 'string', Rule::unique('clients', 'name')->ignore($this->client->id)],
            'logo' => ['nullable', File::image(), 'max:1024'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'client_name' => str()->upper($this->client_name),
        ]);
    }
}

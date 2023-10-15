<?php

namespace App\Http\Requests\Company;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateCompanyRequest extends FormRequest
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
            'company_name' => ['required', 'min:3', 'string', Rule::unique('companies', 'name')->ignore($this->company->id)],
            'company_address' => 'nullable|string',
            'logo' => ['nullable', File::image(), 'max:1024'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'company_name' => str()->upper($this->company_name),
            'company_address' => str()->title($this->company_address),
        ]);
    }
}

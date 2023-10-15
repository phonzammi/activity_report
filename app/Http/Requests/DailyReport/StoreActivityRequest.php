<?php

namespace App\Http\Requests\DailyReport;

use Illuminate\Foundation\Http\FormRequest;

class StoreActivityRequest extends FormRequest
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
            'description' => 'required',
            'qty1' => 'nullable',
            'qty2' => 'nullable',
            'qty3' => 'nullable',
            'volume' => 'nullable',
            'unit' => 'nullable',
            'documentations' => 'array|nullable',
            'documentations.*' => 'image',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'description' => 'Today activity',
            'qty1' => 'QTY 1',
            'qty2' => 'QTY 2',
            'qty3' => 'QTY 3',
        ];
    }
}

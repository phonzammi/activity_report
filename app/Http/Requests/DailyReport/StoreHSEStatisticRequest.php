<?php

namespace App\Http\Requests\DailyReport;

use Illuminate\Foundation\Http\FormRequest;

class StoreHSEStatisticRequest extends FormRequest
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
            'hse_statistics.*.description' => 'required|string',
            'hse_statistics.*.unit' => 'nullable',
            'hse_statistics.*.total' => 'nullable|integer',
        ];
    }
}

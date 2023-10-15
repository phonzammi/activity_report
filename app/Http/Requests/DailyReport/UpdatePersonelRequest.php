<?php

namespace App\Http\Requests\DailyReport;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonelRequest extends FormRequest
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
            // Indirect
            'indirect_personels.*.id' => 'required|integer',
            'indirect_personels.*.daily_report_id' => 'required|integer|exists:daily_reports,id',
            'indirect_personels.*.personel_name' => 'required|string',
            'indirect_personels.*.unit' => 'required',
            'indirect_personels.*.direction_id' => 'required|integer',
            'indirect_personels.*.today' => 'required|numeric|min:1',
            'indirect_personels.*.manhours_unit' => 'required',
            'indirect_personels.*.manhours_prev' => 'numeric',
            'indirect_personels.*.manhours_working_hours' => 'required|numeric|min:1',
            'indirect_personels.*.manhours_overtime_hours' => 'required|numeric',
            'indirect_personels.*.manhours_daily_total' => 'required|numeric|min:1',
            'indirect_personels.*.manhours_cum' => 'required|numeric|min:1',
            'indirect_personels.*.remarks' => 'nullable',

            // Direct
            'direct_personels.*.id' => 'required|integer',
            'direct_personels.*.daily_report_id' => 'required|integer|exists:daily_reports,id',
            'direct_personels.*.personel_name' => 'required|string',
            'direct_personels.*.direction_id' => 'required|integer',
            'direct_personels.*.unit' => 'required',
            'direct_personels.*.today' => 'required|numeric|min:1',
            'direct_personels.*.manhours_unit' => 'required',
            'direct_personels.*.manhours_prev' => 'numeric',
            'direct_personels.*.manhours_working_hours' => 'required|numeric|min:1',
            'direct_personels.*.manhours_overtime_hours' => 'required|numeric',
            'direct_personels.*.manhours_daily_total' => 'required|numeric|min:1',
            'direct_personels.*.manhours_cum' => 'required|numeric|min:1',
            'direct_personels.*.remarks' => 'nullable',
        ];
    }
}

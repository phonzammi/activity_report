<?php

namespace App\Http\Requests\DailyReport;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDailyReportRequest extends FormRequest
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
            'report_number' =>  ['required', 'string', Rule::unique('daily_reports')->ignore($this->daily_report->id)],
            'project_id' => 'required|exists:projects,id',
            // 'date' => 'required|date',
            'working_hour_start' => 'required|date_format:H:i',
            'working_hour_end' => 'required|date_format:H:i',
            'overtime_start' => 'nullable|date_format:H:i',
            'overtime_end' => 'nullable|date_format:H:i',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'report_number' => str()->upper($this->report_number),
        ]);
    }
}

<?php

namespace App\Http\Requests\DailyReport;

use Illuminate\Foundation\Http\FormRequest;

class StoreDailyReportRequest extends FormRequest
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
            'report_number' => 'required|string|unique:daily_reports,report_number',
            'project_id' => 'required|exists:projects,id',
            'working_hour_start' => 'required|date_format:H:i',
            'working_hour_end' => 'required|date_format:H:i',
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $this->merge([
            'report_number' => str()->upper($this->report_number),
        ]);
    }
}

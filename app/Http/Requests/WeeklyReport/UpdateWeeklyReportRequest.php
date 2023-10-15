<?php

namespace App\Http\Requests\WeeklyReport;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWeeklyReportRequest extends FormRequest
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
            'report_number' =>  ['required', 'string', Rule::unique('weekly_reports')->ignore($this->weekly_report->id)],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'report_number' => str()->upper($this->report_number),
        ]);
    }
}

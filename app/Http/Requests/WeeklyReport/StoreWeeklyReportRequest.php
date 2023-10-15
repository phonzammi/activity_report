<?php

namespace App\Http\Requests\WeeklyReport;

use Illuminate\Foundation\Http\FormRequest;

class StoreWeeklyReportRequest extends FormRequest
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
            'report_number' => 'required|string|unique:weekly_reports,report_number',
            'project_id' => 'required|exists:projects,id',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'report_number' => str()->upper($this->report_number),
        ]);
    }
}

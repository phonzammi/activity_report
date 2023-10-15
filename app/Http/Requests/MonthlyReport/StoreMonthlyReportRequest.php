<?php

namespace App\Http\Requests\MonthlyReport;

use Illuminate\Foundation\Http\FormRequest;

class StoreMonthlyReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function rules()
    {
        return [
            'report_number' => 'required|string|unique:monthly_reports,report_number',
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

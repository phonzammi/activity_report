<?php

namespace App\Http\Requests\DailyReport;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEquipmentRequest extends FormRequest
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
            'equipment.*.id' => 'required|integer',
            'equipment.*.daily_report_id' => 'required|integer|exists:daily_reports,id',
            'equipment.*.description' => 'required|string',
            'equipment.*.unit' => 'nullable',
            'equipment.*.total' => 'nullable|integer',
        ];
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {
        $equipment_arr = $this->equipment;
        foreach ($equipment_arr as $key => $equipment) {
            $equipment_arr[$key]['description'] = str()->title($equipment['description']);
            $equipment_arr[$key]['unit'] = str()->title($equipment['unit']);
        }

        $this->merge([
            "equipment" => $equipment_arr,
        ]);
    }
}

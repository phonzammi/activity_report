<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personel extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'daily_report_id',
        'direction_id',
        'personel_name',
        'unit',
        'today',
        'manhours_unit',
        'manhours_prev',
        'manhours_working_hours',
        'manhours_overtime_hours',
        'manhours_daily_total',
        'manhours_cum',
        'remarks',
    ];

    public function daily_report()
    {
        return $this->belongsTo(DailyReport::class);
    }

    public function direction()
    {
        return $this->belongsTo(Direction::class);
    }

}

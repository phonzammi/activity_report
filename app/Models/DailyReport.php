<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DailyReport extends Model
{
    use HasFactory;


    protected $fillable = [
        'report_number',
        'project_id',
        'working_hour_start',
        'working_hour_end',
        'issued_by',
        'approved_by'
    ];

    protected $casts = [
        'working_hour_start' => 'datetime:H:i',
        'working_hour_end' => 'datetime:H:i',
    ];

    // protected $appends = [
    //     // indirect
    //     'indirect_personels_today_sum',
    //     'indirect_personels_manhours_prev_sum',
    //     // 'indirect_personels_manhours_today_sum',
    //     // 'indirect_personels_manhours_working_hours_sum',
    //     // 'indirect_personels_manhours_overtime_hours_sum',
    //     'indirect_personels_manhours_daily_total_sum',
    //     'indirect_personels_manhours_cum_sum',

    //     // // direct
    //     'direct_personels_today_sum',
    //     'direct_personels_manhours_prev_sum',
    //     // 'direct_personels_manhours_today_sum',
    //     // 'direct_personels_manhours_working_hours_sum',
    //     // 'direct_personels_manhours_overtime_hours_sum',
    //     'direct_personels_manhours_daily_total_sum',
    //     'direct_personels_manhours_cum_sum',

    //     // // total manpower
    //     'personels_today_sum',
    //     'personels_manhours_prev_sum',
    //     'personels_manhours_daily_total_sum',
    //     'personels_manhours_cum_sum',
    // ];

    // Indirect Personels
    public function indirectPersonelsTodaySum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->where('direction_id', 1)->sum('today');
        });
    }

    public function indirectPersonelsManhoursPrevSum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->where('direction_id', 1)->sum('manhours_prev');
        });
    }

    public function indirectPersonelsManhoursDailyTotalSum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->where('direction_id', 1)->sum('manhours_daily_total');
        });
    }

    public function indirectPersonelsManhoursCumSum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->where('direction_id', 1)->sum('manhours_cum');
        });
    }

    //Direct Personels
    public function directPersonelsTodaySum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->where('direction_id', 2)->sum('today');
        });
    }

    public function directPersonelsManhoursPrevSum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->where('direction_id', 2)->sum('manhours_prev');
        });
    }

    public function directPersonelsManhoursDailyTotalSum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->where('direction_id', 2)->sum('manhours_daily_total');
        });
    }

    public function directPersonelsManhoursCumSum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->where('direction_id', 2)->sum('manhours_cum');
        });
    }

    // Total Manpower
    public function personelsTodaySum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->sum('today');
        });
    }

    public function personelsManhoursPrevSum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->sum('manhours_prev');
        });
    }

    public function personelsManhoursDailyTotalSum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->sum('manhours_daily_total');
        });
    }

    public function personelsManhoursCumSum(): Attribute
    {
        return Attribute::get(function () {
            return $this->personels->sum('manhours_cum');
        });
    }

    public function issuedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'issued_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function personels()
    {
        return $this->hasMany(Personel::class);
    }

    // public function hse_statistics()
    // {
    //     return $this->hasMany(HSEStatistic::class);
    // }

    public function hseStatistics()
    {
        return $this->hasMany(HSEStatistic::class);
    }

    public function equipment()
    {
        return $this->hasMany(Equipment::class);
    }

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }

    public function weeklyReport()
    {
        return $this->belongsTo(WeeklyReport::class);
    }

    public function monthlyReport()
    {
        return $this->belongsTo(MonthlyReport::class);
    }
}

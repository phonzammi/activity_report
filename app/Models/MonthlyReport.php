<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MonthlyReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'report_number',
        'project_id',
        // 'working_hour_start',
        // 'working_hour_end',
        // 'overtime_start',
        // 'overtime_end',
        'issued_by',
        'approved_by'
    ];

    protected $casts = [
        // 'date' => 'datetime',
        // 'working_hour_start' => 'datetime:H:i',
        // 'working_hour_end' => 'datetime:H:i',
        // 'overtime_start' => 'datetime:H:i',
        // 'overtime_end' => 'datetime:H:i',
    ];

    // protected $appends = [
    //     // indirect
    //     'indirect_personels_today_sum',
    //     'indirect_personels_manhours_prev_sum',
    //     'indirect_personels_manhours_monthly_total_sum',
    //     'indirect_personels_manhours_cum_sum',

    //     // // direct
    //     'direct_personels_today_sum',
    //     'direct_personels_manhours_prev_sum',
    //     'direct_personels_manhours_monthly_total_sum',
    //     'direct_personels_manhours_cum_sum',

    //     // // total manpower
    //     'personels_today_sum',
    //     'personels_manhours_prev_sum',
    //     'personels_manhours_monthly_total_sum',
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

    public function indirectPersonelsManhoursMonthlyTotalSum(): Attribute
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

    public function directPersonelsManhoursMonthlyTotalSum(): Attribute
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

    public function personelsManhoursMonthlyTotalSum(): Attribute
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

    // End Personels Sum

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

    public function dailyReports()
    {
        return $this->hasMany(DailyReport::class);
    }

    public function personels()
    {
        return $this->hasManyThrough(Personel::class, DailyReport::class);
    }

    public function hseStatistics()
    {
        return $this->hasManyThrough(HSEStatistic::class, DailyReport::class);
    }

    public function equipment()
    {
        return $this->hasManyThrough(Equipment::class, DailyReport::class);
    }

    public function activities()
    {
        return $this->hasManyThrough(Activity::class, DailyReport::class);
    }
}

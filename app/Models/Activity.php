<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'daily_report_id',
        'description',
        'qty1',
        'qty2',
        'qty3',
        'volume',
        'unit',
    ];

    public function daily_report()
    {
        return $this->belongsTo(DailyReport::class);
    }

    public function documentations()
    {
        return $this->hasMany(Documentation::class);
    }
}

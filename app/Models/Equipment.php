<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
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
        'unit',
        'total',
    ];

    public function daily_report()
    {
        return $this->belongsTo(DailyReport::class);
    }
}

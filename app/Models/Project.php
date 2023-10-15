<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'location',
        'client_id',
        'scope_of_work',
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function dailyReports()
    {
        return $this->hasMany(DailyReport::class);
    }
}

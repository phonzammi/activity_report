<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Notifications\DatabaseNotification;

class Notification extends DatabaseNotification
{

    protected $casts = [
        'data' => 'array',
        'read_at' => 'datetime',
        'replied_at' => 'datetime'
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        if ($date->diff()->days > 6) {
            return $date->format('l, F j') . ' at ' . $date->format('H:m');
        } else if ($date->diff()->days >= 1) {
            return $date->locale('en')->diffForHumans() . ' at ' . $date->format('H:m');
        }
        return $date->locale('en')->diffForHumans();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerformanceCalendarTranslation extends Model {

    protected $fillable = [
        'performance_calendar_id',
        'language',
        'descriptions'
    ];

}
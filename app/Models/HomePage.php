<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HomePage
 *
 * @property int $id
 * @property string $type
 * @property int $performance_calendar_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PerformanceCalendar $performanceDate
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomePage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomePage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomePage query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomePage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomePage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomePage wherePerformanceCalendarId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomePage whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HomePage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class HomePage extends Model
{
    const RECOMMENDED_TYPE = 'recommended';
    const SPECIAL_PROJECTS_TYPE = 'specialProjects';
    const PROMO_SLIDER_TYPE = 'promoSlider';
    const PROMO_SLIDER_MINI_TYPE = 'promoSliderMini';

    protected $fillable = ['type', 'performance_calendar_id'];
    protected $table = 'home_page_components';

    public function performanceDate()
    {
        return $this->belongsTo('App\Models\PerformanceCalendar', 'performance_calendar_id');
    }
}

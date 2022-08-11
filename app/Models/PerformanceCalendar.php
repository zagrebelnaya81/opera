<?php

namespace App\Models;

use App\Models\HallPricePattern;
use function foo\func;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Jenssegers\Date\Date;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

/**
 * App\Models\PerformanceCalendar
 *
 * @property int $id
 * @property int $performance_id
 * @property string $date
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int|null $hall_price_pattern_id
 * @property int $isSoldInCashBox
 * @property int $isSoldOnline
 * @property int $areTicketsGenerated
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PerformanceActor[] $actors
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Ticket[] $availableTickets
 * @property-read \App\Models\HallPricePattern|null $hallPricePattern
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\HomePage[] $homePageComponents
 * @property-read \App\Models\Performance $performance
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Ticket[] $tickets
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\PerformanceCalendar onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar whereAreTicketsGenerated($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar whereDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar whereHallPricePatternId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar whereIsSoldInCashBox($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar whereIsSoldOnline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar wherePerformanceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceCalendar whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\PerformanceCalendar withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\PerformanceCalendar withoutTrashed()
 * @mixin \Eloquent
 */
class PerformanceCalendar extends MultiLanguageModel implements HasMedia {
    use SoftDeletes, HasMediaTrait;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'performance_id',
        'date',
        'hall_price_pattern_id',
        'isSoldInCashBox',
        'isSoldOnline',
        'areTicketsGenerated',
        'karabas_link',
        'internet_bilet_link'
    ];

    public function multiLanguageModel()
    {
        return PerformanceCalendarTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['descriptions'];
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('poster1')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 1600, 807);
            $this->addMediaConversion('slider')->fit(Manipulations::FIT_CROP, 1600, 807);
        });

        $this->addMediaCollection('poster2')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 420, 275);
        });

    }

    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'performance_calendar_actors', 'performance_calendar_id', 'actor_id');
    }

    public function performance()
    {
        return $this->belongsTo(Performance::class, 'performance_id')->withDefault();
    }

    public function getFormatDate()
    {
        return Date::parse($this->date)->format('j F Y');
    }

    public function getFormatTime()
    {
        return Date::parse($this->date)->format('H:i');
    }

    public function getFormatDateTime()
    {
        return $this->getFormatDate() . ' ' . $this->getFormatTime();
    }

    public function hallPricePattern()
    {
        return $this->belongsTo(HallPricePattern::class, 'hall_price_pattern_id');
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'performance_calendar_id');
    }

    public function selectedTickets($ticketIds)
    {
        return $this->tickets()->whereIn('id', $ticketIds);
    }

    public function availableTickets()
    {
        return $this->hasMany(Ticket::class, 'performance_calendar_id')->where('isAvailable', true);
    }

    public function shortTagline($сharacterNumber)
    {
        return str_limit($this->performance->translate->tagline, $сharacterNumber);
    }

    public function priceFrom()
    {
        return $this->hallPricePattern->pricePattern->minPrice();
    }

    public function priceTo()
    {
        return $this->hallPricePattern->pricePattern->maxPrice();
    }

    public function homePageComponents()
    {
        return $this->hasMany(HomePage::class, 'performance_calendar_id');
    }

    public function pricePolicy() {
        return $this->belongsTo(PricePolicy::class);
    }
}

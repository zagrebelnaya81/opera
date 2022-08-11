<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Jenssegers\Date\Date;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;
use Spatie\Permission\Models\Role;

use Spatie\MediaLibrary\InteractsWithMedia;
/**
 * App\Models\Performance
 *
 * @property int $id
 * @property float|null $price
 * @property string|null $duration
 * @property int $isPremiere
 * @property int $type_id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int|null $season_id
 * @property int $isSpecial
 * @property int|null $hall_id
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int $is_published
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Album[] $albums
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PerformanceCalendar[] $allDates
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Article[] $articles
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PerformanceCalendar[] $dates
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PerformanceCalendar[] $expiredDates
 * @property-read mixed $title
 * @property-read \App\Models\Hall|null $hall
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @property-read \App\Models\PerformanceType $type
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Video[] $videos
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Performance onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereHallId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereIsPremiere($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereIsPublished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereIsSpecial($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereSeasonId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Performance whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Performance withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Performance withoutTrashed()
 * @mixin \Eloquent
 */
class Performance extends MultiLanguageModel implements HasMedia
{
    use HasMediaTrait;
    use SoftDeletes;


    protected $appends = ['title'];
    protected $dates = ['deleted_at'];

    protected $fillable = ['duration', 'isPremiere', 'isSpecial', 'poster', 'type_id', 'season_id', 'hall_id', 'is_published'];
    protected $multiLanguageForeignKey = 'performance_id';
    protected $multiLanguageLocalKey = 'id';
    const BIG_SCENE = 'big';
    const SMALL_SCENE = 'small';
    const OPEN_SCENE = 'open';
    const CHAMBER_SCENE = 'chamber';
    const LOFT_SCENE = 'loft';

    public function multiLanguageModel()
    {
        return 'App\Models\PerformanceTranslation';
    }

    public function multiLanguageFields()
    {
        return ['title', 'lang', 'descriptions', 'directors', 'directors2', 'author', 'synapsis', 'program', 'city', 'place', 'tagline'];
    }

    public function registerMediaCollections()
    {
       
        $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 420, 275);
            $this->addMediaConversion('preview-mob')->fit(Manipulations::FIT_CROP, 560, 470);
            $this->addMediaConversion('slider')->fit(Manipulations::FIT_CROP, 1600, 807);
            $this->addMediaConversion('slider-new')->fit(Manipulations::FIT_CROP, 1600, 233);
            $this->addMediaConversion('slider-mobile')->fit(Manipulations::FIT_CROP, 500, 809);
            $this->addMediaConversion('special')->fit(Manipulations::FIT_CROP, 660, 393);
            $this->addMediaConversion('recommended')->fit(Manipulations::FIT_CROP, 320, 340);
        });
      

        $this->addMediaCollection('directors')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')
            ->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('poster')->fit(Manipulations::FIT_CROP, 428, 420);
        });
      
        
        $this->addMediaCollection('directors2')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('poster')->fit(Manipulations::FIT_CROP, 428, 420);
        });

        $this->addMediaCollection('performance-images')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 320, 215);
        });
    }

    public function getFirstMediaUrl(string $collectionName = 'default', string $conversionName = ''): string
    {
        $media = $this->getFirstMedia($collectionName);

        if (!$media) {
            return config('dummy-images.performance.' . $conversionName) ?? '';
        }

        return $media->getUrl($conversionName);
    }

    public function images()
    {
        return $this->belongsToMany('App\Models\Image', 'performance_images');
    }

    public function albums()
    {
        return $this->belongsToMany('App\Models\Album', 'performance_albums');
    }

    public function videos()
    {
        return $this->belongsToMany('App\Models\Video', 'performance_videos');
    }

    public function allDates()
    {
        return $this->hasMany('App\Models\PerformanceCalendar', 'performance_id', 'id')
            ->orderBy('date');
    }

    public function calendar()
    {
        return $this->hasMany('App\Models\PerformanceCalendar', 'performance_id', 'id');
    }

    public function dates()
    {
        return $this->hasMany('App\Models\PerformanceCalendar', 'performance_id', 'id')
            ->orderBy('date')->whereDate('date', '>=', Carbon::today());
    }

    public function expiredDates()
    {
        return $this->hasMany('App\Models\PerformanceCalendar', 'performance_id', 'id')
            ->orderBy('date')->whereDate('date', '<', Carbon::today());
    }

    public function cashBoxAvailableDates()
    {
        return $this->dates()->where('isSoldInCashBox', true);
    }

    public function onlineAvailableDates()
    {
        return $this->dates()->where('isSoldOnline', true);
    }

    public function type()
    {
        return $this->belongsTo('App\Models\PerformanceType', 'type_id');
    }

    public function period()
    {
        $dates = array_column($this->dates()->get()->toArray(), 'date');
        if (count($dates)) {
            $start = Date::parse($dates[0])->format('j F');
            $end = Date::parse($dates[count($dates) - 1])->format('j F');
            return __('event.from') . ' ' . $start . ' ' . __('event.to') . ' ' . $end;
        }
        return '-';
    }

    public function count()
    {
        $count = $this->dates()->count();
        return $count;
    }

    public function shortDescription()
    {
        return str_limit($this->translate->descriptions, 200);
    }

    public function premier()
    {
        $premier = $this->dates()->limit(1)->pluck('date');
       
        if(!count($premier)) {
            return '';
        }
        return Date::parse($premier[0])->format('j F Y');
    }
    public function premierTime()
    {
        $premier = $this->dates()->limit(1)->pluck('date');
        if(!count($premier)) {
            return '';
        }
        return $premier[0];
    }

    public function actorIds()
    {
        $actors = collect([]);
        foreach ($this->dates()->get() as $date) {
            foreach ($date->actors as $actor) {
                $actors->push($actor->actor_id);
            }
        }
        return $actors->unique();
    }

    public function actorRoleIds()
    {
        $actors = collect([]);
        foreach ($this->dates()->get() as $date) {
            foreach ($date->actors as $actor) {
                $actors->push([$actor->actor_id => $actor->actor_role_id]);
            }
        }
        return $actors->unique();
    }

    public function dateIds()
    {
        $dates = collect([]);
        foreach ($this->dates()->get() as $date) {
            $dates->push($date->id);
        }
        return $dates->unique();
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_performances');
    }

    public function getTitleAttribute()
    {
        return $this->translate->title;
    }

    public function hall()
    {
        return $this->belongsTo(Hall::class, 'hall_id')->withDefault();
    }

    public function roles()
    {
        return $this->hasMany(ActorRole::class);
    }
}

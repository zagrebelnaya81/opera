<?php

namespace App\Models;

use App;


use App\Models\PerformanceCalendar;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Route;
use Spatie\MediaLibrary\Models\Media;
use Jenssegers\Date\Date;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

/**
 * App\Models\Actor
 *
 * @property int $id
 * @property string $dob
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string|null $twitter
 * @property string|null $instagram
 * @property string|null $youtube
 * @property string|null $facebook
 * @property int $group_id
 * @property int|null $is_main
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Album[] $albums
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Article[] $articles
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PerformanceActor[] $calendars
 * @property-read mixed $fullname
 * @property-read \App\Models\ActorGroup $group
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Video[] $videos
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereDob($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereFacebook($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereInstagram($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereIsMain($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereTwitter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Actor whereYoutube($value)
 * @mixin \Eloquent
 */
class Actor extends MultiLanguageModel implements HasMedia
{
    use HasMediaTrait;

    protected $appends = ['fullName', 'link'];
    protected $fillable = ['dob', 'facebook', 'instagram', 'twitter', 'youtube', 'group_id', 'is_main'];
    protected $multiLanguageForeignKey = 'actor_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return ActorTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['firstName', 'lastName', 'descriptions', 'patronymic', 'degree', 'hometown', 'debut', 'merit', 'repertoire'];
    }

    public function images()
    {
        return $this->belongsToMany('App\Models\Image', 'actor_images');
    }

    public function albums()
    {
        return $this->belongsToMany('App\Models\Album', 'actor_albums');
    }

    public function videos()
    {
        return $this->belongsToMany('App\Models\Video', 'actor_videos');
    }

    public function group()
    {
        return $this->belongsTo('App\Models\ActorGroup', 'group_id');
    }

    public function calendars()
    {
        return $this->hasMany(PerformanceActor::class, 'actor_id');
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 420, 459);
            $this->addMediaConversion('mini')->fit(Manipulations::FIT_CROP, 300, 340);
            $this->addMediaConversion('preview_mob')->fit(Manipulations::FIT_CROP, 480, 325);
            $this->addMediaConversion('mini_mob')->fit(Manipulations::FIT_CROP, 330, 330);
            $this->addMediaConversion('event')->fit(Manipulations::FIT_CROP, 230, 255);
        });
    }

    public function getFirstMediaUrl(string $collectionName = 'default', string $conversionName = ''): string
    {
        $media = $this->getFirstMedia($collectionName);

        if (!$media) {
            return config('dummy-images.actor.' . $conversionName) ?? '';
        }

        return $media->getUrl($conversionName);
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_actors');
    }

    public function eventDatesList()
    {
        $dates = collect([]);
        foreach ($this->calendars as $calendar) {
            $dates->push($calendar->date);
        }
        return $dates->sortBy('date');
    }

    public function eventDaysList()
    {
        $dates = $this->eventDatesList();
        $days = [];
        foreach ($dates as $date) {
            $days[] = Date::parse($date->date)->format('m.d.Y');
        }
        return implode(',', $days);
    }

    public function fullName()
    {
        return $this->translate->firstName . ' ' . $this->translate->patronymic . ' ' . $this->translate->lastName;
    }

    public function getFullNameAttribute()
    {
        return $this->translate->firstName . ' ' . $this->translate->patronymic . ' ' . $this->translate->lastName;
    }

    public function getLinkAttribute()
    {
        return route('actor.show', $this->id);
    }

    public function roleName()
    {
        if (isset($this->role_id)) {
            return $this->belongsTo(ActorRole::class, 'role_id');
        }
        return null;
    }
}

<?php

namespace App\Models;

use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\Models\Media;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;

/**
 * App\Models\Album
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int $category_id
 * @property int|null $season_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Actor[] $actors
 * @property-read \App\Models\AlbumCategory $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Performance[] $performances
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Album newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Album newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Album query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Album whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Album whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Album whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Album whereSeasonId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Album whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Album extends MultiLanguageModel implements HasMedia
{
    use HasMediaTrait;

    protected $appends = ['title'];
    protected $fillable = ['category_id', 'season_id'];
    protected $multiLanguageForeignKey = 'album_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return AlbumTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['title'];
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 430, 289);
            $this->addMediaConversion('preview-mini')->fit(Manipulations::FIT_CROP, 320, 215);
            $this->addMediaConversion('preview-mob')->fit(Manipulations::FIT_CROP, 480, 325);
        });
        $this->addMediaCollection('album-images')->registerMediaConversions(function (Media $media) {
          $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 320, 215);
        });
    }

    public function category()
    {
        return $this->belongsTo(AlbumCategory::class, 'category_id');
    }

    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'actor_albums');
    }

    public function performances()
    {
        return $this->belongsToMany(Performance::class, 'performance_albums');
    }

    public function getTitleAttribute()
    {
        return $this->translate->title;
    }
}

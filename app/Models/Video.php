<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\Models\Media;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\Url\Url;

/**
 * App\Models\Video
 *
 * @property int $id
 * @property string $url
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int|null $category_id
 * @property int|null $season_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Actor[] $actors
 * @property-read \App\Models\VideoCategory|null $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Performance[] $performances
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Video newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Video newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Video query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Video whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Video whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Video whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Video whereSeasonId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Video whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Video whereUrl($value)
 * @mixin \Eloquent
 */
class Video extends MultiLanguageModel implements HasMedia
{
  use HasMediaTrait;

    protected $appends = ['title'];
    protected $fillable = ['url', 'category_id', 'season_id'];

  protected $multiLanguageForeignKey = 'video_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return VideoTranslation::class;
  }

  public function multiLanguageFields()
  {
    return ['title'];
  }

  public function registerMediaCollections()
  {
    $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
      $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
      $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 420, 275);
    });
  }

  public function actors()
  {
    return $this->belongsToMany(Actor::class, 'actor_videos');
  }


  public function performances()
  {
    return $this->belongsToMany(Performance::class, 'performance_videos');
  }

  public function category()
  {
    return $this->belongsTo(VideoCategory::class, 'category_id');
  }

  public function getImageUrlFromYoutube() {
    $url = Url::fromString($this->url);
    return $url->getQueryParameter('v');
  }

    public function getTitleAttribute()
    {
        return $this->translate->title;
    }
}

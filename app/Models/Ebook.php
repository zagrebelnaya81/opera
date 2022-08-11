<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\Models\Media;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;

/**
 * App\Models\Ebook
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ebook newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ebook newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ebook query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ebook whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ebook whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ebook whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Ebook extends multiLanguageModel implements HasMedia
{
  use HasMediaTrait;

  protected $multiLanguageForeignKey = 'ebook_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return EbookTranslation::class;
  }
  public function multiLanguageFields()
  {
    return ['title'];
  }
    public function registerMediaCollections()
  {
    $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
      $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
      $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 300, 405);
    });
  }
}

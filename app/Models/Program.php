<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\Models\Media;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;

/**
 * App\Models\Program
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Program whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Program extends multiLanguageModel implements HasMedia
{
  use HasMediaTrait;

  protected $multiLanguageForeignKey = 'program_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return ProgramTranslation::class;
  }
  public function multiLanguageFields()
  {
    return ['title','description','terms_description'];
  }
  public function registerMediaCollections()
  {
    $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
      $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
      $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 420, 275);
    });
  }
}

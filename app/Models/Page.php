<?php

namespace App\Models;

use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;
use App\Models\Season;

/**
 * App\Models\Page
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\AttributeValue[] $blocks
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Page newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Page newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Page query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Page whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Page whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Page whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Page whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Page extends MultiLanguageModel implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = ['name'];
    protected $multiLanguageForeignKey = 'page_id';
    protected $multiLanguageLocalKey = 'id';

    public function getRouteKeyName()
    {
        return 'name';
    }

    public function multiLanguageModel()
    {
      return PageTranslation::class;
    }

    public function multiLanguageFields()
    {
      return ['title', 'descriptions'];
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 420, 459);
            $this->addMediaConversion('preview-page')->fit(Manipulations::FIT_CROP, 420, 275);
            $this->addMediaConversion('preview-mob')->fit(Manipulations::FIT_CROP, 560, 379);
            $this->addMediaConversion('preview-mob-mini')->fit(Manipulations::FIT_CROP, 480, 325);
        });
    }

    public function blocks() {
        return $this->hasMany(AttributeValue::class, 'page_id', 'id');
    }
  public function shortDescription($сharacterNumber) {
    return str_limit($this->translate->descriptions, $сharacterNumber);
  }
}

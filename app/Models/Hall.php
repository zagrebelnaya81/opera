<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\Models\Media;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;

/**
 * App\Models\Hall
 *
 * @property int $id
 * @property int $spaciousness
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string $name
 * @property string|null $patternPath
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Section[] $sections
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hall newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hall newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hall query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hall whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hall whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hall whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hall wherePatternPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hall whereSpaciousness($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Hall whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Hall extends multiLanguageModel implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = ['spaciousness', 'name', 'sort_order'];
    protected $multiLanguageForeignKey = 'hall_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return HallTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['title', 'description', 'seo_title', 'seo_description', 'file_description'];
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 320, 215);
            $this->addMediaConversion('preview-mob')->fit(Manipulations::FIT_CROP, 450, 302);
            $this->addMediaConversion('medium')->fit(Manipulations::FIT_CROP, 812, 410);
        });
        $this->addMediaCollection('hall-images')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 330, 320);
            $this->addMediaConversion('preview-big')->fit(Manipulations::FIT_CROP, 800, 600);
        });
        $this->addMediaCollection('seat-images')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 235, 136);
        });
    }

    public function sections()
    {
        return $this->hasMany(Section::class, 'hall_id');
    }
}

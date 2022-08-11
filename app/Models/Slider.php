<?php

namespace App\Models;

use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Slider extends MultiLanguageModel implements HasMedia
{
    use HasMediaTrait;

    protected $table = 'slider';

    protected $fillable = [
        'poster',
        'page_url',
    ];

    protected $multiLanguageForeignKey = 'slider_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return SliderTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['title'];
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('slider')->fit(Manipulations::FIT_CROP, 1600, 807);
            $this->addMediaConversion('slider-mobile')->fit(Manipulations::FIT_CROP, 500, 809);
        });
    }
}

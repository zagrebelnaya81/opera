<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\Models\Media;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;

/**
 * App\Models\Service
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int $has_more_button
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Service newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Service newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Service query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Service whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Service whereHasMoreButton($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Service whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Service whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Service extends multiLanguageModel implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = ['has_more_button'];

    protected $multiLanguageForeignKey = 'service_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return ServiceTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['title', 'description'];
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('service-images')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 323, 346);
        });
    }
}

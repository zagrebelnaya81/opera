<?php

namespace App\Models;

use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\Models\Media;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;

/**
 * App\Models\Partner
 *
 * @property int $id
 * @property int $category_id
 * @property int|null $in_footer
 * @property int|null $is_active
 * @property int|null $is_main
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int|null $is_middle
 * @property string|null $url
 * @property int|null $url_partner
 * @property-read \App\Models\PartnerCategory $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereInFooter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereIsMain($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereIsMiddle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Partner whereUrlPartner($value)
 * @mixin \Eloquent
 */
class Partner extends MultiLanguageModel implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = ['category_id', 'is_active', 'in_footer', 'is_main', 'is_middle', 'url', 'url_partner'];
    protected $multiLanguageForeignKey = 'partner_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return PartnerTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['title', 'description'];
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_FILL, 150, 150);
            // $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 200, 100);
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_FILL, 200, 100);
        });
    }

    public function category()
    {
        return $this->belongsTo(PartnerCategory::class, 'category_id');
    }

//  public function get
}

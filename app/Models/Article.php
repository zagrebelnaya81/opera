<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\Models\Media;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\HasMedia;

/**
 * App\Models\Article
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int $category_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Actor[] $actors
 * @property-read \App\Models\ArticleCategory $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\MediaLibrary\Models\Media[] $media
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Performance[] $performances
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Video[] $videos
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Article newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Article newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Article query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Article whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Article whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Article whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Article whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Article extends MultiLanguageModel implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = ['category_id'];
    protected $multiLanguageForeignKey = 'article_id';
    protected $multiLanguageLocalKey = 'id';

    public function multiLanguageModel()
    {
        return ArticleTranslation::class;
    }

    public function multiLanguageFields()
    {
        return ['title', 'descriptions'];
    }

    public function registerMediaCollections()
    {
        $this->addMediaCollection('posters')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('preview')->fit(Manipulations::FIT_CROP, 420, 275);
            $this->addMediaConversion('preview-mob')->fit(Manipulations::FIT_CROP, 560, 381);
            $this->addMediaConversion('preview-mob-mini')->fit(Manipulations::FIT_CROP, 460, 262);
            $this->addMediaConversion('preview-big')->fit(Manipulations::FIT_CROP, 660, 495);
        });
        $this->addMediaCollection('article-images')->registerMediaConversions(function (Media $media) {
            $this->addMediaConversion('thumb')->fit(Manipulations::FIT_CROP, 150, 150);
            $this->addMediaConversion('preview-big')->fit(Manipulations::FIT_CROP, 907, 680);
        });
    }

    public function videos()
    {
        return $this->belongsToMany(Video::class, 'article_videos');
    }

    public function category()
    {
        return $this->belongsTo(ArticleCategory::class, 'category_id');
    }

    public function actors()
    {
        return $this->belongsToMany(Actor::class, 'article_actors');
    }

    public function performances()
    {
        return $this->belongsToMany(Performance::class, 'article_performances');
    }

    public function shortDescription()
    {
        return str_limit($this->translate->descriptions, 200);
    }
}

<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\VideoCategoryTranslation
 *
 * @property int $id
 * @property int $video_category_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoCategoryTranslation whereVideoCategoryId($value)
 * @mixin \Eloquent
 */
class VideoCategoryTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['video_category_id', 'language', 'title', 'seo_title', 'seo_description'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\VideoTranslation
 *
 * @property int $id
 * @property int $video_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VideoTranslation whereVideoId($value)
 * @mixin \Eloquent
 */
class VideoTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['video_id', 'language', 'title', 'seo_title', 'seo_description'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

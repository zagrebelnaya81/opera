<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AlbumCategoryTranslation
 *
 * @property int $id
 * @property int $album_category_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation whereAlbumCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumCategoryTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AlbumCategoryTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['album_category_id', 'language', 'title', 'seo_title', 'seo_description'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

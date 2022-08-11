<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AlbumTranslation
 *
 * @property int $id
 * @property int $album_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation whereAlbumId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\AlbumTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AlbumTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['album_id', 'language', 'title', 'seo_title', 'seo_description'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

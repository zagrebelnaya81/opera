<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

/**
 * App\Models\ProjectTranslation
 *
 * @property int $id
 * @property int $project_id
 * @property string $language
 * @property string $title
 * @property string $description
 * @property string $slug
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string|null $cond_description
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereCondDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ProjectTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ProjectTranslation extends Model
{
  use Sluggable;

  protected $table = 'project_translations';
  protected $fillable = ['project_id', 'language', 'title','cond_description', 'description','seo_title', 'seo_description'];
  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

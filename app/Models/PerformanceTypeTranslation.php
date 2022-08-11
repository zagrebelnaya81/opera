<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PerformanceTypeTranslation
 *
 * @property int $id
 * @property int $performance_type_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation wherePerformanceTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTypeTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PerformanceTypeTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['performance_type_id', 'language', 'title', 'seo_title', 'seo_description'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

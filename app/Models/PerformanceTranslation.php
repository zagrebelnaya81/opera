<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PerformanceTranslation
 *
 * @property int $id
 * @property int $performance_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string|null $descriptions
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string|null $author
 * @property string|null $directors
 * @property string|null $synapsis
 * @property string|null $program
 * @property string|null $directors2
 * @property string|null $city
 * @property string|null $place
 * @property string|null $lang
 * @property string|null $tagline
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereDescriptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereDirectors($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereDirectors2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereLang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation wherePerformanceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation wherePlace($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereProgram($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereSynapsis($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereTagline($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PerformanceTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['performance_id',
      'language',
      'title',
      'lang',
      'descriptions',
      'directors',
      'directors2',
      'author',
      'seo_title',
      'seo_description',
      'synapsis',
      'program',
      'city',
      'place',
      'tagline'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }

}

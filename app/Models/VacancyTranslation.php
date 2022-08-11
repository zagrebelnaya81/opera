<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

/**
 * App\Models\VacancyTranslation
 *
 * @property int $id
 * @property int $vacancy_id
 * @property string $language
 * @property string $title
 * @property string $description
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string|null $add_description
 * @property string $slug
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereAddDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\VacancyTranslation whereVacancyId($value)
 * @mixin \Eloquent
 */
class VacancyTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['vacancy_id', 'language', 'title', 'description', 'add_description','seo_title', 'seo_description'];
  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

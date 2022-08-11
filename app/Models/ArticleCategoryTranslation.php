<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ArticleCategoryTranslation
 *
 * @property int $id
 * @property int $article_category_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation whereArticleCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleCategoryTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ArticleCategoryTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['article_category_id', 'language', 'title', 'seo_title', 'seo_description'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

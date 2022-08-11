<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ArticleTranslation
 *
 * @property int $id
 * @property int $article_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string $descriptions
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereArticleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereDescriptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ArticleTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ArticleTranslation extends Model
{
  use Sluggable;
  
  protected $fillable = ['article_id', 'language', 'title', 'descriptions', 'seo_title', 'seo_description'];
  
  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

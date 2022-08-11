<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

/**
 * App\Models\DocumentationCategoryTranslation
 *
 * @property int $id
 * @property int $doc_category_id
 * @property string $language
 * @property string $title
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string|null $slug
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation whereDocCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\DocumentationCategoryTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class DocumentationCategoryTranslation extends Model
{
  use Sluggable;

  protected $table = 'doc_category_translations';
  protected $fillable = ['doc_category_id', 'language', 'title'];
  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

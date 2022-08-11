<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PartnerCategoryTranslation
 *
 * @property int $id
 * @property int $partner_category_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation wherePartnerCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerCategoryTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PartnerCategoryTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['partner_category_id', 'language', 'title', 'seo_title', 'seo_description'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

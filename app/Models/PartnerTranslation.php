<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PartnerTranslation
 *
 * @property int $id
 * @property int $partner_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string $descriptions
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation whereDescriptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation wherePartnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PartnerTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PartnerTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['partner_id', 'language', 'title', 'descriptions', 'seo_title', 'seo_description'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PageTranslation
 *
 * @property int $id
 * @property int $page_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string $descriptions
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation whereDescriptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PageTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PageTranslation extends Model
{
    use Sluggable;

    protected $fillable = ['page_id', 'language', 'title', 'descriptions', 'seo_title', 'seo_description'];

    public function sluggable()
    {
      return [
        'slug' => [
          'source' => 'title',
        ]
      ];
    }
}

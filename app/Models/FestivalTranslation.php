<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FestivalTranslation
 *
 * @property int $id
 * @property int $festival_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string $descriptions
 * @property string|null $invited_stars
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereDescriptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereFestivalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereInvitedStars($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\FestivalTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class FestivalTranslation extends Model
{
  use Sluggable;
  
  protected $fillable = ['language', 'title', 'descriptions', 'festival_id', 'invited_stars', 'seo_title', 'seo_description'];
  
  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

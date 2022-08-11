<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ActorGroupTranslation
 *
 * @property int $id
 * @property int $actor_group_id
 * @property string $language
 * @property string $title
 * @property string $slug
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation whereActorGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroupTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ActorGroupTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['actor_group_id', 'language', 'title', 'seo_title', 'seo_description'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'title',
      ]
    ];
  }
}

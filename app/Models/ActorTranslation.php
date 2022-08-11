<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ActorTranslation
 *
 * @property int $id
 * @property int $actor_id
 * @property string $language
 * @property string $firstName
 * @property string $lastName
 * @property string $slug
 * @property string $descriptions
 * @property string $degree
 * @property string|null $seo_title
 * @property string|null $seo_description
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property string|null $hometown
 * @property string|null $debut
 * @property string|null $merit
 * @property string|null $repertoire
 * @property string|null $position
 * @property string|null $patronymic
 * @property-read mixed $f_lname
 * @property-read mixed $fullname
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation findSimilarSlugs($attribute, $config, $slug)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereActorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereDebut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereDegree($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereDescriptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereHometown($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereMerit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation wherePatronymic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereRepertoire($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereSeoDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereSeoTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ActorTranslation extends Model
{
  use Sluggable;

  protected $fillable = ['actor_id', 'language', 'firstName', 'lastName', 'patronymic', 'descriptions', 'degree', 'repertoire', 'debut', 'hometown', 'merit', 'seo_title', 'seo_description', 'position'];

  public function sluggable()
  {
    return [
      'slug' => [
        'source' => 'fullname',
      ]
    ];
  }

  public function getFullnameAttribute() {
    return $this->lastName . ' ' . $this->firstName .' '. $this->patronymic;
  }

  public function getFLnameAttribute(){
    return $this->firstName . ' ' . $this->lastName;
  }
}

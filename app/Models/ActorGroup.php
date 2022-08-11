<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ActorGroup
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @property int|null $parent_id
 * @property string $name
 * @property int|null $is_active
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Actor[] $actors
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ActorGroup[] $children_groups
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Actor[] $main_actors
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Actor[] $other_actors
 * @property-read \App\Models\ActorGroup|null $parent_group
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroup newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroup newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroup query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroup whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroup whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroup whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorGroup whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ActorGroup extends MultiLanguageModel
{
  protected $fillable = ['parent_id', 'is_active', 'name', 'sort_order'];
  protected $multiLanguageForeignKey = 'actor_group_id';
  protected $multiLanguageLocalKey = 'id';

  public function multiLanguageModel()
  {
    return ActorGroupTranslation::class;
  }

  public function multiLanguageFields()
  {
    return ['title'];
  }

  public function actors() {
    return $this->hasMany(Actor::class, 'group_id', 'id');
  }

  public function main_actors() {
    return $this->hasMany(Actor::class, 'group_id', 'id')->where('is_main', 1);
  }

  public function other_actors() {
    return $this->hasMany(Actor::class, 'group_id', 'id')->where('is_main', null);
  }

  public function children_groups() {
    return $this->hasMany(ActorGroup::class, 'parent_id', 'id')->orderBy('sort_order');
  }

  public function parent_group() {
    return $this->belongsTo(ActorGroup::class, 'parent_id', 'id');
  }

}

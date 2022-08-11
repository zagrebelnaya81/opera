<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ActorRoleTranslation
 *
 * @property int $id
 * @property int $actor_role_id
 * @property string $language
 * @property string $title
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRoleTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRoleTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRoleTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRoleTranslation whereActorRoleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRoleTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRoleTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRoleTranslation whereLanguage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRoleTranslation whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorRoleTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ActorRoleTranslation extends Model
{
  protected $fillable = ['actor_role_id', 'language', 'title'];
}

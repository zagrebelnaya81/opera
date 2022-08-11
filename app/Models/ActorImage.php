<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ActorImage
 *
 * @property int $id
 * @property int $actor_id
 * @property int $image_id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorImage whereActorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorImage whereImageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorImage whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ActorImage extends Model
{
    protected $fillable = ['actor_id', 'image_id'];
}

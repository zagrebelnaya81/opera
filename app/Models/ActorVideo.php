<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ActorVideo
 *
 * @property int $id
 * @property int $actor_id
 * @property int $video_id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorVideo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorVideo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorVideo query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorVideo whereActorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorVideo whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorVideo whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorVideo whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorVideo whereVideoId($value)
 * @mixin \Eloquent
 */
class ActorVideo extends Model
{
    protected $fillable = ['actor_id', 'video_id'];
}

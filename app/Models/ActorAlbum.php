<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ActorAlbum
 *
 * @property int $id
 * @property int $actor_id
 * @property int $album_id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorAlbum newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorAlbum newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorAlbum query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorAlbum whereActorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorAlbum whereAlbumId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorAlbum whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorAlbum whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\ActorAlbum whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ActorAlbum extends Model
{
    protected $fillable = ['actor_id', 'album_id'];
}

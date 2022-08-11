<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PerformanceAlbum
 *
 * @property int $id
 * @property int $performance_id
 * @property int $album_id
 * @property \Illuminate\Support\Carbon $updated_at
 * @property \Illuminate\Support\Carbon $created_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceAlbum newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceAlbum newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceAlbum query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceAlbum whereAlbumId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceAlbum whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceAlbum whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceAlbum wherePerformanceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PerformanceAlbum whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PerformanceAlbum extends Model
{
    protected $fillable = ['performance_id', 'album_id'];
}

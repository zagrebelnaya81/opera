<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\Models\Media;

/**
 * App\Models\Seat
 *
 * @property int $id
 * @property int $number
 * @property int $recommended
 * @property int $row_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $poster_id
 * @property-read \Spatie\MediaLibrary\Models\Media $media
 * @property-read \App\Models\Row $row
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat wherePosterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat whereRecommended($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat whereRowId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Seat whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Seat extends Model
{
    protected $fillable = ['number', 'poster_id'];

    public function row()
    {
        return $this->belongsTo(Row::class, 'row_id');
    }

    public function media()
    {
        return $this->hasOne(Media::class, 'id', 'poster_id');
    }

    public function getFirstMediaUrl($collection = '')
    {
        if(isset($this->media)) {
            return $this->media->getUrl($collection);
        }
        $collection = $collection !== '' ? $collection : 'poster';
        return config('dummy-images.seat.' . $collection);
    }
}

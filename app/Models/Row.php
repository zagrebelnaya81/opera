<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Row
 *
 * @property int $id
 * @property int $number
 * @property int $section_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Seat[] $seats
 * @property-read \App\Models\Section $section
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Row newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Row newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Row query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Row whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Row whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Row whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Row whereSectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Row whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Row extends Model
{
    protected $fillable = ['number'];

    public function section() {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function seats() {
        return $this->hasMany(Seat::class, 'row_id');
    }
}

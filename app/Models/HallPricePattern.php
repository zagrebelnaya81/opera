<?php

namespace App\Models;

use App\Models\Hall;
use App\Models\PricePattern;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\HallPricePattern
 *
 * @property int $id
 * @property string $title
 * @property int $hall_id
 * @property int $price_pattern_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SeatPrice[] $availableSeats
 * @property-read \App\Models\Hall $hall
 * @property-read \App\Models\PricePattern $pricePattern
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SeatPrice[] $seats
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SeatPrice[] $unavailableSeats
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\HallPricePattern onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern whereHallId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern wherePricePatternId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\HallPricePattern whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\HallPricePattern withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\HallPricePattern withoutTrashed()
 * @mixin \Eloquent
 */
class HallPricePattern extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = ['title', 'hall_id', 'price_pattern_id'];

    public function hall() {
        return $this->belongsTo(Hall::class, 'hall_id');
    }

    public function seats() {
        return $this->hasMany(SeatPrice::class, 'hall_price_pattern_id');
    }

    public function availableSeats() {
        return $this->hasMany(SeatPrice::class, 'hall_price_pattern_id')->where('price_zone_id', '!=', null);
    }

    public function unavailableSeats() {
        return $this->hasMany(SeatPrice::class, 'hall_price_pattern_id')->where('price_zone_id', null);
    }

    public function pricePattern() {
        return $this->belongsTo(PricePattern::class, 'price_pattern_id');
    }
}

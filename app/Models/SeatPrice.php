<?php

namespace App\Models;

use App\Models\PricePattern;
use App\Models\PriceZone;
use App\Models\Seat;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SeatPrice
 *
 * @property int $id
 * @property int $seat_id
 * @property int $hall_price_pattern_id
 * @property int|null $price_zone_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\PricePattern $pricePattern
 * @property-read \App\Models\PriceZone|null $priceZone
 * @property-read \App\Models\Seat $seat
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeatPrice newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeatPrice newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeatPrice query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeatPrice whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeatPrice whereHallPricePatternId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeatPrice whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeatPrice wherePriceZoneId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeatPrice whereSeatId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SeatPrice whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SeatPrice extends Model
{
    protected $fillable = ['seat_id', 'hall_price_pattern_id', 'price_zone_id'];

    public function seat() {
        return $this->belongsTo(Seat::class, 'seat_id');
    }

    public function pricePattern() {
        return $this->belongsTo(PricePattern::class, 'price_pattern_id');
    }

    public function priceZone() {
        return $this->belongsTo(PriceZone::class, 'price_zone_id');
    }
}

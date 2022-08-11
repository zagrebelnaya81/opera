<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PriceZone
 *
 * @property int $id
 * @property int $price_pattern_id
 * @property int $color_id
 * @property float $price
 * @property int $isActive
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Color $color
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone whereColorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone wherePricePatternId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PriceZone whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PriceZone extends Model
{
    protected $fillable = ['price_pattern_id', 'color_id', 'price', 'isActive'];

    public function color() {
        return $this->belongsTo(Color::class, 'color_id');
    }

//    public function pricePattern() {
//        return $this->belongsTo(PricePattern::class, 'price_pattern_id');
//    }
}

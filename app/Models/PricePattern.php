<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\PricePattern
 *
 * @property int $id
 * @property string $title
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\HallPricePattern[] $hallPricePatterns
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PriceZone[] $priceZones
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PriceZone[] $priceZonesAll
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PricePattern newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PricePattern newQuery()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\PricePattern onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PricePattern query()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PricePattern whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PricePattern whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PricePattern whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PricePattern whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PricePattern whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\PricePattern withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Models\PricePattern withoutTrashed()
 * @mixin \Eloquent
 */
class PricePattern extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = ['title'];

    public function priceZones() {
        return $this->hasMany(PriceZone::class, 'price_pattern_id')->where('isActive', true);
    }

    public function priceZonesAll() {
        return $this->hasMany(PriceZone::class, 'price_pattern_id');
    }

    public function hallPricePatterns() {
        return $this->hasMany(HallPricePattern::class, 'price_pattern_id');
    }

    public function minPrice() {
        return $this->priceZones()->orderBy('price', 'ASC')->first()->price;
    }

    public function maxPrice() {
        return $this->priceZones()->orderBy('price', 'DESC')->first()->price;
    }
}

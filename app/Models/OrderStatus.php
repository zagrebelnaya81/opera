<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\OrderStatus
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\OrderStatus query()
 * @mixin \Eloquent
 */
class OrderStatus extends Model
{
    const WAITING_FOR_PAYMENT = 'waiting_for_payment';
    const SOLD = 'sold';
    const SOLD_ONLINE = 'sold_online';
    const BOOKED = 'booked';
    const RETURNED = 'returned';
    const CANCELLED = 'cancelled';
    const VIP_BOOKED = 'vip_booked';
    const DISTRIBUTOR_BOOKED = 'distributor_booked';
    const DISTRIBUTOR_SOLD = 'distributor_sold';
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Order
 *
 * @property int $id
 * @property string $status
 * @property int|null $seller_id
 * @property int|null $buyer_id
 * @property int|null $payment_type
 * @property string|null $email
 * @property string|null $name
 * @property string|null $phone
 * @property string|null $hash
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $expires_at
 * @property-read \App\Models\User|null $buyer
 * @property-read \App\Models\User|null $seller
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Ticket[] $tickets
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereBuyerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereHash($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order wherePaymentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereSellerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Order whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Order extends Model
{
    const CASH_PAYMENT = 0;
    const CARD_PAYMENT = 1;

    protected $fillable = ['status', 'seller_id', 'buyer_id', 'payment_type', 'email', 'name', 'phone', 'expires_at', 'hash'];

    public function isSold() {
        return $this->status == OrderStatus::SOLD;
    }

    public function isBooked() {
        return $this->status == OrderStatus::BOOKED;
    }

    public function isReturned() {
        return $this->status == OrderStatus::RETURNED;
    }

    public function isWaitingForPayment() {
        return $this->status == OrderStatus::WAITING_FOR_PAYMENT;
    }

    public function isCancelled() {
        return $this->status == OrderStatus::CANCELLED;
    }

    public function isVipBooked() {
        return $this->status == OrderStatus::VIP_BOOKED;
    }

    public function seller() {
        return $this->belongsTo(User::class, 'seller_id');
    }

    public function buyer() {
        return $this->belongsTo(User::class, 'buyer_id');
    }

    public function isCashPayment() {
        return $this->payment_type == self::CASH_PAYMENT;
    }

    public function isCardPayment() {
        return $this->payment_type == self::CARD_PAYMENT;
    }

    public function tickets() {
        return $this->belongsToMany(Ticket::class, 'order_tickets');
    }

}

<?php

namespace App\Models;

use App\Models\SeatPrice;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Ticket
 *
 * @property int $id
 * @property int $performance_calendar_id
 * @property int $seat_price_id
 * @property int $isAvailable
 * @property int|null $distributor_id
 * @property string|null $activated_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Distributor|null $distributor
 * @property-read mixed $in_reservation
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $orders
 * @property-read \App\Models\PerformanceCalendar $performanceCalendar
 * @property-read \App\Models\Reservation $reservation
 * @property-read \App\Models\SeatPrice $seatPrice
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket query()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket whereActivatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket whereDistributorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket whereIsAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket wherePerformanceCalendarId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket whereSeatPriceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Ticket whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Ticket extends Model
{
    const AVAILABLE = 'available';

    protected static $ticketStatuses = [
        self::AVAILABLE => 'available',
        OrderStatus::WAITING_FOR_PAYMENT => 'waiting_for_payment',
        OrderStatus::SOLD => 'sold',
        OrderStatus::BOOKED => 'booked',
        OrderStatus::RETURNED => 'returned',
        OrderStatus::CANCELLED => 'cancelled',
        OrderStatus::VIP_BOOKED => 'vip_booked',
        OrderStatus::DISTRIBUTOR_SOLD => 'distributor_sold',
        OrderStatus::DISTRIBUTOR_BOOKED => 'distributor_booked',
    ];

    protected $fillable = ['performance_calendar_id', 'seat_price_id', 'isAvailable', 'distributor_id', 'activated_at', 'full_price', 'discount_id'];

    protected $appends = ['inReservation', 'order'];

    public function performanceCalendar() {
        return $this->belongsTo(PerformanceCalendar::class, 'performance_calendar_id')->withTrashed();
    }

    public function seatPrice() {
        return $this->belongsTo(SeatPrice::class, 'seat_price_id');
    }

    public function distributor() {
        return $this->belongsTo(Distributor::class, 'distributor_id');
    }

    public function reservation() {
        return $this->hasOne(Reservation::class, 'ticket_id');
    }

    public function getInReservationAttribute() {
        return $this->reservationStatus();
    }

    public function reservationStatus() {
        return $this->reservation ? true : false;
    }

    public function checkAvailability() {
        return ($this->isAvailable && !$this->InReservation) ? 1 : 0;
    }

    public function orders() {
        return $this->belongsToMany(Order::class, 'order_tickets');
    }

    public function availabilityStatus() {
        if($this->isAvailable) {
            return self::$ticketStatuses[self::AVAILABLE];
        }
        if($this->distributor_id) {
            return self::$ticketStatuses[OrderStatus::DISTRIBUTOR_BOOKED];
        }
        if($this->order) {
            return self::$ticketStatuses[$this->order->status];
        }

        return self::$ticketStatuses[OrderStatus::SOLD];
    }

    public function getOrderAttribute() {
        return $this->orders->whereNotIn('status', [
            OrderStatus::RETURNED,
            OrderStatus::CANCELLED,
        ])->first();
    }

    public function discount() {
        return $this->belongsTo(Discount::class);
    }
}

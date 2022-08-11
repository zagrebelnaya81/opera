<?php

namespace App\Transformers\CashBox;

use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Performance;
use App\Models\PerformanceCalendar;
use App\Models\Ticket;
use App\Transformers\TicketCashBoxTransformer;
use Illuminate\Support\Facades\DB;
use Lavary\Menu\Collection;
use League\Fractal\TransformerAbstract;

class EventPosterTransformer extends TransformerAbstract
{
    public function transform(PerformanceCalendar $event)
    {
        $seats_booked = Order::leftJoin('order_tickets as ot', 'ot.order_id', '=', 'orders.id')
            ->whereIn('ot.ticket_id', $event->tickets->pluck('id'))
            ->whereIn('orders.status', [OrderStatus::BOOKED, OrderStatus::VIP_BOOKED, OrderStatus::DISTRIBUTOR_BOOKED])
            ->count();

        $seats_sold = Order::leftJoin('order_tickets as ot', 'ot.order_id', '=', 'orders.id')
            ->whereIn('ot.ticket_id', $event->tickets->pluck('id'))
            ->where('orders.status', OrderStatus::SOLD)
            ->count();

//        2-nd variant
//        $seats_sold =  $event->tickets()
//            ->whereHas('orders', function ($query) {
//                 $query->where('status', OrderStatus::SOLD);
//                })
//            ->where('distributor_id', null)
//            ->where('isAvailable', false)
//            ->count();


        return [
            'id' => $event->id,
            'title' => $event->performance->translate->title,
            'date' => $event->getFormatDate(),
            'time' => $event->getFormatTime(),
            'hall' => $event->performance->hall->translate->title,
            'seats_count' => $event->tickets->count(),
            'seats_available' => $event->tickets->where('isAvailable', true)->count(),
            'seats_booked' => $seats_booked,
            'seats_sold' => $seats_sold,
            'priceZones' => $this->priceZones($event)
        ];
    }

    protected function priceZones($event) {
        $priceZones = $event->hallPricePattern->pricePattern->priceZones;
        $priceZonesArr = [];
        foreach ($priceZones as $priceZone) {
            $priceZonesArr[$priceZone->id] = new Collection();
            $priceZonesArr[$priceZone->id]['title'] = $priceZone->color->title;
            $priceZonesArr[$priceZone->id]['color'] = $priceZone->color->code;
            $priceZonesArr[$priceZone->id]['price'] = $priceZone->price;
            $priceZonesArr[$priceZone->id]['seats_count'] = 0;
        }

        $tickets = $event->tickets->where('isAvailable', true);
        foreach ($tickets as $ticket) {
            $priceZone = $ticket->seatPrice->price_zone_id;
            $priceZonesArr[$priceZone]['seats_count'] += 1;
        }
        return $priceZonesArr;
    }
}

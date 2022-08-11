<?php

namespace App\Http\Controllers\Admin\v2;

use App\Models\PerformanceCalendar;
use App\Models\Reservation;
use App\Transformers\v2\EventTransformer;
use App\Http\Controllers\Controller;
use League\Fractal\Serializer\ArraySerializer;

class EventController extends Controller
{
    public function tickets($id) {

        if(!$event = PerformanceCalendar::with(
            'tickets',
            'tickets.reservation',
            'tickets.distributor',
            'tickets.seatPrice',
            'tickets.seatPrice.priceZone',
            'tickets.seatPrice.seat',
            'tickets.seatPrice.seat.row',
            'tickets.seatPrice.seat.row.section',
            'tickets.seatPrice.seat.row.section.translate',
            'tickets.orders',
            'tickets.orders.seller',
            'tickets.orders.buyer',
            'tickets.orders.tickets'
        )
            ->whereNotNull('hall_price_pattern_id')
            ->where('areTicketsGenerated', true)
            ->where('isSoldInCashBox', true)
            ->find($id)
        ) {
            return response()->json([
                'status' => false,
                'message' => 'Продаж закрито'
            ]);
        }
        $tickets = fractal($event, new EventTransformer)
            ->serializeWith(new ArraySerializer())
            ->parseIncludes([
                'hall',
                'performance',
                'tickets',
                'tickets.more',
                'tickets.order'
            ])->toArray();

        Reservation::whereIn('ticket_id', collect($tickets['tickets']['data'])->pluck('id'))->delete();

        return $tickets;
    }
}

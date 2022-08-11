<?php

namespace App\Transformers;

use App\Models\Ticket;
use League\Fractal\TransformerAbstract;

class TicketTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['seatPrice'];
    protected $availableIncludes = ['performanceCalendar'];

    public function transform(Ticket $ticket) {
        return [
            'id' => $ticket->id,
            'isAvailable' => $ticket->checkAvailability(),
            'discount' => $ticket->discount->name ?? null,
            'full_price' => $ticket->full_price,
            'price' => $ticket->price,
        ];
    }

    public function includeSeatPrice(Ticket $ticket) {
        return $this->item($ticket->seatPrice, new SeatPriceTransformer);
    }

    public function includePerformanceCalendar(Ticket $ticket) {
        return $this->item($ticket->performanceCalendar, new PerformanceCalendarTransformer);
    }
}

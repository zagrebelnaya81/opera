<?php

namespace App\Transformers\v2;

use App\Models\OrderStatus;
use App\Models\Ticket;
use League\Fractal\TransformerAbstract;

class TicketTransformer extends TransformerAbstract
{
    protected $defaultIncludes = ['seat'];
    protected $availableIncludes = ['seat', 'more', 'event', 'order'];

    public function transform(Ticket $ticket) {
        return [
            'id' => $ticket->id,
            'is_available' => $ticket->checkAvailability(),
            'price' => $ticket->price,
        ];
    }

    public function includeSeat(Ticket $ticket) {
        return $this->item($ticket->seatPrice, new SeatTransformer);
    }

    public function includeEvent(Ticket $ticket) {
        return $this->item($ticket->performanceCalendar, new EventTransformer);
    }

    public function includeOrder(Ticket $ticket) {
        if($ticket->order) {
            return $this->item($ticket->order, new OrderTransformer);
        }
    }

    public function includeMore(Ticket $ticket) {
        return $this->item($ticket, new TicketMoreInfoTransformer);
    }
}

<?php

namespace App\Transformers\v2;

use App\Models\Order;
use App\Models\PerformanceCalendar;
use App\Models\Ticket;
use App\Transformers\HallTransformer;
use League\Fractal\TransformerAbstract;

class EventTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['hall', 'tickets'];

    public function transform(PerformanceCalendar $event) {
        return [
            'id' => $event->id,
            'title' => $event->performance->translate->title,
            'date' => $event->date,
        ];
    }

    public function includeHall(PerformanceCalendar $event) {
        return $this->item($event->performance->hall, new HallTransformer);
    }

    public function includeTickets(PerformanceCalendar $event) {
        return $this->collection($event->tickets, new TicketTransformer);
    }
}

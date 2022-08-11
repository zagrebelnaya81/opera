<?php

namespace App\Transformers\v2;

use App\Models\OrderStatus;
use App\Models\Ticket;
use League\Fractal\TransformerAbstract;

class TicketMoreInfoTransformer extends TransformerAbstract
{
    public function transform(Ticket $ticket) {
        return [
            'status' => $ticket->availabilityStatus(),
            'distributor_id' => $ticket->distributor_id,
            'distributor' => $ticket->distributor ? $ticket->distributor->title : null,
        ];
    }
}

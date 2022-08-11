<?php

namespace App\Http\Controllers\Admin\v2;

use App\Models\Ticket;
use App\Transformers\v2\TicketTransformer;
use App\Http\Controllers\Controller;
use League\Fractal\Serializer\ArraySerializer;

class TicketController extends Controller
{
    public function show($id) {

        if(!$ticket = Ticket::find($id)) {
            return response()->json([
                'status' => false,
                'message' => 'No information for this ticket',
            ]);
        }

        return fractal($ticket, new TicketTransformer)
            ->serializeWith(new ArraySerializer())
            ->parseIncludes(['seat', 'more', 'event', 'order', 'order.tickets'])
            ->toArray();
    }
}

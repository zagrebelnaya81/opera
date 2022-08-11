<?php

namespace App\Transformers\v2;

use App\Models\Order;
use App\Models\Ticket;
use League\Fractal\TransformerAbstract;

class OrderTransformer extends TransformerAbstract
{
    protected $availableIncludes = ['tickets'];

    public function transform(Order $order) {
        return [
            'id' => $order->id,
            'status' => $order->status,
            //'seller' => $order->seller_id ? $order->seller->fullname() : null,
            //'buyer' => $order->buyer_id ? $order->buyer->fullname() : null,
            'payment_type' => $order->payment_type,
            'name' => $order->name,
            'phone' => $order->phone,
            'seat_count' => $order->tickets->count(),
            'total_price' => $order->tickets->sum('price'),
            'tickets' => $order->tickets->pluck('id')->toArray()
        ];
    }

    public function includeTickets(Order $order) {
        return $this->collection($order->tickets, new TicketTransformer);
    }
}

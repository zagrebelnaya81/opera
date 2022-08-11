<?php

namespace App\Repositories;

use App\Models\Discount;
use App\Models\Ticket;
use Illuminate\Container\Container as App;
use Illuminate\Support\Carbon;

class TicketRepository extends Repository
{
    /**
     * Specify Model class name
     *
     * @return mixed
     */
    function model()
    {
        return Ticket::class;
    }

    public function createTicket($data)
    {
        $ticket = [
            'performance_calendar_id' => $data['performance_calendar_id'],
            'seat_price_id' => $data['seat_price_id'],
            'full_price' => $data['full_price'],
        ];
        $this->create($ticket);
    }

    public function editTicket($data, $id)
    {
        $array = [
            'isAvailable' => $data['isAvailable'],
            'distributor_id' => $data['distributor_id'],
        ];

        $this->update($array, ['id' => $id]);
    }

    public function makeAvailable($id)
    {
        $this->update(['isAvailable' => true], ['id' => $id]);
    }

    public function makeUnavailable($id)
    {
        $this->update(['isAvailable' => false], ['id' => $id]);
    }

    public function activateTicket($id) {
        $this->update(['activated_at' => Carbon::now()], ['id' => $id]);
    }

    public function setDiscount($id, $discountId) {
        $this->update(['discount_id' => $discountId], ['id' => $id]);

        $this->recalculateFinalPrice($id);
    }

    public function recalculateFinalPrice($id) {
        $ticket = $this->find($id);

        $newPrice = $ticket->full_price;
        if(isset($ticket->discount)) {
            $newPrice = $ticket->full_price - ($ticket->full_price * $ticket->discount->size);
        }

        $this->update(['price' => $newPrice], ['id' => $id]);
    }
}

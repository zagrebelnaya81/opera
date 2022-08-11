<?php

namespace App\Exports;

use App\Models\Distributor;
use App\Models\PerformanceCalendar;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class EventDistributorSoldTicketsExport implements FromView
{
    protected $eventId;
    protected $distributorId;

    public function __construct($eventId, $distributorId)
    {
        $this->eventId = $eventId;
        $this->distributorId = $distributorId;
    }

    public function view(): View
    {
        $type = 'sold';
        $event = PerformanceCalendar::with([
            'tickets',
            'tickets.seatPrice',
            'tickets.seatPrice.seat',
            'tickets.seatPrice.seat.row',
            'tickets.seatPrice.seat.row.section',
            'tickets.seatPrice.seat.row.section.translate',
            'tickets.seatPrice.priceZone',
        ])->find($this->eventId);

        $distributor = Distributor::find($this->distributorId);

        $tickets = $event->tickets()
            ->whereHas('orders', function ($query) use ($distributor) {
                $query->where('buyer_id', $distributor->user_id);
            })->get();

        return view('admin.reports.event-distributor-booked', compact('event', 'tickets', 'distributor', 'type'));
    }
}
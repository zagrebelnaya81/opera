<?php

namespace App\Exports;

use App\Models\Distributor;
use App\Models\PerformanceCalendar;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class EventDistributorBookedTicketsExport implements FromView
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
        $type = 'booked';
        $event = PerformanceCalendar::with([
            'tickets',
            'tickets.seatPrice',
            'tickets.seatPrice.seat',
            'tickets.seatPrice.seat.row',
            'tickets.seatPrice.seat.row.section',
            'tickets.seatPrice.seat.row.section.translate',
            'tickets.seatPrice.priceZone',
        ])->find($this->eventId);

        $tickets = $event->tickets()
            ->where('distributor_id', $this->distributorId)
            ->where('isAvailable', false)
            ->get();

        $distributor = Distributor::find($this->distributorId);

        return view('admin.reports.event-distributor-booked', compact('event', 'tickets', 'distributor', 'type'));
    }
}
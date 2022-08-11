<table>
    <thead>
    <tr>
        <td colspan="5">Звіт по {{ $type == 'booked' ? 'бронюванню' : 'продажу' }} квитків на виступ {{ $event->performance->translate->title }} ({{ $event->performance->hall->translate->title }}), {{ $event->getFormatDateTime() }} дистриб'ютором {{ $distributor->title }}</td>
    </tr>
    <tr>
        <th>№</th>
        <th>Сектор</th>
        <th>Ряд</th>
        <th>Місце</th>
        <th>Ціна</th>
    </tr>
    <tbody>
    @set($counter, 0)
    @set($ticketsSum, 0)
    @foreach ($tickets as $ticket)
        <tr>
            <td>{{ ++$counter }}</td>
            <td>{{ $ticket->seatPrice->seat->row->section->translate->title }}</td>
            <td>{{ $ticket->seatPrice->seat->row->number }}</td>
            <td>{{ $ticket->seatPrice->seat->number }}</td>
            <td>{{ $ticket->seatPrice->priceZone->price }}</td>
            @set($ticketsSum, $ticketsSum += $ticket->seatPrice->priceZone->price)
        </tr>
    @endforeach
    </tbody>
    <tfoot>
    <tr>
        <td colspan="4"><b>Всього:</b></td>
        <td>{{ $ticketsSum }}</td>
    </tr>
    </tfoot>
</table>
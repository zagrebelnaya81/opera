<?php

namespace App\Transformers\v2;

use App\Models\SeatPrice;
use App\Models\Ticket;
use League\Fractal\TransformerAbstract;

class SeatTransformer extends TransformerAbstract
{
    public function transform(SeatPrice $seatPrice) {
        return [
            'id' => $seatPrice->id,
            'seat' => $seatPrice->seat->number,
            'row' => $seatPrice->seat->row->number,
            'section' => $seatPrice->seat->row->section->number,
            'section_name' => $seatPrice->seat->row->section->translate->title,
        ];
    }
}

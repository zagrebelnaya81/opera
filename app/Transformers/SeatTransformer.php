<?php

namespace App\Transformers;

use App\Models\Seat;
use League\Fractal\TransformerAbstract;

class SeatTransformer extends TransformerAbstract
{
    public function transform(Seat $seat) {
        return [
            'id' => $seat->id,
            'number' => $seat->number,
            'poster_id' => $seat->poster_id,
            'preview' => isset($seat->media) ? $seat->getFirstMediaUrl('preview') : null,
            'poster' => isset($seat->media) ? $seat->getFirstMediaUrl() : null,
            'recommended' => (integer)$seat->recommended,
        ];
    }
}

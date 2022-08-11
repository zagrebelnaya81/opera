<?php

namespace App\Transformers;

use App\Models\TicketTemplate;
use League\Fractal\TransformerAbstract;

class TicketTemplateTransformer extends TransformerAbstract
{
    public function transform(TicketTemplate $template)
    {
        return [
            'id' => $template->id,
            'title' => $template->title,
            'json_code' => $template->json_code,
            'html_code' => $template->html_code,
            'width' => (integer)$template->width,
            'height' => (integer)$template->height,
            'is_active_cash_box' => (boolean)$template->is_active_cash_box,
            'is_active_online' => (boolean)$template->is_active_online,
            'poster' => $template->getFirstMediaUrl('posters'),
        ];
    }
}

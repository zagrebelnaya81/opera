<?php

namespace App\Transformers;

use App\Models\Commission;
use League\Fractal\TransformerAbstract;

class CommissionTransformer extends TransformerAbstract
{
    /**
     * @param Commission $commission
     * @return array
     */
    public function transform(Commission $commission) {
        return [
            'id' => $commission->id,
            'title' => $commission->translate->title,
            'size' => $commission->size,
        ];
    }
}

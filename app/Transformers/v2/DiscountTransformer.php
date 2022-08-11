<?php

namespace App\Transformers\v2;

use App\Models\Discount;
use League\Fractal\TransformerAbstract;

class DiscountTransformer extends TransformerAbstract
{
    /**
     * @param Discount $discount
     * @return array
     */
    public function transform(Discount $discount)
    {
        return [
            'id' => $discount->id,
            'name' => $discount->name,
            'size' => $discount->size,
        ];
    }
}

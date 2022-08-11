<?php

namespace App\Repositories;
use App\Models\Color;
use App\Models\Discount;
use App\Models\PricePattern;
use App\Models\PriceZone;
use Illuminate\Container\Container as App;

class DiscountRepository extends Repository
{
    /**
     * Specify Model class name
     *
     * @return mixed
     */
    function model()
    {
        return Discount::class;
    }

    public function createDiscount($data)
    {
        $discount = [
            'name' => $data['name'],
            'size' => $data['size'],
            'is_active' => $data['is_active'] ?? false,
        ];
        $discount = $this->create($discount);

        return $discount;
    }

    public function editDiscount($data, $id) {
        $array = [
            'name' => $data['name'],
            'size' => $data['size'],
            'is_active' => $data['is_active'] ?? false,
        ];

        $this->update($array, ['id' => $id]);

        $discount = $this->find($id);

        return $discount;
    }
}

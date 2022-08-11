<?php

namespace App\Repositories;
use App\Models\Color;
use App\Models\PricePolicy;
use App\Models\PricePattern;
use App\Models\PriceZone;
use Illuminate\Container\Container as App;

class PricePolicyRepository extends Repository
{
    /**
     * Specify Model class name
     *
     * @return mixed
     */
    function model()
    {
        return PricePolicy::class;
    }

    public function createPricePolicy($data)
    {
        $pricePolicy = [
            'name' => $data['name'],
            'size' => $data['size'],
            'color_code' => $data['color_code'],
        ];
        $pricePolicy = $this->create($pricePolicy);

        return $pricePolicy;
    }

    public function editPricePolicy($data, $id) {
        $array = [
            'name' => $data['name'],
            'size' => $data['size'],
            'color_code' => $data['color_code'],
        ];

        $this->update($array, ['id' => $id]);

        $pricePolicy = $this->find($id);

        return $pricePolicy;
    }
}

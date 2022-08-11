<?php

namespace App\Repositories;
use App\Models\Color;
use App\Models\Distributor;
use App\Models\PricePattern;
use App\Models\PriceZone;
use Illuminate\Container\Container as App;

class DistributorRepository extends Repository
{
    /**
     * Specify Model class name
     *
     * @return mixed
     */
    function model()
    {
        return Distributor::class;
    }

    public function createDistributor($data)
    {
        $data['type'] = $data['type'] ?? Distributor::INDIVIDUAL_ENTREPRENEUR;

        $data['is_active'] = $data['is_active'] ?? 1;

        $distributor = $this->create($data);

        return $distributor;
    }

    public function editDistributor($data, $id) {

        $this->update($data, ['id' => $id]);

        $distributor = $this->find($id);

        return $distributor;
    }
}

<?php

namespace App\Http\Controllers\Api\v1;

use App\Models\Commission;
use App\Transformers\CommissionTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Fractalistic\ArraySerializer;

class CommissionController extends Controller
{
    public function index() {
        $commissions = Commission::all();

        return fractal($commissions, new CommissionTransformer)
            ->serializeWith(new ArraySerializer)
            ->toArray();
    }
}

<?php

namespace App\Repositories;

use App\Models\ReportConstructor;
use App\Repositories\Contracts\ReportConstructorRepositoryContract;
use Illuminate\Http\Request;

class ReportConstructorRepository implements ReportConstructorRepositoryContract {

    public function all(Request $request)
    {
        $reportTemplates = ReportConstructor::all();

        return $reportTemplates;
    }

    public function find($id){
        return ReportConstructor::find($id);
    }

}
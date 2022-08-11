<?php

namespace App\Repositories\Contracts;

use Illuminate\Http\Request;

interface ReportConstructorRepositoryContract {

    public function all(Request $request);

    public function find(Request $request);

}
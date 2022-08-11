<?php

namespace App\Repositories\Contracts;

use App\Models\ReportConstructor;
use Illuminate\Http\Request;

interface ReportRepositoryContract {

    public function get(Request $request, ReportConstructor $reportConstructor);

}
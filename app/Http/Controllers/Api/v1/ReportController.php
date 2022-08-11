<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\ReportConstructor;
use App\Repositories\Contracts\ReportRepositoryContract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    protected $reportRepository;

    public function __construct(ReportRepositoryContract $reportRepository)
    {
        $this->reportRepository = $reportRepository;
    }

    function index(Request $request, ReportConstructor $reportConstructor){

        return response()->json([
            'message' => 'success',
            'data' => $this->reportRepository->search($request, $reportConstructor)
        ]);
    }
}

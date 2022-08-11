<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReportConstructorStoreRequest;
use App\Http\Requests\ReportConstructorUpdateRequest;
use App\Models\ReportConstructor;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;

class ReportConstructorController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();

        return response()->json([
            'message' => 'success',
            'data' => ReportConstructor::all()
        ]);
    }

    public function show(ReportConstructor $reportConstructor)
    {
        return response()->json([
            'message' => 'success',
            'data' => $reportConstructor
        ]);
    }

    /**
     * @param ReportConstructorStoreRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ReportConstructorStoreRequest $request)
    {
        $reportConstructor = new ReportConstructor();
        $reportConstructor->fill($request->all());
        $reportConstructor->save();

        return response()->json([
            'message' => 'success',
            'data' => $reportConstructor
        ]);
    }

    /**
     * @param ReportConstructorUpdateRequest $request
     * @param ReportConstructor $reportConstructor
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ReportConstructorUpdateRequest $request, ReportConstructor $reportConstructor)
    {
        $reportConstructor->fill($request->all());
        $reportConstructor->save();

        return response()->json([
            'message' => 'success',
            'data' => $reportConstructor
        ]);
    }

    /**
     * @param ReportConstructor $reportConstructor
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ReportConstructor $reportConstructor)
    {
        $reportConstructor->delete();

        return response()->json([
            'message' => 'success',
            'data' => $reportConstructor
        ]);
    }
}

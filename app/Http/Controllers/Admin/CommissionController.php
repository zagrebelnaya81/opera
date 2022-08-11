<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StoreCommission;
use App\Models\Commission;
use App\Repositories\CommissionRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class CommissionController extends Controller
{
    protected $commissionRepository;

    public function __construct(CommissionRepository $commissionRepository)
    {
        $this->middleware('permission:commission-list');
        $this->middleware('permission:commission-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:commission-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:commission-delete', ['only' => ['destroy']]);

        $this->commissionRepository = $commissionRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $commissions = Commission::with('translate')->get();
        return view('admin.commissions.index', compact('commissions'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $commissions = Commission::with('translate')->get();
        $commissions = array_multilanguage_formatter($commissions, 'id', 'title');
        return view('admin.commissions.create', compact('commissions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCommission $request)
    {
        $data = $request->all();
        $this->commissionRepository->createCommission($data);
        Session::flash('message', 'Successfully created!');
        return redirect()->route('commissions.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Commission $commission
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Commission $commission)
    {
        $commissions = Commission::with('translate')->where('id', '!=', $commission->id)->get();
        $commissions = array_multilanguage_formatter($commissions, 'id', 'title');
        return view('admin.commissions.edit', compact('commission', 'commissions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();
        $this->commissionRepository->editCommission($data, $id);
        Session::flash('message', 'Successfully updated!');
        return redirect()->route('commissions.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Commission::find($id)->delete();
        return redirect()->route('commissions.index');
    }
}

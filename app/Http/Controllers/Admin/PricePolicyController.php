<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StorePricePolicy;
use App\Models\PricePolicy;
use App\Repositories\PricePolicyRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class PricePolicyController extends Controller
{
    protected $pricePolicyRepository;

    public function __construct(PricePolicyRepository $pricePolicyRepository)
    {
        $this->middleware('permission:price-policy-list');
        $this->middleware('permission:price-policy-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:price-policy-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:price-policy-delete', ['only' => ['destroy']]);

        $this->pricePolicyRepository = $pricePolicyRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pricePolicies = PricePolicy::latest('id')->paginate();

        return view('admin.price-policies.index', compact('pricePolicies'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.price-policies.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePricePolicy $request)
    {
        $data = $request->all();

        $this->pricePolicyRepository->createPricePolicy($data);

        Session::flash('message', 'Successfully created discount item!');
        return redirect()->route('price-policies.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$pricePolicy = PricePolicy::find($id)) {
            abort(404);
        }

        return view('admin.price-policies.edit', compact('pricePolicy'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(StorePricePolicy $request, $id)
    {
        $data = $request->all();

        $this->pricePolicyRepository->editPricePolicy($data, $id);

        Session::flash('message', 'Successfully updated discount item!');
        return redirect()->route('price-policies.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!$pricePolicy = PricePolicy::find($id)) {
            abort(404);
        }
        $pricePolicy->delete();

        return redirect()->route('price-policies.index');
    }
}

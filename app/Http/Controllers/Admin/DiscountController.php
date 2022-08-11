<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StoreDiscount;
use App\Models\Discount;
use App\Repositories\DiscountRepository;
use App\Repositories\UserRepository;
use App\Transformers\v2\DiscountTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Session;

class DiscountController extends Controller
{
    protected $discountRepository;

    public function __construct(DiscountRepository $discountRepository)
    {
        $this->middleware('permission:discount-list');
        $this->middleware('permission:discount-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:discount-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:discount-delete', ['only' => ['destroy']]);

        $this->discountRepository = $discountRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $discounts = Discount::latest('id')->paginate();

        return view('admin.discounts.index', compact('discounts'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.discounts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDiscount $request)
    {
        $data = $request->all();

        $this->discountRepository->createDiscount($data);

        Session::flash('message', 'Successfully created discount item!');
        return redirect()->route('discounts.index');
    }

    public function getList()
    {
        $discounts = Discount::where('is_active', true)->get();

        return fractal()
            ->collection($discounts)
            ->transformWith(new DiscountTransformer)
            ->toArray();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$discount = Discount::find($id)) {
            abort(404);
        }

        return view('admin.discounts.edit', compact('discount'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreDiscount $request, $id)
    {
        $data = $request->all();

        $this->discountRepository->editDiscount($data, $id);

        Session::flash('message', 'Successfully updated discount item!');
        return redirect()->route('discounts.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!$discount = Discount::find($id)) {
            abort(404);
        }
        $discount->delete();

        return redirect()->route('discounts.index');
    }
}

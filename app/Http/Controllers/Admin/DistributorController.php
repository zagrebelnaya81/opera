<?php

namespace App\Http\Controllers\Admin;

use App\Models\Distributor;
use App\Http\Requests\StoreDistributor;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Transformers\DistributorTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Repositories\DistributorRepository;
use Illuminate\Support\Str;
use phpseclib\Crypt\Hash;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DistributorController extends Controller
{

    protected $distributorRepository;
    protected $userRepository;

    public function __construct(DistributorRepository $distributorRepository, UserRepository $userRepository)
    {
        $this->middleware('permission:distributor-list');
        $this->middleware('permission:distributor-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:distributor-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:distributor-delete', ['only' => ['destroy']]);

        $this->distributorRepository = $distributorRepository;
        $this->userRepository = $userRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $distributors = Distributor::latest()->paginate();

        return view('admin.distributors.index', compact('distributors'));
    }

    /**
     * @param Distributor $distributor
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(Distributor $distributor)
    {
        return view('admin.distributors.create', [
            'distributor' => $distributor,
            'statuses' => [
                1 => 'Активний',
                0 => 'Неактивний'
            ],
            'types' => [
                Distributor::INDIVIDUAL_ENTREPRENEUR => 'Фізична особа-підприємець',
                Distributor::REMOTE_CASH_BOX => 'Віддалена каса',
                Distributor::COMPANY => 'Компанія',
            ]
        ]);
    }

    /**
     * @param StoreDistributor $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreDistributor $request)
    {
        $email = $request->email;
        $password = \Illuminate\Support\Facades\Hash::make(mt_rand(1111111111, 99999999999));
        $title = $request->title;

        $user = User::create([
            'login' => $email,
            'email' => $email,
            'password' => $password,
            'firstName' => $title
        ]);

        $user->save();

        $distributor = new Distributor();

        $distributor->fill(
            $request->except(['_method', '_token'])
        );
        $distributor->user_id = $user->id;

        $distributor->save();

        return redirect()->route('distributors.index')->with(['success' => 'Успішно створено!']);
    }

    public function types() {
        return response()->json(
            Distributor::types()
        );
    }

    public function getList()
    {
        $distributors = Distributor::where('is_active', true)->get();

        return fractal()
            ->collection($distributors)
            ->transformWith(new DistributorTransformer)
            ->toArray();
    }

    /**
     * @param Distributor $distributor
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(Distributor $distributor)
    {
        return view('admin.distributors.edit', [
            'distributor' => $distributor,
            'statuses' => [
                1 => 'Активний',
                0 => 'Неактивний'
            ],
            'types' => [
                Distributor::INDIVIDUAL_ENTREPRENEUR => 'Фізична особа-підприємець',
                Distributor::REMOTE_CASH_BOX => 'Віддалена каса',
                Distributor::COMPANY => 'Компанія',
            ]
        ]);
    }

    /**
     * @param StoreDistributor $request
     * @param Distributor $distributor
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(StoreDistributor $request, Distributor $distributor)
    {
        $user = $distributor->user ?? new User();
        $user->email = $distributor->email;
        $user->firstName = $distributor->title;
        $user->login = $distributor->email;
        $user->password = $user->password ?: \Illuminate\Support\Facades\Hash::make(mt_rand(1111111111, 9999999999));
        $user->save();

        $distributor->fill(
            $request->except(['_method', '_token'])
        );
        $distributor->user_id = $user->id;

        $distributor->save();

        return redirect()->route('distributors.index')->with(['success' => 'Успішно оновлено!']);
    }

    /**
     * @param Distributor $distributor
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Distributor $distributor)
    {
        $distributor->delete();

        return redirect()->route('distributors.index')->with(['success' => 'Успішно выдалено!']);
    }

    public function token(Distributor $distributor)
    {
        $user = $distributor->user;

        $tokens = $user->tokens;

        $tokens->map(function($token){
            $token->delete();
        });

        $token = $user->createToken('personal')->accessToken;

        return response()->json([
            'token' => $token
        ]);
    }
}

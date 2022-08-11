<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceTranslation;
use App\Repositories\ServiceRepository;
use App\Http\Requests\StoreService;
use Illuminate\Support\Facades\Session;
use App\Repositories\FileRepository;

class ServiceController extends Controller
{
    use ImageManagerTrait;

    protected $serviceRepository;

    public function __construct(ServiceRepository $serviceRepository)
    {
        $this->middleware('permission:service-list');
        $this->middleware('permission:service-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:service-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:service-delete', ['only' => ['destroy']]);

        $this->serviceRepository = $serviceRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $services = Service::with('translate')->latest()->paginate();
        return view('admin.services.index', compact('services'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.services.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreService $request)
    {
        $data = $request->all();
        $service = $this->serviceRepository->createService($data);

        $this->checkAndUploadGalleryImages($request, 'images', 'service-images', $service);

        Session::flash('message', 'Successfully created service!');
        return redirect()->route('services.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $service = Service::find($id);
        if (empty($service)) {
            abort(404);
        }

        return view('admin.services.edit', compact('service'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        if (!$service = Service::find($id)) {
            throw new NotFoundHttpException('Service plans not found');
        }
        $data = $request->all();

        $this->serviceRepository->editService($data, $id);

        $this->checkAndUpdateGalleryImages($request, 'uploadedImages', 'service-images', $service);
        $this->checkAndUploadGalleryImages($request, 'images', 'service-images', $service);

        Session::flash('message', 'Successfully updated service plans!');
        return redirect()->route('services.index');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Service::find($id)->delete();
        return redirect()->route('services.index');
    }
}

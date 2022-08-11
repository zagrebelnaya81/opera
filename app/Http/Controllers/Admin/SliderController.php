<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Slider;
use App\Repositories\SliderRepository;
use App\Http\Requests\StoreSlider;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SliderController extends Controller
{
    use ImageManagerTrait;

    protected $sliderRepository;

    public function __construct(SliderRepository $sliderRepository)
    {
        $this->middleware('permission:slider-list');
        $this->middleware('permission:slider-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:slider-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:slider-delete', ['only' => ['destroy']]);

        $this->sliderRepository = $sliderRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $slides = Slider::with(['translate'])->latest()->paginate();
        return view('admin.slider.index', compact('slides'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.slider.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreSlider|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSlider $request)
    {
        $data = $request->all();

        $slide = $this->sliderRepository->createSlide($data);

        $this->checkAndUploadImage($request, 'poster', 'posters', $slide);

        Session::flash('message', 'Successfully created slider!');
        return redirect()->route('slider.index');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$slide = Slider::find($id)) {
            abort(404);
        }

        return view('admin.slider.edit', compact('slide'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreSlider|Request $request
     * @param int $id
     * @return Response
     */
    public function update(StoreSlider $request, $id)
    {
        if (!$slide = Slider::find($id)) {
            throw new NotFoundHttpException('Slider not found');
        }
        $data = $request->all();

        $this->checkAndUploadImage($request, 'poster', 'posters', $slide);

        $this->sliderRepository->editSlide($data, $slide);

        Session::flash('message', 'Successfully edited slider!');
        return redirect()->route('slider.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $slide = Slider::find($id);
        $slide->delete();
        return redirect()->route('slider.index');
    }
}

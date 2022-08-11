<?php

namespace App\Http\Controllers\Admin;

use App\Models\Row;
use App\Models\Seat;
use App\Repositories\SeatRepository;
use App\Transformers\HallTransformer;
use App\Transformers\MediaTransformer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Hall;
use App\Repositories\HallRepository;
use App\Http\Requests\StoreHall;
use Illuminate\Support\Facades\Session;
use App\Repositories\FileRepository;

class HallController extends Controller
{
    use ImageManagerTrait;

    protected $fileRepository;

    protected $hallRepository;

    protected $seatRepository;

    public function __construct(HallRepository $hallRepository, FileRepository $fileRepository, SeatRepository $seatRepository)
    {
        $this->middleware('permission:hall-list');
        $this->middleware('permission:hall-seat-best-choice-edit', ['only' => ['show', 'updateHallSeats']]);
        $this->middleware('permission:hall-seat-image-edit', ['only' => ['showImages', 'updateHallSeatPosters']]);
        $this->middleware('permission:hall-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:hall-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:hall-delete', ['only' => ['destroy']]);

        $this->hallRepository = $hallRepository;
        $this->fileRepository = $fileRepository;
        $this->seatRepository = $seatRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $halls = Hall::with('translate', 'media')->paginate();
        return view('admin.hall_plans.index', compact('halls'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.hall_plans.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreHall $request)
    {
        $data = $request->all();
        $data['file_description_en'] = $this->checkAndUploadFile($request, 'file_description_en', '/uploads/hall_descriptions');
        $data['file_description_ru'] = $this->checkAndUploadFile($request, 'file_description_ru', '/uploads/hall_descriptions');
        $data['file_description_ua'] = $this->checkAndUploadFile($request, 'file_description_ua', '/uploads/hall_descriptions');
        $hall = $this->hallRepository->createHall($data);
        $this->checkAndUploadImage($request, 'poster', 'posters', $hall);
        $this->checkAndUploadGalleryImages($request, 'images', 'hall-images', $hall);

        Session::flash('message', 'Successfully created hall plans!');
        return redirect()->route('halls.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!$hall = Hall::with('translate')->find($id)) {
            throw new NotFoundHttpException('Зал не знайдено!');
        }

        return view('admin.hall_plans.show', compact('hall'));
    }

    public function showImages($id)
    {
        if (!$hall = Hall::with('translate')->find($id)) {
            throw new NotFoundHttpException('Зал не знайдено!');
        }

        return view('admin.hall_plans.show-images', compact('hall'));
    }

    public function getHallSeats($id)
    {
        if (!$hall = Hall::find($id)) {
            return response()->json([
                'status' => false,
                'message' => __('messages.something_went_wrong'),
            ]);
        }

        return fractal()
            ->item($hall)
            ->parseIncludes(['sections', 'rows', 'seats'])
            ->transformWith(new HallTransformer)
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
        $hall = Hall::find($id);
        if (empty($hall)) {
            abort(404);
        }

        $sectionIds = $hall->sections()->pluck('id')->toArray();
        $rowIds = Row::whereIn('section_id', $sectionIds)->pluck('id')->toArray();
        $seatPosterIds = Seat::whereIn('row_id', $rowIds)->groupBy('poster_id')->pluck('poster_id')->toArray();
        return view('admin.hall_plans.edit', compact('hall', 'seatPosterIds'));
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
        if (!$hall = Hall::find($id)) {
            throw new NotFoundHttpException('Hall not found');
        }
        $data = $request->all();

        $this->checkAndUploadImage($request, 'poster', 'posters', $hall);
        $data['file_description_en'] = $this->checkAndUploadFile($request, 'file_description_en', '/uploads/hall_descriptions');
        $data['file_description_ru'] = $this->checkAndUploadFile($request, 'file_description_ru', '/uploads/hall_descriptions');
        $data['file_description_ua'] = $this->checkAndUploadFile($request, 'file_description_ua', '/uploads/hall_descriptions');

        $this->hallRepository->editHall($data, $id);

        $this->checkAndUpdateGalleryImages($request, 'uploadedImages', 'hall-images', $hall);
        $this->checkAndUploadGalleryImages($request, 'images', 'hall-images', $hall);

        $this->checkAndUpdateGalleryImages($request, 'uploadedSeatImages', 'seat-images', $hall);
        $this->checkAndUploadGalleryImages($request, 'seatImages', 'seat-images', $hall);

        Session::flash('message', 'Successfully updated hall plans!');
        return redirect()->route('halls.index');
    }

    public function updateHallSeats(Request $request, $id)
    {
        if (!$hall = Hall::find($id)) {
            return response()->json([
                'status' => false,
                'message' => __('messages.something_went_wrong'),
            ]);
        }

        $data = $request->all();

        $seats = $data['seats'];

        foreach ($seats as $seat) {
            $data = [
                'recommended' => $seat['recommended'],
            ];
            $this->seatRepository->editSeat($data, $seat['id']);
        }

        return response()->json([
            'data' => $hall
        ]);
    }

    public function hallSeatPosters($id)
    {
        if (!$hall = Hall::find($id)) {
            return response()->json([
                'status' => false,
                'message' => __('messages.something_went_wrong'),
            ]);
        }

        return fractal()
            ->collection($hall->getMedia('seat-images'))
            ->transformWith(new MediaTransformer)
            ->toArray();
    }

    public function updateHallSeatPosters(Request $request, $id)
    {
        if (!$hall = Hall::find($id)) {
            return response()->json([
                'status' => false,
                'message' => __('messages.something_went_wrong'),
            ]);
        }

        $data = $request->all();
        $seats = $data['seats'];

        foreach ($seats as $seat) {
            $seatModel = Seat::find($seat['id']);
            $seatModel->update(['poster_id' => $seat['poster_id']]);
        }

        return response()->json([
            'status' => true
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Hall::find($id)->delete();
        return redirect()->route('halls.index');
    }

    public function checkAndUploadFile($request, $fileName, $path)
    {
        if ($fileName = $request->file($fileName)) {
            return $this->fileRepository->saveFile($fileName, $path)->url;
        }
        return null;
    }
}

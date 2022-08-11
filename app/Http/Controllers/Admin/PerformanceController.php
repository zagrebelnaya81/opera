<?php

namespace App\Http\Controllers\Admin;

use App\Models\HallPricePattern;
use App\Http\Requests\StorePerformance;
use App\Models\Performance;
use App\Models\PerformanceCalendar;
use App\Models\PerformanceType;
use App\Models\PerformanceActor;
use App\Models\Season;
use App\Models\Hall;
use App\Repositories\ImageRepository;
use App\Repositories\FileRepository;
use App\Repositories\PerformanceCalendarRepository;
use App\Repositories\PerformanceRepository;
use App\Repositories\VideoRepository;
use App\Repositories\ActorRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PerformanceController extends Controller
{
    use ImageManagerTrait;
    /**
     * @var PerformanceRepository
     */
    protected $performanceRepository;

    /**
     * @var FileRepository
     */
    protected $fileRepository;

    /**
     * @var PerformanceCalendarRepository
     */
    protected $performanceCalendarRepository;

    protected $actorRepository;

    public function __construct(
        PerformanceRepository $performanceRepository,
        FileRepository $fileRepository,
        PerformanceCalendarRepository $performanceCalendarRepository,
        ActorRepository $actorRepository
    )
    {
        $this->middleware('permission:performance-list');
        $this->middleware('permission:event-manage', ['only' => ['show']]);
        $this->middleware('permission:performance-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:performance-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:performance-delete', ['only' => ['destroy']]);

        $this->performanceRepository = $performanceRepository;
        $this->fileRepository = $fileRepository;
        $this->performanceCalendarRepository = $performanceCalendarRepository;
        $this->actorRepository = $actorRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
//        $performances = Performance::with('translate', 'media')->latest()->paginate();
//        return view('admin.performance.index', compact('performances'));

        $search = $request->get('query');
        $performancesQuery = Performance::with('translate', 'media');

        if ($request->id) {
            $performancesQuery->where('id', $request->id);
        }

        if ($search) {
            $performancesQuery->whereHas('translate', function($query) use ($search) {
                return $query
                    ->Where('title', 'like', "%$search%");
            });
        }

        $performances = $performancesQuery->latest()->paginate();

        return view('admin.performance.index', compact('performances'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $typePerformance = PerformanceType::latest()->get();
        $typePerformance = array_multilanguage_formatter($typePerformance, 'id', 'title');
        $halls = Hall::latest()->get();
        $halls = array_multilanguage_formatter($halls, 'id', 'title');
        $seasons = Season::all();
        $seasons = array_multilanguage_formatter($seasons, 'id', 'title');

        return view('admin.performance.create', compact('typePerformance', 'seasons', 'halls'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePerformance $request)
    {
        $data = $request->all();

        $this->checkAndUploadFile($request, 'program_en', '/uploads/performance_programs');
        $this->checkAndUploadFile($request, 'program_ru', '/uploads/performance_programs');
        $this->checkAndUploadFile($request, 'program_ua', '/uploads/performance_programs');

        $performance = $this->performanceRepository->createPerformances($data);

        $this->checkAndUploadImage($request, 'poster', 'posters', $performance);        
        $this->checkAndUploadImage($request, 'director_image', 'directors', $performance);
        $this->checkAndUploadImage($request, 'director_image2', 'directors2', $performance);

        Session::flash('message', 'Виступ створено успішно!');
        return redirect()->route('performance.edit', $performance->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!$performance = Performance::with(
            'translate',
            'dates',
            'dates.hallPricePattern'
        )->find($id)) {
            throw new NotFoundHttpException('Виступ не знайдено');
        }

        $hallPricePatterns = HallPricePattern::where('hall_id', $performance->hall_id)->pluck('title', 'id');

        return view('admin.performance.show', compact('performance', 'hallPricePatterns'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$performance = $this->performanceRepository->getMultiLangModelById($id)) {
            throw new NotFoundHttpException('Performance not found');
        }
        $typePerformance = PerformanceType::with('translate')->get();
        $typePerformance = array_multilanguage_formatter($typePerformance, 'id', 'title');
        $halls = Hall::with('translate')->get();
        $halls = array_multilanguage_formatter($halls, 'id', 'title');
        $seasons = Season::with('translate')->get();
        $seasons = array_multilanguage_formatter($seasons, 'id', 'title');
        $genActors = $this->performanceRepository->getGeneralActors($performance);
        $generalActors = array_formatter($genActors, ['id' => 'id', 'fullName' => 'fullName']);
        $generalActorsIndex = array_formatter_index($genActors, ['id' => 'id', 'fullName' => 'fullName']);
        $actors = $this->actorRepository->getAllActors();
        
        $performanceCalendar = DB::table('performance_calendars')
            ->where('performance_id', $id)
            ->first();
        if (isset($performanceCalendar)) {
            $performanceActors = DB::table('performance_calendar_actors')
                ->where('performance_calendar_id', $performanceCalendar->id)
                ->get();
        }
        $roles = $performance->roles;
        return view('admin.performance.edit',
            compact('performance', 'typePerformance', 'seasons', 'generalActors',
                'generalActorsIndex',
                //'shallPerformance',
                'halls',
                'actors',
                'performanceActors',
                'roles')
        );
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
        if (!$performance = $this->performanceRepository->getMultiLangModelById($id)) {
            throw new NotFoundHttpException('Performance not found');
        }
        $performanceCalendar = DB::table('performance_calendars')
        ->where('performance_id', $id)
        ->first();
        
        $data = $request->all();
            

        $this->checkAndUploadImage($request, 'poster', 'posters', $performance);
        $this->checkAndUploadImage($request, 'director_image', 'directors', $performance);

        $this->checkAndUploadImage($request, 'director_image2', 'directors2', $performance);

        $data['program_en'] = $this->checkAndUploadFile($request, 'program_en', '/uploads/performance_programs');
        $data['program_ru'] = $this->checkAndUploadFile($request, 'program_ru', '/uploads/performance_programs');
        $data['program_ua'] = $this->checkAndUploadFile($request, 'program_ua', '/uploads/performance_programs');

        $this->performanceRepository->updatePerformance($data, $performance);
        $performanceActors = DB::table('performance_calendar_actors')
                ->where('performance_calendar_id', $performanceCalendar->id)
                ->delete();
        $roles = $request->post('roles');

        if($request->post('actors')){
            foreach ($request->post('actors') as $key => $ID) {
                DB::table('performance_calendar_actors')->insert([
                    'performance_calendar_id' => $performanceCalendar->id,
                    'actor_id' => $ID,
                    'actor_role_id' => $roles[$key]
                ]);
            }
        }

        Session::flash('message', 'Виступ відредаговано успішно!');
        return redirect()->route('performance.edit', $id);
    }

    public function checkAndUploadFile($request, $fileName, $path)
    {
        if ($fileName = $request->file($fileName)) {
            return $this->fileRepository->saveFile($fileName, $path)->url;
        }
        return null;
    }

    public function updateDates(Request $request, $id)
    {
        if (!$performance = $this->performanceRepository->getMultiLangModelById($id)) {
            throw new NotFoundHttpException('Виступ не знайдено');
        }

        $data = $request->all();

        foreach ($performance->allDates()->find($data['ids']) as $date) {
            $array = [
                'hall_price_pattern_id' => $data['hall_price_pattern_id_' . $date->id] ?? null,
                'isSoldInCashBox' => $data['isSoldInCashBox_' . $date->id] ?? false,
                'isSoldOnline' => $data['isSoldOnline_' . $date->id] ?? false,
            ];
            $this->performanceCalendarRepository->editPerformanceCalendar($array, $date->id);
        }

        Session::flash('message', 'Оновлено успішно');
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->performanceRepository->delete($id);

        Session::flash('message', 'Successfully deleted the nerd!');
        return Redirect::to('/admin/performance');
    }

    public function getNewDateSection()
    {
        $returnHTML = view('admin.performance.components.performance_date')->render();
        return response()->json(['success' => true, 'html' => $returnHTML]);
    }

    public function search(Request $request)
    {
        $search = $request->get('query');
        $performancesQuery = Performance::with('translate');

        if ($search) {
            $performancesQuery->whereHas('translate', function($query) use ($search) {
                return $query
                    ->where('title', 'like', "%$search%");
            });
        }

        return response()->json($performancesQuery->get());
    }


}

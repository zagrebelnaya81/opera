<?php
/**
 * Created by PhpStorm.
 * User: boris
 * Date: 03.03.20
 * Time: 23:26
 */

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StorePerformanceCalendarRequest;
use App\Models\Actor;
use App\Models\ActorRole;
use App\Models\Performance;
use App\Models\PerformanceActor;
use App\Models\PerformanceCalendar;
use App\Models\PerformanceCalendarActor;
use App\Repositories\ActorRepository;
use App\Repositories\ActorRoleRepository;
use App\Repositories\FileRepository;
use App\Repositories\PerformanceCalendarRepository;
use App\Repositories\PerformanceRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PerformanceRoleActorDateController extends Controller
{

    use ImageManagerTrait;
    /**
     * @var ActorRepository
     */
    protected $actorRepository;


    /**
     * @var ActorRoleRepository
     */
    protected $actorRoleRepository;

    /**
     * @var FileRepository
     */
    protected $fileRepository;


    /**
     * @var PerformanceRepository
     */
    protected $performanceRepository;

    /**
     * @var PerformanceCalendarRepository
     */
    protected $performanceCalendarRepository;


    public function __construct(
        PerformanceRepository $performanceRepository,
        FileRepository $fileRepository,
        PerformanceCalendarRepository $performanceCalendarRepository,
        ActorRoleRepository $actorRoleRepository,
        ActorRepository $actorRepository
    )
    {

//        $this->middleware('permission:performance-actor-role-edit');

        $this->performanceRepository = $performanceRepository;
        $this->fileRepository = $fileRepository;
        $this->performanceCalendarRepository = $performanceCalendarRepository;
        $this->actorRoleRepository = $actorRoleRepository;
        $this->actorRepository = $actorRepository;
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $performanceCalendar = PerformanceCalendar::findOrFail($id);

        $performanceCalendar = $this->performanceCalendarRepository->getMultiLangModelById(
            $performanceCalendar->id
        );

        $performance = $performanceCalendar->performance;

        $performanceActors = DB::table('performance_calendar_actors')
            ->where('performance_calendar_id', $performanceCalendar->id)
            ->get();

        $roles = $performance->roles;
        $actors = $this->actorRepository->getAllActors();

        return view('admin.performance_role_actor_date.edit',
            compact(
                'performance',
                'performanceCalendar',
                'roles',
                'actors',
                'performanceActors'
            )
        );

    }

    /**
     * @param StorePerformanceCalendarRequest $request
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(StorePerformanceCalendarRequest $request, $id)
    {
        $performanceCalendar = PerformanceCalendar::findOrFail($id);

        $performanceCalendar->fill($request->post());
        $performanceCalendar->save();

        $this->performanceCalendarRepository->updateOrCreateTranslation(
            $request->all(),
            $performanceCalendar->id
        );

        $actors = $performanceCalendar->actors();

        $actors->detach();

        $roles = $request->post('roles');

        if($request->post('actors')){
            foreach ($request->post('actors') as $key => $id) {
                DB::table('performance_calendar_actors')->insert([
                    'performance_calendar_id' => $performanceCalendar->id,
                    'actor_id' => $id,
                    'actor_role_id' => $roles[$key],
                    'date' => $performanceCalendar->date
                ]);
            }
        }

        if($file = $request->file('poster1')){
            $performanceCalendar->clearMediaCollection('poster1');
            $performanceCalendar->addMedia($file)->toMediaCollection('poster1');
        }

        if($file = $request->file('poster2')){
            $performanceCalendar->clearMediaCollection('poster2');
            $performanceCalendar->addMedia($file)->toMediaCollection('poster2');
        }

        return redirect()->route('performance-actors-roles.edit',
            ['id' => $performanceCalendar->id]
        );

    }

}

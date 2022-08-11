<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StoreActor;
use App\Models\Actor;
use App\Models\ActorGroup;
use App\Models\ActorImage;
use App\Models\ActorTranslation;
use App\Models\ActorVideo;
use App\Repositories\ActorRepository;
use App\Repositories\ImageRepository;
use App\Repositories\VideoRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ActorController extends Controller
{
    use ImageManagerTrait;

    protected $actorRepository;

    public function __construct(ActorRepository $actorRepository)
    {
        $this->middleware('permission:actor-list');
        $this->middleware('permission:actor-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:actor-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:actor-delete', ['only' => ['destroy']]);

        $this->actorRepository = $actorRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->get('query');
        $actorsQuery = Actor::with('translate', 'group', 'group.translate', 'media');

        if ($request->id) {
            $actorsQuery->where('id', $request->id);
        }

        if ($search) {
            $actorsQuery->whereHas('translate', function($query) use ($search) {
                return $query
                    ->where('firstName', 'like', "%$search%")
                    ->orWhere('lastName', 'like', "%$search%");
            });
        }

        $actors = $actorsQuery->latest()->paginate();

        return view('admin.actors.index', compact('actors'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $actorGroups = ActorGroup::with('translate')->get();
        $actorGroups = array_multilanguage_formatter($actorGroups, 'id', 'title');

        return view('admin.actors.create', compact('actorGroups'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreActor|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreActor $request)
    {
        $data = $request->all();
        $actor = $this->actorRepository->createActors($data);
        $this->checkAndUploadImage($request, 'poster', 'posters', $actor);
        Session::flash('message', 'Successfully created actor!');
        return redirect()->route('actor.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
//        echo $id;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$actor = Actor::find($id)) {
            abort(404);
        }
        $actorGroups = ActorGroup::all();
        $actorGroups = array_multilanguage_formatter($actorGroups, 'id', 'title');
        return view('admin.actors.edit', compact('actorGroups', 'actor'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreActor|Request $request
     * @param  int $id
     * @return Response
     */
    public function update(StoreActor $request, $id)
    {
        if (!$actor = Actor::find($id)) {
            throw new NotFoundHttpException('Actor not found');
        }
        $data = $request->all();
        $this->checkAndUploadImage($request, 'poster', 'posters', $actor);

        $this->actorRepository->editActor($data, $actor);
        Session::flash('message', 'Successfully edited actor!');
        return redirect()->route('actor.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $actor = Actor::find($id);
        $actor->delete();
        return Redirect::to('/admin/actor');
    }

    public function search(Request $request)
    {
        $search = $request->get('query');
        $actorsQuery = Actor::with('translate');

        if ($search) {
            $actorsQuery->whereHas('translate', function($query) use ($search) {
                return $query
                    ->where('firstName', 'like', "%$search%")
                    ->orWhere('lastName', 'like', "%$search%");
            });
        }

        return response()->json($actorsQuery->get());
    }

}

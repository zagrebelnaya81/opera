<?php

namespace App\Http\Controllers\Admin;

use App\Models\Actor;
use App\Models\Performance;
use App\Models\Season;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Video;
use App\Models\VideoCategory;
use App\Repositories\VideoRepository;
use App\Http\Requests\StoreVideo;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class VideoController extends Controller
{
    use ImageManagerTrait;

    protected $videoRepository;

    public function __construct(VideoRepository $videoRepository)
    {
        $this->middleware('permission:video-list');
        $this->middleware('permission:video-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:video-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:video-delete', ['only' => ['destroy']]);

        $this->videoRepository = $videoRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->get('query');
        $videoQuery = Video::with('translate', 'category.translate', 'media');

        if ($request->id) {
            $videoQuery->where('id', $request->id);
        }

        if ($search) {
            $videoQuery->whereHas('translate', function($query) use ($search) {
                return $query
                    ->Where('title', 'like', "%$search%")
                    ->Where('category_id', '!=', null);
            });
        }

        $videos = $videoQuery->latest()->paginate();

        return view('admin.videos.index', compact('videos'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $videoCategories = VideoCategory::all();
        $videoCategories = array_multilanguage_formatter($videoCategories, 'id', 'title');
        $seasons = Season::latest()->get();
        $seasons = array_multilanguage_formatter($seasons, 'id', 'title');
        return view('admin.videos.create', compact('videoCategories', 'seasons'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreVideo|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVideo $request)
    {
        $data = $request->all();

        $video = $this->videoRepository->createVideos($data);

        $this->checkAndUploadImage($request, 'poster', 'posters', $video);

        Session::flash('message', 'Successfully created video!');
        return redirect()->route('videos.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!$video = Video::find($id)) {
            abort(404);
        }
        $videoCategories = VideoCategory::all();
        $videoCategories = array_multilanguage_formatter($videoCategories, 'id', 'title');
        $seasons = Season::latest()->get();
        $seasons = array_multilanguage_formatter($seasons, 'id', 'title');

        $selectedActors = $video->actors;
        $arr = [];
        foreach ($selectedActors as $actor) {
            $actors['id'] = $actor->id;
            $actors['fullName'] = $actor->translate->firstName . ' ' . $actor->translate->firstName;
            $arr[] = $actors;
        }
        $selectedActors = $arr;

        $selectedPerformances = $video->performances;
        $arr = [];
        foreach ($selectedPerformances as $performance) {
            $performances['id'] = $performance->id;
            $performances['title'] = $performance->translate->title;
            $arr[] = $performances;
        }
        $selectedPerformances = $arr;

        return view('admin.videos.edit', compact('videoCategories', 'video', 'selectedActors', 'selectedPerformances', 'seasons'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreVideo|Request $request
     * @param  int $id
     * @return Response
     */
    public function update(StoreVideo $request, $id)
    {
        if (!$video = Video::find($id)) {
            throw new NotFoundHttpException('Video not found');
        }
        $data = $request->all();

        $this->checkAndUploadImage($request, 'poster', 'posters', $video);

        $this->videoRepository->editVideo($data, $video);
        Session::flash('message', 'Successfully edited video!');
        return redirect()->route('videos.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $video = Video::find($id);
        $video->delete();
        return redirect()->route('videos.index');
    }

    public function search(Request $request)
    {
        $search = $request->get('query');
        $videoQuery = Video::with('translate');

        if ($search) {
            $videoQuery->whereHas('translate', function($query) use ($search) {
                return $query
                    ->where('title', 'like', "%$search%");
            });
        }

        return response()->json($videoQuery->get());
    }
}

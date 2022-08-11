<?php

namespace App\Http\Controllers\Admin;

use App\Models\Season;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\AlbumCategory;
use App\Repositories\AlbumRepository;
use App\Http\Requests\StoreAlbum;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AlbumController extends Controller
{
    use ImageManagerTrait;

    protected $albumRepository;

    public function __construct(AlbumRepository $albumRepository)
    {
        $this->middleware('permission:album-list');
        $this->middleware('permission:album-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:album-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:album-delete', ['only' => ['destroy']]);

        $this->albumRepository = $albumRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->get('query');
        $albumQuery = Album::with('translate');

        if ($request->id) {
            $albumQuery->where('id', $request->id);
        }

        if ($search) {
            $albumQuery->whereHas('translate', function($query) use ($search) {
                return $query
                    ->Where('title', 'like', "%$search%");
            });
        }

        $albums = $albumQuery->latest()->paginate();

        return view('admin.albums.index', compact('albums'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $albumCategories = AlbumCategory::all();
        $albumCategories = array_multilanguage_formatter($albumCategories, 'id', 'title');
        $seasons = Season::latest()->get();
        $seasons = array_multilanguage_formatter($seasons, 'id', 'title');
        return view('admin.albums.create', compact('albumCategories', 'seasons'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreAlbum|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAlbum $request)
    {
        $data = $request->all();
        $album = $this->albumRepository->createAlbums($data);

        $this->checkAndUploadImage($request, 'poster', 'posters', $album);
        $this->checkAndUploadGalleryImages($request, 'images', 'album-images', $album);

        Session::flash('message', 'Successfully created album!');
        return redirect()->route('albums.index');
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
        if (!$album = Album::find($id)) {
            abort(404);
        }
        $albumCategories = AlbumCategory::all();
        $albumCategories = array_multilanguage_formatter($albumCategories, 'id', 'title');
        $seasons = Season::latest()->get();
        $seasons = array_multilanguage_formatter($seasons, 'id', 'title');

        $selectedActors = $album->actors;
        $selectedActors = array_formatter($selectedActors, ['id' => 'id', 'fullName' => 'fullName']);

        $selectedPerformances = $album->performances;
        $selectedPerformances = array_formatter($selectedPerformances, ['id' => 'id', 'title' => 'title']);

        return view('admin.albums.edit', compact('albumCategories', 'album', 'seasons', 'selectedActors', 'selectedPerformances'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreAlbum|Request $request
     * @param  int $id
     * @return Response
     */
    public function update(StoreAlbum $request, $id)
    {
        if (!$album = Album::find($id)) {
            throw new NotFoundHttpException('Album not found');
        }
        $data = $request->all();

        $this->checkAndUploadImage($request, 'poster', 'posters', $album);
        $this->checkAndUpdateGalleryImages($request, 'uploadedImages', 'album-images', $album);
        $this->checkAndUploadGalleryImages($request, 'images', 'album-images', $album);

        $this->albumRepository->editAlbum($data, $album);
        Session::flash('message', 'Successfully edited album!');
        return redirect()->route('albums.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $album = Album::find($id);
        $album->delete();
        return redirect()->route('albums.index');
    }

    public function search(Request $request)
    {
        $search = $request->get('query');
        $albumQuery = Album::with('translate');

        if ($search) {
            $albumQuery->whereHas('translate', function($query) use ($search) {
                return $query
                    ->where('title', 'like', "%$search%");
            });
        }

        return response()->json($albumQuery->get());
    }
}

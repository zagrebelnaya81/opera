<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ArticleCategory;
use App\Repositories\ArticleRepository;
use App\Repositories\ImageRepository;
use App\Repositories\VideoRepository;
use App\Http\Requests\StoreArticle;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ArticleController extends Controller
{
    use ImageManagerTrait;

    protected $articleRepository;
    protected $imageRepository;
    protected $videoRepository;

    public function __construct(ArticleRepository $articleRepository, VideoRepository $videoRepository)
    {
        $this->middleware('permission:article-list');
        $this->middleware('permission:article-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:article-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:article-delete', ['only' => ['destroy']]);

        $this->articleRepository = $articleRepository;
        $this->videoRepository = $videoRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::with('category', 'translate', 'category.translate', 'media')->latest()->paginate();
        return view('admin.articles.index', compact('articles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $articleCategories = ArticleCategory::all();
        $articleCategories = array_multilanguage_formatter($articleCategories, 'id', 'title');
        return view('admin.articles.create', compact('articleCategories'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreArticle|Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreArticle $request)
    {
        $data = $request->all();

        if (isset($data['videos'])) {
            $data['videos'] = $this->videoRepository->saveVideos($data['videos']);
        }

        $article = $this->articleRepository->createArticles($data);

        $this->checkAndUploadImage($request, 'poster', 'posters', $article);
        $this->checkAndUploadGalleryImages($request, 'images', 'article-images', $article);

        Session::flash('message', 'Successfully created article!');
        return redirect()->route('articles.index');
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
        if (!$article = Article::find($id)) {
            abort(404);
        }
        $articleCategories = ArticleCategory::all();
        $articleCategories = array_multilanguage_formatter($articleCategories, 'id', 'title');

        $selectedActors = $article->actors;
        $arr = [];
        foreach ($selectedActors as $actor) {
            $actors['id'] = $actor->id;
            $actors['fullName'] = $actor->translate->firstName . ' ' . $actor->translate->firstName;
            $arr[] = $actors;
        }
        $selectedActors = $arr;

        $selectedPerformances = $article->performances;
        $arr = [];
        foreach ($selectedPerformances as $performance) {
            $performances['id'] = $performance->id;
            $performances['title'] = $performance->translate->title;
            $arr[] = $performances;
        }
        $selectedPerformances = $arr;

        return view('admin.articles.edit', compact('articleCategories', 'article', 'selectedActors', 'selectedPerformances'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param StoreArticle|Request $request
     * @param  int $id
     * @return Response
     */
    public function update(StoreArticle $request, $id)
    {
        if (!$article = Article::find($id)) {
            throw new NotFoundHttpException('Article not found');
        }
        $data = $request->all();

        $this->checkAndUploadImage($request, 'poster', 'posters', $article);
        $this->checkAndUpdateGalleryImages($request, 'uploadedImages', 'article-images', $article);
        $this->checkAndUploadGalleryImages($request, 'images', 'article-images', $article);

        $article->videos()->delete();
        $data['videos'] = isset($data['videos']) ? $this->videoRepository->saveVideos($data['videos']) : [];

        $this->articleRepository->editArticle($data, $article);
        Session::flash('message', 'Successfully edited article!');
        return redirect()->route('articles.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $article = Article::find($id);
        $article->delete();
        return redirect()->route('articles.index');
    }
}

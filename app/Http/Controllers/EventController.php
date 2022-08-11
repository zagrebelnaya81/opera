<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Support\Facades\DB;
use App\Models\Menu;
use App\Models\PerformanceActor;
use App\Models\PerformanceCalendar;
use App\Models\PerformanceCalendarActor;
use App\Models\PerformanceType;
use App\Models\Season;
use App\Models\ActorRole;
use App\Repositories\HomePageRepository;
use Illuminate\Support\Facades\App;
use SEO;
use App\Models\Performance;
use Illuminate\Http\Request;

class EventController extends Controller
{
    protected $homePageRepository;

    public function __construct(HomePageRepository $homePageRepository)
    {
        $this->homePageRepository = $homePageRepository;
    }

    public function index()
    {
        $categoryId = \Input::get('category_id');
        $currentCategory = null;
        $currentSeason = null;
        $seasonId = \Input::get('season_id');

        $events = Performance::with('translate', 'type', 'type.translate', 'media')
            ->select('pt.title', 'performances.id', 'performances.created_at')
            ->join('performance_translations as pt', 'performances.id', '=', 'pt.performance_id')
            ->groupBy('performances.id')
            ->where('pt.language', '=', App::getLocale())
            ->whereNotNull('pt.title')
            ->orderBy('pt.title');

        if ($categoryId) {
            $events = $events->where(['type_id' => $categoryId]);
            $currentCategory = PerformanceType::find($categoryId);
        }
        if ($seasonId) {
            $events = $events->where(['season_id' => $seasonId]);
            $currentSeason = Season::find($seasonId);
        }
        $events = $events->paginate();

        $categories = PerformanceType::with('translate')->get();
        $seasons = Season::with('translate')->get();

        SEO::setTitle(($currentCategory) ? $currentCategory->translate->title : 'Repertoire');
        SEO::setDescription(($currentCategory) ? $currentCategory->translate->seo_description : 'This is repertoire page description');

        return view('pages.theatre.pages.repertoire',
            compact('events',
                'categories', 'currentCategory',
                'seasons', 'currentSeason'));
    }

    public function show($id, $slug)
    {
        if ( ! $performance = Performance::with(
            'translate',
            'type',
            'type.translate',
            'dates',
            'images',
            'videos',
            'articles',
            'articles.media',
            'articles.translate'
        )->whereIsPublished(true)->find($id)) {
            abort(404);
        }

        if ($performance->translate->slug !== $slug) {
            return redirect()->route('front.events.show', ['id' => $id, 'slug' => $performance->translate->slug]);
        }
        $dateIds = $performance->dates->pluck('id');
    
        // $dateActors = PerformanceActor::with([
        //     'date',
        //     'actor',
        //     'actor.translate',
        //     'actor.media',
        // ])->whereIn('performance_calendar_id', $dateIds)->get();
        // $groupActorDates = $dateActors->groupBy('actor_id');
       
     
        $performance_ids = DB::table('performance_calendars')->where('performance_id', '=', $id)->get();
        $Ids = $performance_ids->pluck('id');

         //actors for perfomense
        $today =  date("Y-m-d");   
 
        $ActorsId = DB::table('performance_calendar_actors')->select("actor_id", "actor_role_id", "date")->whereIn('performance_calendar_id', $Ids)->whereNull('date')->get();

        // $ActorsIdDate = DB::table('performance_calendar_actors')->select("actor_id", "actor_role_id", "date")->whereIn('performance_calendar_id', $Ids)->where('date', $today)->get();



        $ActorsId= json_decode( json_encode($ActorsId), true);
        // $ActorsIdDate= json_decode( json_encode($ActorsIdDate), true);

        // foreach ($ActorsIdDate as $item) {
        //    array_push($ActorsId, $item);
        // }



        $arrayId =[];
        

        // $buffer = array_count_values(array_column($ActorsId, 'actor_role_id'));
        // $buffer = array_filter($buffer, function($i){ return $i > 1; });
        // $ArrayWithoutDubl = [];
        // $ArrayWithDubl = [];
        

        
        // foreach ($ActorsId as $item) {
        //      array_key_exists($item['actor_role_id'], $buffer) ?: $ArrayWithoutDubl[] = $item;
        //     ! array_key_exists($item['actor_role_id'], $buffer) ?: $ArrayWithDubl[] = $item;
        // }
       
        // foreach ($ArrayWithoutDubl as $key => &$value) {
        //         array_push($arrayId, $value["actor_id"]);
        // }
      

        // foreach ($ArrayWithDubl as $key => &$value) {
        //     if($value["date"]!= NULL){
        //         array_push($arrayId, $value["actor_id"]);
        //     }
        // }
        
        // var_dump($arrayId);exit();
        foreach ($ActorsId as $key => &$value) {
            array_push($arrayId, $value["actor_id"]);
        }

      
        $arrayId = array_unique($arrayId);

     
        $Actors = PerformanceCalendarActor::with([
            'actor',
            'actor.translate',
            'actor.media',
            "role"
        ])
        ->join(
            'actor_role_translations as at',
            'performance_calendar_actors.actor_role_id', '=', 'at.actor_role_id'
        )->where('language', 'ua')->whereIn('actor_id', $arrayId)->get();


        $groupActorDates = $Actors->groupBy('actor_id');       

      
        $homePageComponents = $this->homePageRepository->getAllComponents();

        SEO::setTitle($performance->translate->seo_title);
        SEO::setDescription($performance->translate->seo_description);

        return view('pages.theatre.pages.event', compact(
            'performance',
            'groupActorDates',
            'homePageComponents'
        ));
    }

    public function synopsis($id, $slug)
    {
        if (!$performance = Performance::with('translate')->find($id)) {
            abort(404);
        }

        if ($performance->translate->slug !== $slug) {
            return redirect()->route('front.events.synopsis', ['id' => $id, 'slug' => $performance->translate->slug]);
        }

        SEO::setTitle($performance->translate->seo_title);
        SEO::setDescription($performance->translate->seo_description);

        return view('pages.theatre.pages.synopsis', compact('performance'));
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\PerformanceActor;
use App\Models\PerformanceCalendar;
use App\Repositories\HomePageRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\PerformanceCalendarActor;
use Jenssegers\Date\Date;
use SEO;

class EventDateController extends Controller
{

    protected $homePageRepository;

    public function __construct(HomePageRepository $homePageRepository)
    {
        $this->homePageRepository = $homePageRepository;
    }

    /**
     * @param PerformanceCalendar $performanceCalendar
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function show(PerformanceCalendar $performanceCalendar)
    {
        $performance = $performanceCalendar
            ->performance()
            ->whereIsPublished(true)
            ->with(
                'translate',
                'type',
                'type.translate',
                'dates',
                'videos',
                'articles',
                'articles.media',
                'articles.translate'
            )->first();

        $performance->dateForPrim =  Date::parse($performanceCalendar->date)->format('j F Y');;   
        
        // $dateIds = $performance->dates->pluck('id');
     
        // $dateActors = PerformanceActor::with([
        //     'date',
        //     'actor',
        //     'actor.translate',
        //     'actor.media',
        // ])->whereIn('performance_calendar_id', $dateIds)->get();




        $performance_ids = DB::table('performance_calendars')->where('performance_id', '=', $performance->id)->get();
        $Ids = $performance_ids->pluck('id');

         //actors for perfomense
        $date=date_create($performanceCalendar->date);
        $today = date_format($date,"Y-m-d");//date("Y-m-d");   
 
 
        $ActorsIdDate = DB::table('performance_calendar_actors')->select("actor_id", "actor_role_id", "date")->whereIn('performance_calendar_id', $Ids)->where('date', $today)->get();

        $ActorsIdDate= json_decode( json_encode($ActorsIdDate), true);

    


        $arrayId =[];
        

        $buffer = array_count_values(array_column($ActorsIdDate, 'actor_role_id'));
        $buffer = array_filter($buffer, function($i){ return $i > 1; });
        $ArrayWithoutDubl = [];
        $ArrayWithDubl = [];
        

        
        foreach ($ActorsIdDate as $item) {
             array_key_exists($item['actor_role_id'], $buffer) ?: $ArrayWithoutDubl[] = $item;
            ! array_key_exists($item['actor_role_id'], $buffer) ?: $ArrayWithDubl[] = $item;
        }
        if(!empty($ArrayWithoutDubl)){
            foreach ($ArrayWithoutDubl as $key => &$value) {
                    array_push($arrayId, $value["actor_id"]);
            }
        }
      
        if(!empty($ArrayWithDubl)){
        $ArrayWithDublLast =  array_values(array_slice(($ArrayWithDubl), -1))[0];  

        array_push($arrayId, $ArrayWithDublLast["actor_id"]); 
        }
        
        if(empty($ArrayWithDubl) && empty($ArrayWithoutDubl)){
            foreach ($ActorsIdDate as $key => &$value) {
                array_push($arrayId, $value["actor_id"]);
            }
        }

        //если у нас не указан актер из ивента, мі віводим актера с базового собітия
         
         $ActorsId = DB::table('performance_calendar_actors')->select("actor_id", "actor_role_id", "date")->whereIn('performance_calendar_id', $Ids)->whereNull('date')->get();
         $ActorsId= json_decode( json_encode($ActorsId), true);

         foreach ($ActorsId as $item) {
              array_push($ActorsIdDate, $item);
         }

         $buffer = array_count_values(array_column($ActorsIdDate, 'actor_role_id'));
         $buffer = array_filter($buffer, function($i){ return $i > 1; });
         $ArrayWithoutDubl = [];
         $ArrayWithDubl = [];
         
 
         
         foreach ($ActorsIdDate as $item) {
              array_key_exists($item['actor_role_id'], $buffer) ?: $ArrayWithoutDubl[] = $item;
             ! array_key_exists($item['actor_role_id'], $buffer) ?: $ArrayWithDubl[] = $item;
         }
         if(!empty($ArrayWithoutDubl)){
             foreach ($ArrayWithoutDubl as $key => &$value) {
                     array_push($arrayId, $value["actor_id"]);
             }
         }
         //
 
        // var_dump($arrayId);exit();
      
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


        // $groupActorDates = $dateActors->groupBy('actor_id');

        $homePageComponents = $this->homePageRepository->getAllComponents();

        SEO::setTitle($performance->translate->seo_title);
        SEO::setDescription($performance->translate->seo_description);

        return view('pages.theatre.pages.event-date', compact(
            'performance',
            'performanceCalendar',
            'groupActorDates',
            //'actors',
            'homePageComponents'
        ));
    }
}

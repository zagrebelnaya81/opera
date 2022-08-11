<?php

namespace App\Http\Controllers;

use App\Models\PerformanceCalendar;
use App\Models\Hall;
use App\Models\PerformanceType;
use App\Repositories\PerformanceCalendarRepository;
use Carbon\Carbon;

use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $performanceTypes = PerformanceType::with('translate')->get();
        $halls = Hall::with('translate')->orderBy('sort_order')->get();

        $calendar = PerformanceCalendar::whereDate('date', '>=', Carbon::today())->orderBy('date')->pluck('date')->groupBy(function ($dates) {
            return Carbon::parse($dates)->format('n,Y');
        });

        $dates = [];
        foreach ($calendar as $date => $event) {
            $arr = explode(',', $date);
            $dates[$arr[0]] = $arr[1];
        }
        return view('pages.theatre.pages.calendar', compact('dates', 'performanceTypes', 'halls'));
    }
}

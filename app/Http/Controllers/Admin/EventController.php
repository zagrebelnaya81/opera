<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StoreEvent;
use App\Models\Performance;
use App\Models\PerformanceCalendar;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EventController extends Controller
{

    use ImageManagerTrait;

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Performance $performance)
    {

        return view('admin.events.create', compact('performance'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEvent $request, Performance $performance)
    {

        $event = new PerformanceCalendar($request->validated());
        $event->performance()->associate($performance);
        $event->save();

        $this->checkAndUploadImage($request, 'poster', 'posters', $event);
        $this->checkAndUploadImage($request, 'poster_2', 'posters_2', $event);

        $event->actors()->createMany($request->validated()['actors']);

        return response()->json($event->load(['actors', 'media']));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Performance $performance, $eventId)
    {

        if (!$event = PerformanceCalendar::find($eventId)) {
            throw new NotFoundHttpException('Event not found');
        }

        $event = $event->load(['actors', 'media']);

        return view('admin.events.edit', [
            'performance' => $performance,
            'event' => $event,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreEvent $request, Performance $performance, $eventId)
    {

        if (!$event = PerformanceCalendar::find($eventId)) {
            throw new NotFoundHttpException('Event not found');
        }

        $event->fill($request->validated());
        $event->save();

        $this->checkAndUploadImage($request, 'poster', 'posters', $event);
        $this->checkAndUploadImage($request, 'poster_2', 'posters_2', $event);

        $event->actors()->delete();
        $event->actors()->createMany($request->validated()['actors']);

        return response()->json($event->load(['actors', 'media']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

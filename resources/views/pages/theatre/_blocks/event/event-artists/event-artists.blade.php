

<section name="artists" class="event-artists" data-event-parent>
    <h2 class="event-artists__title">{{ __('event.characters&actors') }}</h2>
    <!-- <section class="filter-event">
        @include('pages.theatre._blocks.filter.filter-event')
    </section> -->
    <div class="row event-artists__list">
        @foreach($groupActorDates as $actorDates)
            @set($actorDatesList, [])
            @foreach ($actorDates as $actorDate)
                @set($actorDatesList[], $actorDate)
            @endforeach
            <div class="col-sm-4 event-artists__item d-flex align-items-stretch"
                 data-date="{{ implode(',', $actorDatesList) }}"
                 data-event-artist>
                @include('pages.theatre._blocks.event.event-artist-calendar.event-artist-calendar', ['actorDate' => $actorDates->first(), 'actorDates' => $actorDates])
            </div>
        @endforeach
    </div>
</section>
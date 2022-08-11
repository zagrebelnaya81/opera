@extends('layouts.theatre')
@section('content')
    <section data-event>
        @include('pages.theatre._blocks.promo-info.event-date', [
            'item' => $performance,
            'calendar' => $performanceCalendar
        ])
        <div class="wrap container-fluid">

            @include('pages.theatre._blocks.tabs.tabs-event')
            @include('pages.theatre._blocks.description-cards.description-cards-event-date', [
              'type' => 'performances',
              'item' => $performanceCalendar,
              'share' => true,
              'title' => __('event.about_event'),
              'date' => false
            ])

            @includeWhen(count($groupActorDates), 'pages.theatre._blocks.event.event-artists.event-artists', ['groupActorDates' => $groupActorDates])

            @if($performance->translate->directors != '' || $performance->translate->directors != '')
                <div name="directors">
                    @include('pages.theatre._blocks.description-cards.description-cards-directors')
                </div>
            @endif

            @includeWhen(count($performance->albums) || count($performance->videos), 'pages.theatre._blocks.media.media', [
              'album' => $performance->albums()->latest()->first(),
              'videos' => $performance->videos,
              'title' => $performance->translate->title
            ])
            @includeWhen(count($performance->articles), 'pages.theatre._blocks.articles.articles', [
              'type' => 'articles',
              'articles' => $performance->articles,
              'title' => __('event.articles&news'),
              'route' => 'front.articles.release',
              'more' => true,
              'routeMore' => 'front.articles.about'
            ])
            @isset($homePageComponents[\App\Models\HomePage::RECOMMENDED_TYPE])
                @include('pages.theatre._blocks.recommend.recommend',
                  ['performanceDates' => $homePageComponents[\App\Models\HomePage::RECOMMENDED_TYPE]]
                )
            @endisset
        </div>
        @include('pages.theatre._blocks.subscribe.subscribe')
        @include('pages.theatre._blocks.popup.booking-popup', ['event' => $performanceCalendar])
    </section>
@endsection

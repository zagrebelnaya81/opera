@extends('layouts.theatre')

@section('content')
    <div class="wrap-full">
        @include('pages.theatre._blocks.promo-low.promo-low')
    </div>
    <div class="wrap container-fluid">
        @include('pages.theatre._blocks.artist.artist')

        @includeWhen(count($actor->calendars), 'pages.theatre._blocks.articles.articles', [
          'title' => __('actor.in_this_season'),
          'type' => 'performances',
          'route' => $performanceRoute
        ])

        @includeWhen(count($actor->albums) || count($actor->videos), 'pages.theatre._blocks.media.media', [
          'album' => $actor->albums()->latest()->first(),
          'videos' => $actor->videos,
          'title' => $actor->fullname()
        ])
        @includeWhen(count($actor->articles), 'pages.theatre._blocks.articles.articles', [
          'type' => 'articles',
          'articles' => $actor->articles,
          'route' => $articleRoute,
          'title' => __('actor.articles_and_press_releases'),
        ])
        @if($showContacts)
            @include('pages.theatre._blocks.contact-us.contact-us', [
              'title' => __('contact.do_you_want_to_invite_an_artist_contact_us'),
              'titleMobile' => __('contact.do_you_want_to_invite_an_artist_contact_us'),
              'buttonTitle' => __('contact.contacts'),
            ])
        @endif

    </div>
    @include('pages.theatre._blocks.subscribe.subscribe')
    @include('pages.theatre._blocks.popup.popup')
@endsection

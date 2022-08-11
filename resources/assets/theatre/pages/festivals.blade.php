@extends('layouts.theatre')

@section('content')
  <div class="wrap-full">
    @include('pages.theatre._blocks.promo-low.promo-low')
  </div>
  <div class="wrap container-fluid">
    <h1 class="page-title page-title--small">{{ $page->translate->title }}</h1>
    @include('pages.theatre._blocks.description-text.description-text', ['description' => $page->translate->descriptions])
    @include('pages.theatre._blocks.description-cards.description-cards-festivals', [
      'route' => 'front.festivals.show',
      'projects' => $festivals,
    ])
    @include('pages.theatre._blocks.articles.articles', [
      'title' => __('home.articles&news'),
      'route' => 'front.articles.article',
      'type' => 'articles', 'articles' => $articles
    ])

    @include('pages.theatre._blocks.gallery.events-gallery')

  </div>
  @include('pages.theatre._blocks.subscribe.subscribe')
@endsection


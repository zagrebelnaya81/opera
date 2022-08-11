@extends('layouts.theatre')

@section('content')
  <div class="wrap-full">
    @include('pages.theatre._blocks.promo-low.promo-low')
  </div>
  <div class="wrap container-fluid">
    <h1 class="page-title page-title--small">{{ $page->translate->title }}</h1>
      @include('pages.theatre._blocks.description-cards.description-cards-item', [
      'hasTitle' => false,
      'item' => $page,
      'items' => $page->blocks
      ])
  </div>
  @include('pages.theatre._blocks.subscribe.subscribe')
@endsection

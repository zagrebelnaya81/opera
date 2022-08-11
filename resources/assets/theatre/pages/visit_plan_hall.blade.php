@extends('layouts.theatre')

@section('content')
  <div class="wrap-full">
    @include('pages.theatre._blocks.promo-low.promo-low')
  </div>
  <div class="wrap container-fluid">
    <h1 class="page-title page-title--small">{{ __('pages.plans_of_hall') }}</h1>
    @include('pages.theatre._blocks.tabs.tabs-visit-plans')
    @include('pages.theatre._blocks.description-cards.description-cards-plan',['description' => $hall->translate->description,
    $hall->translate->title,
    'imageUrl' => $hall->getFirstMediaUrl('posters','thumb')])
      <section class="visit-img">
      <!-- Размер картинки указан 812x410 -->
      <img src="{{ $hall->getFirstMediaUrl('posters') }}" alt="{{ $hall->translate->title }}">
    </section>
    @include('pages.theatre._blocks.gallery.gallery')
    <div class="description-text-title__wraper" data-texttoggle-toggled style="text-align: center; margin-bottom:5%;">
        <a href="{{ $hall->translate('en')->first()->file_description }}" target="_blank">{{ __('popup.click_here') }}</a>
    </div>
  </div>
  @include('pages.theatre._blocks.subscribe.subscribe')
@endsection

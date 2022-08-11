@extends('layouts.theatre')

@section('content')
  <div class="wrap-full">
    @include('pages.theatre._blocks.promo-low.promo-low')
  </div>
  <div class="wrap container-fluid">

    {{-- @include('pages.theatre._blocks.breadcrumbs.breadcrumbs') --}}

    <h1 class="page-title page-title--small">{{ __('pages.opera_command') }}</h1>
    @include('pages.theatre._blocks.tabs.tabs', ['items' => $groups])
    @include('pages.theatre._blocks.description-cards.description-cards-team', [
      'hasTitle' => true,
      'hasMerit' => true,
      'title' => $currentGroup->translate->title,
      'actor' => $currentGroup->main_actors()->first()
    ])

    @include('pages.theatre._blocks.team.team-members.team-members', [
      'has_title' => false,
      'actors' => $currentGroup->other_actors,
      'has_merit' => true
    ])
  </div>
  @include('pages.theatre._blocks.subscribe.subscribe')
@endsection

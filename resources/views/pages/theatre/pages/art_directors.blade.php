@extends('layouts.theatre')

@section('content')
  <div class="wrap-full">
    @include('pages.theatre._blocks.promo-low.promo-low')
  </div>
  <div class="wrap container-fluid">

    {{-- @include('pages.theatre._blocks.breadcrumbs.breadcrumbs') --}}

    <h1 class="page-title page-title--small">{{ __('pages.opera_command') }}</h1>
    @include('pages.theatre._blocks.tabs.tabs', ['items' => $groups])
      @if($childrenGroups)
          <section class="tabs tabs--second">
              <div class="tabs__wrap">
                  @foreach($childrenGroups as $item)
                      <a href="{{ route('front.team.' . $parentGroup->name, $item->name) }}"
                         class="tabs__link {{ Request::is('team/' . $parentGroup->name . '/' . $item->name) ? 'active' : '' }}">
                          {{ $item->translate->title }}
                      </a>
                  @endforeach
              </div>
          </section>
      @endif
    @include('pages.theatre._blocks.description-cards.description-cards-team', [
      'hasTitle' => false,
      'hasMerit' => false,
      'actor' => $currentGroup->main_actors()->first()
    ])
    @include('pages.theatre._blocks.team.team-members-vertical.team-members-vertical', [
      'has_title' => true,
      'title' => $currentGroup->translate->title,
      'actors' => $currentGroup->other_actors,
      'has_merit' => true,
      'actorsTroupe' => true
    ])
  </div>
  @include('pages.theatre._blocks.subscribe.subscribe')
@endsection

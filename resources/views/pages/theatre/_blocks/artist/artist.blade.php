<section class="artist">
  <h1 class="visually-hidden">{{$actor->translate->firstName}} {{$actor->translate->lastName}}</h1>

  @include('pages.theatre._blocks.description-cards.description-cards-team', [
  'hasTitle' => false,
  'hasMerit' => true,
  'hasDegree' => true,
  'actor' => $actor,
  'hideLink' => false
  ])

    <div class="artist__info">
      <div class="row" data-texttoggle-container>
        <div class="col-sm-12 col-md-6  col-xl-4">
          @if($actor->translate->hometown)
            <h3 class="artist__info-title">{{ __('actor.hometown') }}</h3>
          @endif
          <ul class="artist__info-list">
            <li>{{$actor->translate->hometown}}</li>
          </ul>
          @if($actor->translate->debut)
            <h3 class="artist__info-title">{{ __('actor.debut') }}</h3>
          @endif
          <ul class="artist__info-list">
            <li>{{$actor->translate->debut}}</li>
          </ul>
        </div>

        <div class="col-sm-12 col-md-6 col-xl-4">
          @if($actor->translate->repertoire)
            <h3 class="artist__info-title">{{ __('actor.repertoire') }}</h3>
          @endif
          <ul class="artist__info-list artist__info-list--mob-nm" data-texttoggle-parent>
            <li data-texttoggle-toggled>
              {!! $actor->translate->repertoire !!}
              @include('pages.theatre._blocks.btn-toggle.btn-toggle')
            </li>
          </ul>
        </div>
        <div style="height: 131px;" data-texttoggle-model></div>
        <div class="col-sm-12 col-md-6 col-xl-4">
          @if($actor->translate->merit)
            <h3 class="artist__info-title">{{ __('actor.merit') }}</h3>
          @endif
          <ul class="artist__info-list">
            <li>{!! $actor->translate->merit !!}</li>
          </ul>
        </div>
      </div>
    </div>
</section>

@if(isset($items))
  <section class="tabs tabs--second">
    <div class="tabs__wrap">
      @foreach($items as $item)
          @if(in_array($item->name, ['artistspart-artists', 'artistspart-product', 'artistspart-operation'], true))
            <a href="{{ route('front.team.artistspart.' . $item->name) }}" class="tabs__link {{ Route::currentRouteName() === 'front.team.artistspart.' . $item->name ? 'active' : '' }}">{{ $item->translate->title }}</a>
          @else 
            <a href="{{ route('front.team.troupe.' . $item->name) }}" class="tabs__link {{ Route::currentRouteName() === 'front.team.troupe.' . $item->name ? 'active' : '' }}">{{ $item->translate->title }}</a>
          @endif
      @endforeach
    </div>
  </section>
@endif

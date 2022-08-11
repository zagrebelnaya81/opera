<section class="promo-info">
    <h1 class="visually-hidden">{{ $item->translate->title }}</h1>
    @include('pages.theatre._blocks.promo-top.promo-top')
    <div class="wrap container-fluid">
        <div class="row promo-info__container">
            <div class="col col-xl-8 col-md-6 col-sm-12 promo-info__poster">
                <p class="promo-info__author">{!! $item->translate->author !!}</p>
                <p class="promo-info__name" data-event-name>{{ $item->translate->title }}</p>
                <p class="promo-info__type">{{ $item->type->translate->title }}</p>
                <p class="promo-info__premiere">{{ $item->premier() }}</p>
                <p class="promo-info__descr">
                    <span>{{ $item->hall->translate->title }}</span>
                    <span>{{ __('event.duration') }} {{ $item->duration }} {{ __('event.hours') }}</span>
                </p>
            </div>
            <div class="col col-xl-4 col-md-6 col-sm-12 promo-info__amount">
                <p class="promo-info__amount-date">{{ $item->period() }}</p>
                <p class="promo-info__amount-number">{{ $item->count() }} 

                @if($item->count() == 1)
                    {{ __('event.performances-one') }}
                @elseif($item->count() > 1 && $item->count() < 5)
                    {{ __('event.performances') }}
                @elseif($item->count() >=5)
                    {{ __('event.performances-many') }}
                @endif
            </p>
                @forelse($item->dates()->where('isSoldOnline', true)->get() as $date)
                    @if($date->tickets->where('isAvailable', true)->count())
                        <a class="btn-buy btn-buy--big" href="{{ url('ticket/perfomance/' . $date->id) }}"
                           data-event-btn>{{ __('event.buy_ticket') }}</a>
                        @break
                    @endif
                    @if($loop->last)
                        {{ __('event.tickets_sold') }}
                    @endif
                @empty
                    {{ __('event.sold_online_closed') }}
                @endforelse
            </div>
        </div>

    </div>
    <figure class="promo-info__img">
        <img src="{{ $item->getFirstMediaUrl('posters','slider-new') }}"
             alt="{{ $item->translate->title }}"
             data-mobile-url="{{ $item->getFirstMediaUrl('posters', 'special') }}">
    </figure>
</section>

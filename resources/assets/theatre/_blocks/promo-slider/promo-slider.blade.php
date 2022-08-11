<div class="promo-slider">
    <div data-promo-slider class="promo-slider__inner">
        @foreach($slides as $slide)
            <div class="promo-slider__slide">
                <figure class="promo-slider__img">
                    <img src="{{ $slide->getFirstMediaUrl('posters', 'slider') }}"
                         alt="{{ $slide->translate->title }}"
                         data-promo-mobile-url="{{ $slide->getFirstMediaUrl('posters', 'slider-mobile') }}">
                </figure>
                <div class="promo-slider__about">
                    <h3 class="promo-slider__title">{{ $slide->translate->title }}</h3>
{{--                    @if ($performanceDate->date > \Carbon\Carbon::now())--}}
{{--                        <time datetime="{{ (new DateTime($performanceDate->date))->format('Y-m-d H:i') }}"--}}
{{--                              class="promo-slider__datetime">--}}
{{--                            <span class="promo-slider__date">{{ (Date::parse($performanceDate->date))->format('j F') }}</span>--}}
{{--                            <span class="promo-slider__time">{{ $performanceDate->getFormatTime() }}</span>--}}
{{--                        </time>--}}
{{--                    @endif--}}
{{--                    <div class="promo-slider__descr">--}}
{{--                        {!! $performanceDate->shortTagline(100) !!}--}}
{{--                    </div>--}}
                    <div class="promo-slider__links">
                      <a href="{{ url($slide->page_url) }}"
                         class="promo-slider__more">{{ __('home.more') }}</a>
{{--                        <a href="{{ route('front.events.show', ['id' => $performanceDate->performance->id, 'slug' => $performanceDate->performance->translate->slug]) }}"--}}
{{--                           class="promo-slider__more">{{ __('home.more') }}</a>--}}
{{--                        @if ($performanceDate->date > \Carbon\Carbon::now())--}}
{{--                            <a href="{{ ('/ticket/perfomance/'.$performanceDate->id) }}"--}}
{{--                               class="btn-buy btn-buy--big">{{ __('home.buy_ticket') }}</a>--}}
{{--                        @endif--}}
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    <button type="button" class="promo-slider__btn promo-slider__btn--prev" data-promo-slider-btn-prev>
        <svg width="30" height="30" fill="#fff">
            <use xlink:href="#icon-arrow-left-long" />
        </svg>
    </button>
    <button type="button" class="promo-slider__btn promo-slider__btn--next" data-promo-slider-btn-next>
        <svg width="30" height="30" fill="#fff">
            <use xlink:href="#icon-arrow-right-long" />
        </svg>
    </button>
</div>
<a href="#about" class="promo-slider__arrow" data-scroll-arr>Следующий экран
    <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 404.257 404.257" width="65px" height="65px"
         fill="#FFFFFF">
        <polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/>
    </svg>
</a>

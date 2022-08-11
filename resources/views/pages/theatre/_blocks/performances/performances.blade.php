<section class="performances container-fluid" data-performances>
    <div class="d-flex align-items-stretch">
        @foreach($performanceDates as $performanceDate)
            <div class="col col-sm-6 col-xl-3">
                <article class="performances__item" data-performances-item>
                    <div class="performances__info" data-performances-hover>
                        <h3 class="performances__title">{{ $performanceDate->performance->translate->title }}</h3>
                        @if ($performanceDate->date > \Carbon\Carbon::now())
                            <time class="performances__datetime"
                                  datetime="{{ \Carbon\Carbon::parse($performanceDate->date)->format('Y-m-d'.'\T'.'h:i:s') }}">
                                <span class="performances__date">{{ Date::parse($performanceDate->date)->format('d F') }}</span>
                                <span class="performances__time">{{ $performanceDate->getFormatTime() }}</span>
                            </time>
                        @endif
                    </div>
                    <figure class="performances__item-img">
                        <img src="{{ $performanceDate->performance->getFirstMediaUrl('posters', 'preview') }}"
                             alt="{{ $performanceDate->performance->translate->title }}">
                    </figure>
                    <a href="{{ route('front.events.show', ['id' => $performanceDate->performance->id, 'slug' => $performanceDate->performance->translate->slug]) }}"
                       class="performances__link">{{ __('home.more') }}</a>
                    @if ($performanceDate->date > \Carbon\Carbon::now())
                        <a href="{{ ('/ticket/perfomance/' . $performanceDate->id) }}"
                           class="btn-buy performances__btn">{{ __('home.buy_ticket') }}</a>
                    @endif
                </article>
            </div>
        @endforeach
        <div class="col col-sm-6 col-xl-3 performances__calendar">
            @include('pages.theatre._blocks.calendar-btn.calendar-btn')
        </div>
    </div>
</section>

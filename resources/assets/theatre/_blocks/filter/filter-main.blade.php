<section class="filter" data-filter>
  <h3 class="visually-hidden">{{ __('calendar.filter') }}</h3>
  <ul class="filter__list row">
    <li class="filter__item col-sm-6 col-xl-3" data-filter-item="event">
      <button class="filter__name" type="button" data-filter-name>
        <span>{{ __('calendar.event') }}</span>
        <svg width="15" height="15" fill="#333">
          <use xlink:href="#icon-arrow-bottom" />
        </svg>
      </button>
      <ul class="filter__item-list" data-filter-list>
        <li><a href="{{ route('front.calendar.index') }}" data-active="true">{{ __('calendar.event') }}</a></li>
        <li><a href="{{ route('front.calendar.index', ['event' => 'opera']) }}#/calendar?event=opera">{{ __('calendar.opera') }}</a></li>
        <li><a href="{{ route('front.calendar.index', ['event' => 'ballet']) }}#/calendar?event=ballet">{{ __('calendar.ballet') }}</a></li>
        <li><a href="{{ route('front.calendar.index', ['event' => 'concert']) }}#/calendar?event=concert">{{ __('calendar.concert') }}</a></li>
        <li><a href="{{ route('front.calendar.index', ['event' => 'children']) }}#/calendar?event=children">{{ __('calendar.children_play') }}</a></li>
        <li><a href="{{ route('front.calendar.index', ['event' => 'tour']) }}#/calendar?event=tour">{{ __('calendar.touring_on_stage') }}</a></li>
        <li><a href="{{ route('front.calendar.index', ['event' => 'festival']) }}#/calendar?event=festival">{{ __('calendar.festival_event') }}</a></li>
        <li><a href="{{ route('front.calendar.index', ['event' => 'muzhab']) }}#/calendar?event=muzhab">{{ __('calendar.youth_musical_hub') }}</a></li>
      </ul>
    </li>
    <li class="filter__item col-sm-6 col-xl-3" data-filter-item="daterange">
      <button class="filter__name" type="button" data-filter-name>
        <span>{{ __('calendar.date') }}</span>
        <svg width="15" height="15" fill="#333">
          <use xlink:href="#icon-arrow-bottom" />
        </svg>
      </button>
      <div class="filter__item-list filter__item-list--daterange" data-filter-list>
        <div data-datepicker></div>
        <a href="#" class="btn-more" data-datepicker-apply>{{ __('calendar.select') }}</a>
      </div>
    </li>
    <li class="filter__item col-sm-6 col-xl-3" data-filter-item="time">
      <button class="filter__name" type="button" data-filter-name>
        <span>{{ __('calendar.time') }}</span>
        <svg width="15" height="15" fill="#333">
          <use xlink:href="#icon-arrow-bottom" />
        </svg>
      </button>
      <ul class="filter__item-list" data-filter-list>
        <li><a href="{{ route('front.calendar.index') }}">{{ __('calendar.time') }}</a></li>
        <li><a href="{{ route('front.calendar.index', ['time' => 'daytime']) }}#/calendar?time=daytime">{{ __('calendar.morning') }}</a></li>
        <li><a href="{{ route('front.calendar.index', ['time' => 'night']) }}#/calendar?time=night">{{ __('calendar.evening') }}</a></li>
      </ul>
    </li>
    <li class="filter__item col-sm-6 col-xl-3" data-filter-item="scene">
      <button class="filter__name" type="button" data-filter-name>
        <span>{{ __('calendar.scene') }}</span>
        <svg width="15" height="15" fill="#333">
          <use xlink:href="#icon-arrow-bottom" />
        </svg>
      </button>
      <ul class="filter__item-list" data-filter-list>
        <li><a href="{{ route('front.calendar.index') }}">{{ __('calendar.scene') }}</a></li>
          @foreach($halls as $item)
              <li><a href="calendar#/events?scene={{ $item->name }}">{{ $item->translate->title }}</a></li>
          @endforeach
      </ul>
    </li>
  </ul>
</section>

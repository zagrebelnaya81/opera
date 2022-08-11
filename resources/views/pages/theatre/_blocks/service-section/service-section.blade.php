<section class="service-section">
    <ul class="service-section__list">
        @foreach($services as $service)
            <li>
                <h3 class="service-section__title">{{ $service->translate->title }}</h3>
                <div class="service-section__descr">
                    <p>{!! $service->translate->description !!}</p>
                </div>
                @if($service->has_more_button)
                    <a href="#" class="btn-more-link">{{ __('home.more') }}</a>
                @else
                  <button type="button" class="btn-more btn-more--uppercase btn-more--small" data-popup-link="contact">{{ __('home.contact') }}</button>
                @endif
            </li>
        @endforeach
    </ul>
</section>

@if(isset($actor))
    <article class="team-card-vertical">
        <figure class="team-card-vertical__img">
            <img src="{{ $actor->getFirstMediaUrl('posters', 'mini') }}"
                 alt="{{ $actor->fullName() }}"
                 data-mobile-url="{{ $actor->getFirstMediaUrl('posters', 'mini_mob') }}">
        </figure>
        <div class="team-card-vertical__descr">
            <p class="team-card-vertical__name">{{ $actor->fullName() }}</p>
            @if($actor->translate->degree)
                <p class="description-cards__profession">
                    <span>{!! $actor->translate->degree !!}</span>
                </p>
            @endif
            @if($actor->translate->position)
                <p class="description-cards__profession">{{ $actor->translate->position }}</p>
            @endif
            @if(isset($moreBtn))

            @else
                <a href="{{ route('front.actors.show', ['id' => $actor->id, 'slug' => $actor->translate->slug]) }}" class="btn-more-link btn-more-link--fz12">{{ __('home.more') }}</a>
            @endif
        </div>
    </article>
@endif

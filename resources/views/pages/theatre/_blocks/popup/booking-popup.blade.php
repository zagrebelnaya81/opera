<section class="popup popup--contact" data-popup="booking-popup">
    <div class="popup__inner">
        <div class="popup__wrap">
            <button type="button" class="popup__close" data-popup-close>
                close
                <svg width="25" height="25" fill="#333333">
                    <use xlink:href="#icon-cross" />
                </svg>
            </button>
            <p class="popup__title">{{ __('event.ticket_booking_text') }}</p>
            <div class="text-center">
                @if($event->internet_bilet_link)
                    <a href="{{ $event->internet_bilet_link }}" style="overflow: hidden; display: block; text-align: center; margin-bottom: 10px">
                        <img src="/design/img/popup/booking-popup/internet-bilet.jpg">
                    </a>
                @endif
                @if($event->karabas_link)
                    <a href="{{ $event->karabas_link }}" style="overflow: hidden; display: block; text-align: center">
                        <img src="/design/img/popup/booking-popup/karabas.png">
                    </a>
                @endif
            </div>
        </div>
    </div>
</section>
@if(isset($item->translate->title))
  <section class="description-text-title {{ isset($item->attribute->name) ? 'description-text-title--' . $item->attribute->name : '' }}" data-texttoggle-container data-text>
      <h2 class="description-text-title__title">{{ $item->translate->title }}</h2>
      <div class="description-text-title__wraper" data-texttoggle-toggled style="text-align: center;">
        <a href="{!! $item->translate->descriptions !!}" target="_blank">{{ __('popup.click_here') }}</a>
        @include('pages.theatre._blocks.btn-toggle.btn-toggle')
      </div>
  </section>
@endif
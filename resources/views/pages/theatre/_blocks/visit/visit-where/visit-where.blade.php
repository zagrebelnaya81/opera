<section class="description-text-title">
  @set($itemsCount, count($items))
  @for($i = 0; $i < $itemsCount; $i++)
    <div class="description-text-title__wraper">
      <h2 class="visit-where__title">{{ $items[$i]->translate->title }}</h2>
      @if($items[$i]->attribute->name === 'description')
        <div class="visit-where__descr {{ $i === 1 ?: 'visit-where__descr--50'  }}">
          {!! $items[$i]->translate->descriptions !!}
        </div>
      @endif

      @if($items[$i]->attribute->name === 'map_coordinates')
      <iframe style="width:100%;" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2564.653034001406!2d36.23003561571512!3d49.99911417941562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a0e42543c04b%3A0x18df49477e66cd62!2z0KXQsNGA0YzQutC-0LLRgdC60LjQuSDQvdCw0YbQuNC-0L3QsNC70YzQvdGL0Lkg0LDQutCw0LTQtdC80LjRh9C10YHQutC40Lkg0YLQtdCw0YLRgCDQvtC_0LXRgNGLINC4INCx0LDQu9C10YLQsCDQuNC80LXQvdC4INCdLiDQki4g0JvRi9GB0LXQvdC60L4g0KXQndCQ0KLQntCR!5e0!3m2!1sru!2sua!4v1612374333807!5m2!1sru!2sua" width="1380" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
tabindex="0"></iframe>
      @endif
    </div>
  @endfor
</section>

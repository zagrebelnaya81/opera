<section class="description-text-title">
    
      @foreach($items as $item)
      <div class="description-text-title__wraper">
          <h2 class="visit-where__title" style="text-align: center;">{!! $item->translate->title !!}</h2>
          <div class="description-cards__descr">
            {!! $item->translate->descriptions !!}
          </div>
          </div>
      @endforeach
    
</section>

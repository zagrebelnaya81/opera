@set($i, 0)
@foreach($page->blocks as $block)
  @include('pages.theatre._blocks.description-text-title.description-text-title-jobs', ['item' => $block])
  @if($i === 0)
    {{--@include('pages.theatre._blocks.articles.articles-abonement', [--}}
    {{--'type' => 'articles',--}}
    {{--'articles' => $articles,--}}
    {{--'title' => __('event.articles&news'),--}}
    {{--'route' => 'front.articles.release'--}}
    {{--])--}}
  @endif
  @set($i, $i+1)
@endforeach

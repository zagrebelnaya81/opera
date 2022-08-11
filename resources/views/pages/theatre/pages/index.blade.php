@extends('layouts.theatre')

@section('content')
    <div class="wrap-full">
{{--        @includeWhen(!empty(($homePageComponents[\App\Models\HomePage::PROMO_SLIDER_TYPE])),--}}
{{--          'pages.theatre._blocks.promo-slider.promo-slider',--}}
{{--          ['performanceDates' => $homePageComponents[\App\Models\HomePage::PROMO_SLIDER_TYPE]]--}}
{{--        )--}}
        @includeWhen(!empty(($slides)),
          'pages.theatre._blocks.promo-slider.promo-slider',
          ['performanceDates' => $slides]
        )
        @include('pages.theatre._blocks.performances.performances',
          ['performanceDates' => $homePageComponents[\App\Models\HomePage::PROMO_SLIDER_MINI_TYPE]]
        )
    </div>

    <div class="wrap container-fluid">
        @include('pages.theatre._blocks.articles.articles-representation', ['performances' => $performances])

        @includeWhen(!empty(($homePageComponents[\App\Models\HomePage::RECOMMENDED_TYPE])),
          'pages.theatre._blocks.recommend.recommend',
          ['performanceDates' => $homePageComponents[\App\Models\HomePage::RECOMMENDED_TYPE]]
        )

        @include(
        'pages.theatre._blocks.articles.articles',
        ['type' => 'articles', 'route' => 'front.articles.release', 'title' => __('home.articles&news'), 'more' => true, 'routeMore' => 'front.articles.about'])

        @includeWhen(!empty($homePageComponents[\App\Models\HomePage::SPECIAL_PROJECTS_TYPE]),
          'pages.theatre._blocks.special-projects.special-projects',
          ['performanceDates' => $homePageComponents[\App\Models\HomePage::SPECIAL_PROJECTS_TYPE]]
        )
    </div>

    @include('pages.theatre._blocks.subscribe.subscribe')
@endsection

@extends('layouts.admin')

@section('content')
    <div class="df mb15">
        <h1 class="global__page-title">Редагування зображень для місць: "{{ $hall->translate->title }}"</h1>
        <div class="fsh">
            <a class="btn btn-primary" href="{{ url()->previous() }}">Повернутися назад</a>
        </div>
    </div>

    <div class="kasir" id="kasir-images" data-disabled>
        <div class="kasir__alert-wrap"></div>

        <div class="preloader"></div>

        <div class="kasir__scheme">
          <div class="kasir__scheme-svg">
            @include($hall->patternPath, ['type' => 'scheme'])
          </div>
          <div class="kasir__scheme-btns">
            <button class="btn btn-success" type="button" id="saveSeats">Зберегти</button>
            <div class="kasir__scheme-controls">
              <button class="btn btn-primary" type="button" id="zoom-in">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 52.966 52.966" fill="#fff">
                  <path d="M28.983,20h-6v-6c0-0.552-0.448-1-1-1s-1,0.448-1,1v6h-6c-0.552,0-1,0.448-1,1s0.448,1,1,1h6v6c0,0.552,0.448,1,1,1
                    s1-0.448,1-1v-6h6c0.552,0,1-0.448,1-1S29.535,20,28.983,20z"/>
                  <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
                    c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
                    C52.074,52.304,52.086,51.671,51.704,51.273z M2.983,21c0-10.477,8.523-19,19-19s19,8.523,19,19s-8.523,19-19,19
                    S2.983,31.477,2.983,21z"/>
                </svg>
              </button>
              <button class="btn btn-danger" type="button" id="zoom-reset">Збросити</button>
              <button class="btn btn-warning" type="button" id="zoom-out">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.966 52.966" width="20" height="20" fill="#fff">
                  <path d="M28.983,20h-14c-0.552,0-1,0.448-1,1s0.448,1,1,1h14c0.552,0,1-0.448,1-1S29.535,20,28.983,20z"/>
                  <path d="M51.704,51.273L36.845,35.82c3.79-3.801,6.138-9.041,6.138-14.82c0-11.58-9.42-21-21-21s-21,9.42-21,21s9.42,21,21,21
                    c5.083,0,9.748-1.817,13.384-4.832l14.895,15.491c0.196,0.205,0.458,0.307,0.721,0.307c0.25,0,0.499-0.093,0.693-0.279
                    C52.074,52.304,52.086,51.671,51.704,51.273z M2.983,21c0-10.477,8.523-19,19-19s19,8.523,19,19s-8.523,19-19,19
                    S2.983,31.477,2.983,21z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="kasir__prices">
          <div class="kasir__prices-image"></div>
        </div>
    </div>

    <div class="modal fade" tabindex="-1" role="dialog" data-img-preview>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title"></h4>
          </div>
          <div class="modal-body"></div>
        </div>
      </div>
    </div>

    @include('admin.message')

    {{--{{ Form::model($pricePattern, ['route' => array('hall-price-patterns.updateHallPriceZone', $hallPricePattern->id), 'method' => 'PUT']) }}--}}

    {{----}}
    {{----}}
    {{--{{ Form::submit('Зберегти', ['class' => 'btn btn-success']) }}--}}

    {{--{{ Form::close() }}--}}

@endsection

@section('styles')
    {!! Html::style('css/global.css') !!}
    {!! Html::style('css/kasir.css') !!}
@endsection

@section('scripts')
  <script>
    window.csrf_token = `{{csrf_token()}}`
  </script>
  {!! Html::script('js/plugins/svg-pan-zoom.js') !!}
  {!! Html::script('js/admin/kasir.js') !!}
@stop

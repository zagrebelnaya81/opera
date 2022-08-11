@extends('layouts.admin')

@section('content')
  <div data-distributors-tickets>
    <div class="df mb15">
        <h1 class="global__page-title">Редагування доступності місць події</h1>
        <div class="">
            <p><b>Назва події:</b> {{ $performanceCalendar->performance->translate->title }}</p>
            <p><b>Дата та час:</b> {{ $performanceCalendar->getFormatDateTime() }}</p>
            <p><b>Доступна кількість квитків:</b> <span data-total-tickets>{{ $performanceCalendar->tickets->count() }}</span></p>
            <p><b>Кількість квитків, що уже передана дистриб'юторам:</b> {{ $performanceCalendar->tickets()->where('distributor_id', '!=', null)->count() }}</p>
            <p><b>Кількість квитків, що не передані дистриб'юторам:</b> {{ $performanceCalendar->tickets->count() - $performanceCalendar->tickets()->where('distributor_id', '!=', null)->count() }}</p>
        </div>
        <div class="fsh">
            <a class="btn btn-primary" href="{{ url()->previous() }} }}">Повернутися назад</a>
        </div>
    </div>

    @include('admin.message')

    {{-- {{ Form::model($performanceCalendar, ['route' => array('performanceCalendar.updateDateTicketsSimple', $performanceCalendar->id), 'data-distributors-form', 'method' => 'PUT']) }}
    <div class="row">
        @foreach($distributors as $distributor)
            <div class="col-md-6 form-group">
                {{ Form::label('tickets_count_' . $distributor->id, $distributor->title) }}
                {{ Form::number('tickets_count_' . $distributor->id, $performanceCalendar->tickets()->where('distributor_id', $distributor->id)->count(), ['class' => 'form-control', 'data-distributor-input', 'max' => $performanceCalendar->tickets->count()]) }}
            </div>
        @endforeach
    </div>
    {{ Form::submit('Зберегти', ['class' => 'btn btn-success']) }}
    {{ Form::close() }} --}}

    <div class="kasir kasir--prosto-neba" id="kasir-prosto-neba" data-disabled>
        <div class="kasir__alert-wrap"></div>
        <div class="preloader"></div>

        <div class="kasir__scheme">
            <div class="kasir__prices">
                <h2 class="kasir__prices-title"></h2>
                <ul class="kasir__prices-list"></ul>
            </div>
            <div class="kasir__scheme-btns">
                <button class="btn btn-success" type="button" id="saveSeats">Зберегти</button>
            </div>
        </div>
    </div>
  </div>
@endsection

@section('modal')
  <div class="modal fade" tabindex="-1" role="dialog" data-sold-modal>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">Продаж квитків</h4>
        </div>
        <div class="modal-body">
          <div class="kasir__modal-btns">
            <button type="button" class="btn btn-success" data-sold-type="0">Готівковий</button>
            <button type="button" class="btn btn-success" data-sold-type="1">Безготівковий</button>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection

@section('styles')
    {!! Html::style('css/global.css') !!}
    {!! Html::style('css/kasir.css') !!}
@endsection

@section('scripts')
  <script>
    window.csrf_token = `{{csrf_token()}}`
  </script>
  {!! Html::script('js/admin/kasir.js') !!}
@stop

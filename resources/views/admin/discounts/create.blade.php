@extends('layouts.admin')
@section('content')
  <div class="df mb15">
    <h1 class="global__page-title">Створення нової знижки</h1>
  </div>

  <!-- if there are creation errors, they will show here -->
  @include('admin.errors')

  {{ Form::open(['url' => '/admin/discounts', 'id' => 'create-discount']) }}
  <div>
    <div class="row">
      <div class="col-md-6 form-group">
        {{ Form::label('name', 'Назва') }}
        {{ Form::text('name', Input::old('name'), ['class' => 'form-control']) }}
      </div>
      <div class="col-md-6 form-group">
        {{ Form::label('size', '	Розмір, %') }}
        {{ Form::text('size', Input::old('size'), ['class' => 'form-control']) }}
      </div>
      <div class="col-md-6 form-group">
        <label class="global__checkbox">
          {{ Form::checkbox('is_active', 1, Input::old('is_active')) }}
          <span class="global__checkbox-text">Активно?</span>
        </label>
      </div>
    </div>
  </div>

  {{ Form::submit(__('admin.create'), ['class' => 'btn btn-success']) }}

  {{ Form::close() }}
@endsection
@section('styles')
  {!! Html::style('css/global.css') !!}
@endsection
@section('scripts')
  {!! Html::script('js/plugins/mask.min.js') !!}
  {!! Html::script('js/plugins/moment.min.js') !!}
@stop

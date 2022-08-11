@extends('layouts.admin')
@section('content')
  <div class="df mb15">
    <h1 class="global__page-title">{{__('admin.createSeason')}}</h1>
  </div>

  @include('admin.errors')

  {{ Form::open(['url' => '/admin/seasons', 'files' => true, 'id' => 'create-season']) }}
  <div>
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#en" aria-controls="home" role="tab" data-toggle="tab">EN</a></li>
      <li role="presentation"><a href="#ru" aria-controls="profile" role="tab" data-toggle="tab">RU</a></li>
      <li role="presentation"><a href="#ua" aria-controls="messages" role="tab" data-toggle="tab">UA</a></li>
    </ul>

    <div class="tab-content">
      <div role="tabpanel" class="tab-pane active" id="en">
        <div class="row">
          <div class="col-md-6 form-group">
            {{ Form::label('title_en', __('season.title')) }}
            {{ Form::text('title_en', Input::old('title_en'), ['class' => 'form-control']) }}
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="ru">
        <div class="row">
          <div class="col-md-6 form-group">
            {{ Form::label('title_ru', __('season.title')) }}
            {{ Form::text('title_ru', Input::old('title_ru'), ['class' => 'form-control']) }}
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="ua">
        <div class="row">
          <div class="col-md-6 form-group">
            {{ Form::label('title_ua', __('season.title')) }}
            {{ Form::text('title_ua', Input::old('title_ua'), ['class' => 'form-control']) }}
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6 form-group">
        {{ Form::label('number', __('season.number')) }}
        {{ Form::text('number', Input::old('number'), ['class' => 'form-control']) }}
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

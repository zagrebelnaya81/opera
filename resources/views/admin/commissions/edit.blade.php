@extends('layouts.admin')
@section('content')
  <div class="df mb15">
    <h1 class="global__page-title">Редагування комісійного збору</h1>
  </div>

  <!-- if there are creation errors, they will show here -->
  @include('admin.errors')

  {{ Form::model($commission, ['route' => array('commissions.update', $commission->id), 'method' => 'PUT']) }}
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
            {{ Form::label('title_en', __('album.title')) }}
            {{ Form::text('title_en',isset($commission->translate('en')->first()->title) ? $commission->translate('en')->first()->title  : Input::old('title_en'), ['class' => 'form-control' ]) }}
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="ru">
        <div class="row">
          <div class="col-md-6 form-group">
            {{ Form::label('title_ru', __('album.title')) }}
            {{ Form::text('title_ru',isset($commission->translate('ru')->first()->title) ? $commission->translate('ru')->first()->title  : Input::old('title_ru'), ['class' => 'form-control' ]) }}
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane" id="ua">
        <div class="row">
          <div class="col-md-6 form-group">
            {{ Form::label('title_ua', __('album.title')) }}
            {{ Form::text('title_ua',isset($commission->translate('ua')->first()->title) ? $commission->translate('ua')->first()->title  : Input::old('title_ua'), ['class' => 'form-control' ]) }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="form-group col-md-6">
      {{ Form::label('size', 'Розмір, %') }}
      {{ Form::text('size', $commission->size ?? Input::old('size'), ['class' => 'form-control']) }}
    </div>
  </div>

  {{ Form::submit(__('admin.update'), ['class' => 'btn btn-success']) }}

  <a class="btn btn-warning " href="{{ route('commissions.index') }}">{{ __('admin.cancel') }}</a>
@endsection
@section('styles')
  {!! Html::style('css/global.css') !!}
@endsection
@section('scripts')
  {!! Html::script('js/plugins/mask.min.js') !!}
  {!! Html::script('js/plugins/moment.min.js') !!}
@stop

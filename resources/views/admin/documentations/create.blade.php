@extends('layouts.admin')
@section('content')
    <div class="df mb15">
      <h1 class="global__page-title">{{__('admin.create_new_doc')}}</h1>
    </div>

    <!-- if there are creation errors, they will show here -->
    @include('admin.errors')

    {{ Form::open(['url' => '/admin/documentations', 'files' => true, 'id' => 'create-performance-type']) }}
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
                  {{ Form::label('title_en', __('admin.title')) }}
                  {{ Form::text('title_en', Input::old('title_en'), ['class' => 'form-control' ]) }}
                </div>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="ru">
              <div class="row">
                <div class="col-md-6 form-group">
                  {{ Form::label('title_ru', __('admin.title')) }}
                  {{ Form::text('title_ru',Input::old('title_ru'), ['class' => 'form-control']) }}
                </div>
              </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="ua">
              <div class="row">
                <div class="col-md-6 form-group">
                  {{ Form::label('title_ua', __('admin.title')) }}
                  {{ Form::text('title_ua', Input::old('title_ua'), ['class' => 'form-control']) }}
                </div>
              </div>
            </div>
        </div>

        <div class="row">
          <div class="col-md-6 form-group">
            {{ Form::label('category_id', __('admin.cat')) }}
            {{ Form::select('category_id', $documentationCategories, Input::old('category_id'), ['class' => 'form-control']) }}
          </div>
          <div class="col-md-6 form-group">
            <div class="file-load" data-file>
              <label class="file-load__label">
                {{Form::file('file', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'application/pdf'])}}
                <span class="file-load__text">{{ __('admin.file') }}</span>
              </label>

              <div class="file-load__list" data-file-list></div>

              <button type="button" class="btn btn-success" data-file-btn>
                <span class="glyphicon glyphicon-download-alt"></span> {{ __('admin.add_file') }}
              </button>
            </div>
          </div>
        </div>
    </div>

    {{ Form::submit(__('admin.create'), ['class' => 'btn btn-success']) }}

    {{ Form::close() }}
@endsection
@section('styles')
    {!! Html::style('css/select2.min.css') !!}
    {!! Html::style('css/global.css') !!}
@endsection
@section('scripts')
    {!! Html::script('js/plugins/mask.min.js') !!}
    {!! Html::script('js/plugins/moment.min.js') !!}
    {!! Html::script('js/plugins/select2.min.js') !!}
    {!! Html::script('js/admin/select2.js') !!}
    {!! Html::script('js/admin/article.js') !!}
    {!! Html::script('js/admin/global.js') !!}
@stop

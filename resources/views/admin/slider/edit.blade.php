@extends('layouts.admin')
@section('content')
        <div class="df mb15">
            <h1 class="global__page-title">Редагування слайду</h1>
        </div>

        @include('admin.errors')

        {{ Form::model($slide, array('route' => array('slider.update', $slide->id),'files'=>true, 'method' => 'PUT')) }}
        <div>
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#en" aria-controls="home" role="tab"
                                                          data-toggle="tab">EN</a></li>
                <li role="presentation"><a href="#ru" aria-controls="profile" role="tab" data-toggle="tab">RU</a></li>
                <li role="presentation"><a href="#ua" aria-controls="messages" role="tab" data-toggle="tab">UA</a></li>
            </ul>
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="en">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            {{ Form::label('title_en', __('article.title')) }}
                            {{ Form::text('title_en',isset($slide->translate('en')->first()->title) ? $slide->translate('en')->first()->title  : Input::old('title_en'), ['class' => 'form-control' ]) }}
                        </div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="ru">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            {{ Form::label('title_ru', __('article.title')) }}
                            {{ Form::text('title_ru',isset($slide->translate('ru')->first()->title) ? $slide->translate('ru')->first()->title : Input::old('title_ru'), ['class' => 'form-control']) }}
                        </div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="ua">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            {{ Form::label('title_ua', __('article.title')) }}
                            {{ Form::text('title_ua',isset($slide->translate('ua')->first()->title) ? $slide->translate('ua')->first()->title : Input::old('title_ua'), ['class' => 'form-control']) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 form-group">
                {{ Form::label('page_url', 'Посилання') }}
                {{ Form::text('page_url', isset($slide->page_url) ? $slide->page_url : Input::old('page_url'), ['class' => 'form-control' ]) }}
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 form-group">
                <div class="file-load" data-file>
                    <label class="file-load__label">
                        {{Form::file('poster', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'image/*'])}}
                        <span class="file-load__text">Постер</span>
                    </label>

                    <div class="file-load__list" data-file-list>
                        @if($slide->getFirstMediaUrl('posters', 'thumb'))
                            <ul>
                                <li>
                                    <img src="{{$slide->getFirstMediaUrl('posters', 'thumb')}}" alt="photo">
                                    <button type="button" class="btn btn-danger" data-file-remove="true">
                                        <span class="fa fa-trash"></span>
                                    </button>
                                </li>
                            </ul>
                        @endif
                    </div>

                    <button type="button" class="btn btn-success" data-file-btn>
                        <span class="glyphicon glyphicon-download-alt"></span> {{ __('admin.add_img') }}
                    </button>
                </div>
            </div>
        </div>

        {{ Form::submit(__('admin.update'), ['class' => 'btn btn-success']) }}
        <a class="btn btn-warning" href="{{ route('slider.index') }}">{{ __('admin.cancel') }}</a>

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
    {!! Html::script('/vendor/unisharp/laravel-ckeditor/ckeditor.js') !!}
    <script>
        CKEDITOR.replace('descriptions_en');
        CKEDITOR.replace('descriptions_ru');
        CKEDITOR.replace('descriptions_ua');
    </script>
    {!! Html::script('js/admin/global.js') !!}
@stop

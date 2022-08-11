@extends('layouts.admin')
@section('content')
    <div class="df mb15">
        <h1 class="global__page-title">{{__('admin.create_hall_plan')}}</h1>
    </div>

    @include('admin.errors')

    {{ Form::open(['url' => '/admin/halls', 'files'=>true, 'id' => 'hall']) }}
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
                    <div class="col-md-12 form-group">
                        {{ Form::label('description_en', __('admin.description')) }}
                        {{ Form::textarea('description_en', Input::old('description_en'), ['class' => 'form-control', 'data-ckeditor' ]) }}
                    </div>
                    <div class="col-md-6 form-group">
                        {{ Form::label('seo_title_en', __('admin.seo_title')) }}
                        {{ Form::text('seo_title_en', Input::old('seo_title_en'), ['class' => 'form-control']) }}
                    </div>
                    <div class="col-md-6 form-group">
                        {{ Form::label('seo_description_en', __('admin.seo_description')) }}
                        {{ Form::text('seo_description_en', Input::old('seo_description_en'), ['class' => 'form-control']) }}
                    </div>
                    <div class="col-md-6 form-group">
                        <div class="file-load" data-file>
                            <label class="file-load__label">
                                {{Form::file('file_description_en', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'application/pdf'])}}
                                <span class="file-load__text">PDF-файл з описом залу</span>
                            </label>
                            <div class="file-load__list" data-file-list></div>
                            <button type="button" class="btn btn-success" data-file-btn>
                                <span class="glyphicon glyphicon-download-alt"></span> {{ __('admin.add_file') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="ru">
                <div class="row">
                    <div class="col-md-6 form-group">
                        {{ Form::label('title_ru', __('admin.title')) }}
                        {{ Form::text('title_ru', Input::old('title_ru'), ['class' => 'form-control' ]) }}
                    </div>
                    <div class="col-md-12 form-group">
                        {{ Form::label('description_ru', __('admin.description')) }}
                        {{ Form::text('description_ru',Input::old('description_ru'), ['class' => 'form-control', 'data-ckeditor']) }}
                    </div>
                    <div class="col-md-6 form-group">
                        {{ Form::label('seo_title_ru', __('admin.seo_title')) }}
                        {{ Form::text('seo_title_ru', Input::old('seo_title_ru'), ['class' => 'form-control']) }}
                    </div>
                    <div class="col-md-6 form-group">
                        {{ Form::label('seo_description_ru', __('admin.seo_description')) }}
                        {{ Form::text('seo_description_ru', Input::old('seo_description_ru'), ['class' => 'form-control']) }}
                    </div>
                    <div class="col-md-6 form-group">
                        <div class="file-load" data-file>
                            <label class="file-load__label">
                                {{Form::file('file_description_ru', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'application/pdf'])}}
                                <span class="file-load__text">PDF-файл з описом залу</span>
                            </label>
                            <div class="file-load__list" data-file-list></div>
                            <button type="button" class="btn btn-success" data-file-btn>
                                <span class="glyphicon glyphicon-download-alt"></span> {{ __('admin.add_file') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="ua">
                <div class="row">
                    <div class="col-md-6 form-group">
                        {{ Form::label('title_ua', __('admin.title')) }}
                        {{ Form::text('title_ua', Input::old('title_ua'), ['class' => 'form-control' ]) }}
                    </div>
                    <div class="col-md-12 form-group">
                        {{ Form::label('description_ua', __('admin.description')) }}
                        {{ Form::text('description_ua', Input::old('description_ua'), ['class' => 'form-control', 'data-ckeditor']) }}
                    </div>
                    <div class="col-md-6 form-group">
                        {{ Form::label('seo_title_ua', __('admin.seo_title')) }}
                        {{ Form::text('seo_title_ua', Input::old('seo_title_ua'), ['class' => 'form-control']) }}
                    </div>
                    <div class="col-md-6 form-group">
                        {{ Form::label('seo_description_ua', __('admin.seo_description')) }}
                        {{ Form::text('seo_description_ua', Input::old('seo_description_ua'), ['class' => 'form-control']) }}
                    </div>
                    <div class="col-md-6 form-group">
                        <div class="file-load" data-file>
                            <label class="file-load__label">
                                {{Form::file('file_description_ua', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'application/pdf'])}}
                                <span class="file-load__text">PDF-файл з описом залу</span>
                            </label>
                            <div class="file-load__list" data-file-list></div>
                            <button type="button" class="btn btn-success" data-file-btn>
                                <span class="glyphicon glyphicon-download-alt"></span> {{ __('admin.add_file') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6 form-group">
            {{ Form::label('sort_order', __('admin.sort_order')) }}
            {{ Form::text('sort_order', Input::old('sort_order'), ['class' => 'form-control']) }}
        </div>
        <div class="col-md-6 form-group">
            {{Form::label('spaciousness', __('admin.spaciousness'))}}
            {{ Form::text('spaciousness', Input::old('spaciousness'), ['class' => 'form-control']) }}
        </div>
        <div class="col-md-6 form-group">
            {{Form::label('name', __('admin.name'))}}
            {{ Form::text('name', Input::old('name'), ['class' => 'form-control']) }}
        </div>
        <div class="col-md-6 form-group">
            <div class="file-load" data-file>
                <label class="file-load__label">
                    {{Form::file('poster', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'image/*'])}}
                    <span class="file-load__text">{{ __('admin.poster') }}</span>
                </label>
                <div class="file-load__list" data-file-list></div>
                <button type="button" class="btn btn-success" data-file-btn>
                    <span class="glyphicon glyphicon-download-alt"></span> {{ __('admin.poster') }}
                </button>
            </div>
        </div>
    </div>

    <div class="panel panel-primary">
        <div class="panel-heading">{{__('admin.images')}}</div>
        <div class="panel-body">
            <div class="file-load" data-file>
                <label class="file-load__label">
                    {{Form::file('images[]', ['class'=>'visually-hidden', 'data-file-input', 'multiple', 'accept'=>'image/*'])}}
                </label>
                <div class="file-load__list" data-file-list></div>
                <button type="button" class="btn btn-success" data-file-btn>
                    <span class="glyphicon glyphicon-download-alt"></span> {{ __('admin.add_img') }}
                </button>
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
    {!! Html::script('/vendor/unisharp/laravel-ckeditor/ckeditor.js') !!}
    {!! Html::script('/vendor/unisharp/laravel-ckeditor/adapters/jquery.js') !!}
    <script>
        $("[data-ckeditor]").ckeditor();
    </script>
@stop

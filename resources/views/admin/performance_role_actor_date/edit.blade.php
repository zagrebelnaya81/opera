@extends('layouts.admin')
@section('content')
    <div class="df mb15">
        <h1 class="global__page-title">{{__('admin.editPerformanceRoles')}} {{$performance->title}} {{$performanceCalendar->date}}</h1>
    </div>

    @include('admin.errors')

    {{ Form::model($performanceCalendar, [
        'route' => ['performance-actors-roles.update', $performanceCalendar->id],
        'method' => 'PUT',
        'id' => 'edit-performance',
        'files' => true
       ])
    }}

    <div>
        <ul class="nav nav-tabs" role="tablist">
            <li role="presentation" class="active"><a href="#en" aria-controls="home" role="tab" data-toggle="tab">EN</a></li>
            <li role="presentation"><a href="#ru" aria-controls="profile" role="tab" data-toggle="tab">RU</a></li>
            <li role="presentation"><a href="#ua" aria-controls="messages" role="tab" data-toggle="tab">UA</a></li>
        </ul>
        <div class="tab-content">
            <div role="tabpanel" class="tab-pane active" id="en">
                <div class="row">
                    <div class="col-md-12 form-group">
                        {{ Form::label('descriptions', __('performance.descriptions')) }}
                        {{ Form::textarea(
                            'descriptions_en',
                            Input::old('descriptions_en') ?? $performanceCalendar->descriptions_en,
                            ['class' => 'form-control', 'data-ckeditor']
                        ) }}
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="ru">
                <div class="row">
                    <div class="col-md-12 form-group">
                        {{ Form::label('descriptions_ru', __('performance.descriptions')) }}
                        {{ Form::textarea(
                            'descriptions_ru',
                            Input::old('descriptions_ru') ?? $performanceCalendar->descriptions_ru,
                            ['class' => 'form-control', 'data-ckeditor']
                        ) }}
                    </div>
                </div>
            </div>
            <div role="tabpanel" class="tab-pane" id="ua">
                <div class="row">
                    <div class="col-md-12 form-group">
                        {{ Form::label('descriptions_ua', __('performance.descriptions')) }}
                        {{ Form::textarea(
                            'descriptions_ua',
                            Input::old('descriptions_ua') ?? $performanceCalendar->descriptions_ua,
                            ['class' => 'form-control', 'data-ckeditor']
                        ) }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            {{ Form::label('karabas_link', __('performance.karabas_link')) }}
            {{ Form::text(
                'karabas_link',
                Input::old('karabas_link') ?? $performanceCalendar->karabas_link,
                ['class' => 'form-control']
            ) }}
        </div>
        <div class="col-md-6">
            {{ Form::label('internet_bilet_link', __('performance.internet_bilet_link')) }}
            {{ Form::text(
                'internet_bilet_link',
                Input::old('internet_bilet_link') ?? $performanceCalendar->internet_bilet_link,
                ['class' => 'form-control']
            ) }}
        </div>
        <div class="col-md-6 form-group">
            <div class="file-load" data-file>
                <label class="file-load__label">
                    {{Form::file('poster1', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'image/*'])}}
                    <span class="file-load__text">{{ __('performance.poster') }}</span>
                </label>

                <div class="file-load__list" data-file-list>
                    @if($performanceCalendar->getFirstMediaUrl('poster1', 'thumb'))
                        <ul>
                            <li>
                                <img src="{{ $performanceCalendar->getFirstMediaUrl('poster1', 'thumb') }}" alt="photo">
                                <button type="button" class="btn btn-danger" data-file-remove="true">
                                    <span class="fa fa-trash"></span>
                                </button>
                            </li>
                        </ul>
                    @endif
                </div>

                <button type="button" class="btn btn-success" data-file-btn>
                    <span class="glyphicon glyphicon-download-alt"></span>{{ __('admin.add_img') }}
                </button>
            </div>
        </div>
        <div class="col-md-6 form-group">
            <div class="file-load" data-file>
                <label class="file-load__label">
                    {{Form::file('poster2', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'image/*'])}}
                    <span class="file-load__text">{{ __('performance.director_image2') }}</span>
                </label>

                <div class="file-load__list" data-file-list>
                    @if($performanceCalendar->getFirstMediaUrl('poster2', 'thumb'))
                        <ul>
                            <li>
                                <img src="{{ $performanceCalendar->getFirstMediaUrl('poster2', 'thumb') }}" alt="photo">
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

    <div class="performance-dates-actors-wrap">
        <div class="panel panel-info">
            <div class="panel-heading">{{ __('admin.performance_dates_actors') }}</div>
            <div class="panel-body">
                <div class="performance-dates-actors">
                    @foreach($performanceActors as $date)
                        <div class="row actor_date_row">
                            <div class="form-group col-md-6">
                                <label>Актер:</label>
                                <select name="actors[]" class="form-control">
                                    @foreach($actors as $actor)
                                        <option @if($date->actor_id == $actor->id)selected="selected" @endif value="{{$actor->id}}">
                                            {{$actor->fullName()}} {{$actor->id}}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <label>Роль:</label>
                                <select name="roles[]" class="form-control">
                                    @foreach($roles as $role)
                                        <option {{ $date->actor_role_id == $role->id ? 'selected="selected"' : '' }}
                                                value="{{$role->id}}">{{$role->translate->title}}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="form-group col-md-6">
                                <button type="button" class="btn btn-danger delete-actor-role">
                                    <span class="fa fa-trash"></span>
                                </button>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 form-group">
            {{ Form::button('Добавить актера', ['class' => 'btn btn-success add-actor-role']) }}
        </div>
    </div>

    {{ Form::submit(__('admin.update'), ['class' => 'btn btn-success']) }}

    {{ Form::close() }}

    <div class="row actor_date_row" id="actor-template" style="display: none">
        <div class="form-group col-md-6">
            <label>Актер:</label>
            <select name="actors[]" class="form-control">
                @foreach($actors as $actor)
                    <option value="{{$actor->id}}">
                        {{$actor->fullName()}} {{$actor->id}}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-md-6">
            <label>Роль:</label>
            <select name="roles[]" class="form-control">
                @foreach($roles as $role)
                    <option value="{{$role->id}}">{{$role->translate->title}}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group col-md-6">
            <button type="button" class="btn btn-danger delete-actor-role">
                <span class="fa fa-trash"></span>
            </button>
        </div>
    </div>
@endsection

@section('styles')
    {!! Html::style('css/select2.min.css') !!}
    {!! Html::style('css/bootstrap-datetimepicker.min.css') !!}
    {!! Html::style('css/global.css') !!}
@endsection
@section('scripts')
    {!! Html::script('js/plugins/mask.min.js') !!}
    {!! Html::script('js/plugins/moment.min.js') !!}
    {!! Html::script('js/plugins/select2.min.js') !!}
    {!! Html::script('js/plugins/bootstrap-datetimepicker.min.js') !!}
    {!! Html::script('js/admin/select2.js') !!}
    {!! Html::script('js/admin/performance.js') !!}
    {!! Html::script('/vendor/unisharp/laravel-ckeditor/ckeditor.js') !!}
    {!! Html::script('/vendor/unisharp/laravel-ckeditor/adapters/jquery.js') !!}
    <script>
        $("[data-ckeditor]").ckeditor();
    </script>
    {!! Html::script('js/admin/global.js') !!}
@stop

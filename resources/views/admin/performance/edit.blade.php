@extends('layouts.admin')
@section('content')

        <div class="df mb15">
            <h1 class="global__page-title">{{__('admin.editPerformance')}}</h1>
            <div class="fsh">
                <a class="btn btn-primary" href="{{ route('performance.index') }}">До списку виступів</a>
            </div>
        </div>

        @include('admin.errors')

        @include('admin.errors')
        {{ Form::model($performance, [
            'route' => ['performance.update', $performance->id],
            'method' => 'PUT', 'id' => 'edit-performance',
            'files' => true
           ])
        }}
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
                            {{ Form::label('title_en', __('performance.title')) }}
                            {{ Form::text('title_en', Input::old('title_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('lang_en', __('admin.lang')) }}
                            {{ Form::text('lang_en', Input::old('lang_en'), ['class' => 'form-control' ]) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('descriptions', __('performance.descriptions')) }}
                            {{ Form::textarea('descriptions_en', Input::old('descriptions_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('directors_en', __('performance.directors')) }}
                            {{ Form::textarea('directors_en', Input::old('directors_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('directors2_en', __('performance.directors2')) }}
                            {{ Form::textarea('directors2_en', Input::old('directors2_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('tagline_en', __('performance.tagline')) }}
                            {{ Form::textarea('tagline_en', Input::old('tagline_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('author_en', __('performance.author')) }}
                            {{ Form::textarea('author_en', Input::old('author_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('synapsis_en', __('performance.synapsis')) }}
                            {{ Form::textarea('synapsis_en', Input::old('synapsis_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('city_en', __('admin.city')) }}
                            {{ Form::text('city_en', Input::old('city_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('place_en', __('admin.place')) }}
                            {{ Form::text('place_en', Input::old('place_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('seo_title_en', __('seo.seo_title')) }}
                            {{ Form::text('seo_title_en', Input::old('seo_title_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('seo_description_en', __('seo.seo_description')) }}
                            {{ Form::text('seo_description_en', Input::old('seo_description_en'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            <div class="file-load" data-file>
                                <label class="file-load__label">
                                    {{Form::file('program_en', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'application/pdf'])}}
                                    <span class="file-load__text">{{ __('performance.program') }}</span>
                                </label>

                                <div class="file-load__list" data-file-list>
                                    @if($performance->program_en != '')
                                        <ul>
                                            <li>
                                                <div>
                                                    <svg viewBox="0 0 60 60" width="60" height="60"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m42.5 22h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="m17.5 16h10c0.552 0 1-0.447 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.447-1 1s0.448 1 1 1z"/>
                                                        <path d="m42.5 30h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="m42.5 38h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="m42.5 46h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="M38.914,0H6.5v60h47V14.586L38.914,0z M39.5,3.414L50.086,14H39.5V3.414z M8.5,58V2h29v14h14v42H8.5z"/>
                                                    </svg>
                                                </div>
                                                <button type="button" class="btn btn-danger" data-file-remove="true">
                                                    <span class="fa fa-trash"></span>
                                                </button>
                                            </li>
                                        </ul>
                                    @endif
                                </div>

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
                            {{ Form::label('title_ru', __('performance.title')) }}
                            {{ Form::text('title_ru', Input::old('title_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('lang_ru', __('admin.lang')) }}
                            {{ Form::text('lang_ru', Input::old('lang_ru'), ['class' => 'form-control' ]) }}
                        </div>

                        <div class="col-md-12 form-group">
                            {{ Form::label('descriptions_ru', __('performance.descriptions')) }}
                            {{ Form::textarea('descriptions_ru', Input::old('descriptions_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('directors_ru', __('performance.directors')) }}
                            {{ Form::textarea('directors_ru', Input::old('directors_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('directors2_ru', __('performance.directors2')) }}
                            {{ Form::textarea('directors2_ru', Input::old('directors2_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('tagline_ru', __('performance.tagline')) }}
                            {{ Form::textarea('tagline_ru', Input::old('tagline_ru'), ['class' => 'form-control']) }}
                        </div>

                        <div class="col-md-12 form-group">
                            {{ Form::label('author_ru', __('performance.author')) }}
                            {{ Form::textarea('author_ru', Input::old('author_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('synapsis_ru', __('performance.synapsis')) }}
                            {{ Form::textarea('synapsis_ru', Input::old('synapsis_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('city_ru', __('admin.city')) }}
                            {{ Form::text('city_ru', Input::old('city_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('place_ru', __('admin.place')) }}
                            {{ Form::text('place_ru', Input::old('place_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('seo_title_ru', __('seo.seo_title')) }}
                            {{ Form::text('seo_title_ru', Input::old('seo_title_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('seo_description_ru', __('seo.seo_description')) }}
                            {{ Form::text('seo_description_ru', Input::old('seo_description_ru'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            <div class="file-load" data-file>
                                <label class="file-load__label">
                                    {{Form::file('program_ru', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'application/pdf'])}}
                                    <span class="file-load__text">{{ __('performance.program') }}</span>
                                </label>
                                <div class="file-load__list" data-file-list>
                                    @if($performance->program_ru != '')
                                        <ul>
                                            <li>
                                                <div>
                                                    <svg viewBox="0 0 60 60" width="60" height="60"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m42.5 22h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="m17.5 16h10c0.552 0 1-0.447 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.447-1 1s0.448 1 1 1z"/>
                                                        <path d="m42.5 30h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="m42.5 38h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="m42.5 46h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="M38.914,0H6.5v60h47V14.586L38.914,0z M39.5,3.414L50.086,14H39.5V3.414z M8.5,58V2h29v14h14v42H8.5z"/>
                                                    </svg>
                                                </div>
                                                <button type="button" class="btn btn-danger" data-file-remove="true">
                                                    <span class="fa fa-trash"></span>
                                                </button>
                                            </li>
                                        </ul>
                                    @endif
                                </div>

                                <button type="button" class="btn btn-success" data-file-btn>
                                    <span class="glyphicon glyphicon-download-alt"></span> {{ __('admin.add_file')}}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="tabpanel" class="tab-pane" id="ua">
                    <div class="row">
                        <div class="col-md-6 form-group">
                            {{ Form::label('title_ua', __('performance.title')) }}
                            {{ Form::text('title_ua', Input::old('title_ua'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('lang_ua', __('admin.lang')) }}
                            {{ Form::text('lang_ua', Input::old('lang_ua'), ['class' => 'form-control' ]) }}
                        </div>

                        <div class="col-md-12 form-group">
                            {{ Form::label('descriptions_ua', __('performance.descriptions')) }}
                            {{ Form::textarea('descriptions_ua', Input::old('descriptions_ua  '), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('directors_ua', __('performance.directors')) }}
                            {{ Form::textarea('directors_ua', Input::old('directors_ua'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('directors2_ua', __('performance.directors2')) }}
                            {{ Form::textarea('directors2_ua', Input::old('directors2_ua'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('tagline_ua', __('performance.tagline')) }}
                            {{ Form::textarea('tagline_ua', Input::old('tagline_ua'), ['class' => 'form-control']) }}
                        </div>

                        <div class="col-md-12 form-group">
                            {{ Form::label('author_ua', __('performance.author')) }}
                            {{ Form::textarea('author_ua', Input::old('author_ua'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-12 form-group">
                            {{ Form::label('synapsis_ua', __('performance.synapsis')) }}
                            {{ Form::textarea('synapsis_ua', Input::old('synapsis_ua'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('city_ua', __('admin.city')) }}
                            {{ Form::text('city_ua', Input::old('city_ua'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('place_ua', __('admin.place')) }}
                            {{ Form::text('place_ua', Input::old('place_ua'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('seo_title_ua', __('seo.seo_title')) }}
                            {{ Form::text('seo_title_ua', Input::old('seo_title_ua'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            {{ Form::label('seo_description_ua', __('seo.seo_description')) }}
                            {{ Form::text('seo_description_ua', Input::old('seo_description_ua'), ['class' => 'form-control']) }}
                        </div>
                        <div class="col-md-6 form-group">
                            <div class="file-load" data-file>
                                <label class="file-load__label">
                                    {{Form::file('program_ua', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'application/pdf'])}}
                                    <span class="file-load__text">{{ __('performance.program') }}</span>
                                </label>

                                <div class="file-load__list" data-file-list>
                                    @if($performance->program_ua != '')
                                        <ul>
                                            <li>
                                                <div>
                                                    <svg viewBox="0 0 60 60" width="60" height="60"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path d="m42.5 22h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="m17.5 16h10c0.552 0 1-0.447 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.447-1 1s0.448 1 1 1z"/>
                                                        <path d="m42.5 30h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="m42.5 38h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="m42.5 46h-25c-0.552 0-1 0.447-1 1s0.448 1 1 1h25c0.552 0 1-0.447 1-1s-0.448-1-1-1z"/>
                                                        <path d="M38.914,0H6.5v60h47V14.586L38.914,0z M39.5,3.414L50.086,14H39.5V3.414z M8.5,58V2h29v14h14v42H8.5z"/>
                                                    </svg>
                                                </div>
                                                <button type="button" class="btn btn-danger" data-file-remove="true">
                                                    <span class="fa fa-trash"></span>
                                                </button>
                                            </li>
                                        </ul>
                                    @endif
                                </div>

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
                <div class="file-load" data-file>
                    <label class="file-load__label">
                        {{Form::file('director_image', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'image/*'])}}
                        <span class="file-load__text">{{ __('performance.director_image') }}</span>
                    </label>

                    <div class="file-load__list" data-file-list>
                        @if($performance->getFirstMediaUrl('directors', 'thumb'))
                            <ul>
                                <li>
                                    <img src="{{$performance->getFirstMediaUrl('directors', 'thumb')}}" alt="photo">
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
                        {{Form::file('director_image2', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'image/*'])}}
                        <span class="file-load__text">{{ __('performance.director_image2') }}</span>
                    </label>

                    <div class="file-load__list" data-file-list>
                        @if($performance->getFirstMediaUrl('directors2', 'thumb'))
                            <ul>
                                <li>
                                    <img src="{{$performance->getFirstMediaUrl('directors2', 'thumb')}}" alt="photo">
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

        <div class="row">
            <div class="col-md-12 form-group">
                <label class="global__checkbox">
                    {{ Form::checkbox('isPremiere', 1, Input::old('isPremiere')) }}
                    <span class="global__checkbox-text">{{ __('performance.isPremiere') }}</span>
                </label>
                <label class="global__checkbox">
                    {{ Form::checkbox('isSpecial', 1, Input::old('isSpecial')) }}
                    <span class="global__checkbox-text">{{ __('performance.isSpecial') }}</span>
                </label>
            </div>
            <div class="col-md-6 form-group">
                {{ Form::label('duration', __('performance.duration')) }}
                {{ Form::text('duration', Input::old('duration'),
                      [
                        'class' => 'form-control masked',
                        'placeholder' => 'HH:MM'
                      ]
                    ) }}
            </div>
            <div class="col-md-6 form-group">
                {{ Form::label('type_id', __('performance.type')) }}
                {{ Form::select('type_id', $typePerformance, Input::old('type_id'), ['class' => 'form-control']) }}
            </div>
            <div class="col-md-6 form-group">
                {{ Form::label('hall_id', __('admin.hall')) }}
                {{ Form::select('hall_id', $halls, Input::old('hall_id'), ['class' => 'form-control']) }}
            </div>
            <div class="col-md-6 form-group">
                {{ Form::label('season_id', __('performance.season')) }}
                {{ Form::select('season_id', $seasons, Input::old('season_id'), ['class' => 'form-control']) }}
            </div>
            <div class="col-md-6 form-group">
                {{ Form::label('general_actors[]', __('performance.generalActors')) }}

                {{ Form::select('general_actors[]', [], null, [
                      'class' => 'form-control',
                      'data-selected' => json_encode($generalActors)
                    ])
                }}
            </div>
            <div class="col-md-6 form-group">
                <div class="file-load" data-file>
                    <label class="file-load__label">
                        {{Form::file('poster', ['class'=>'visually-hidden', 'data-file-input', 'accept'=>'image/*'])}}
                        <span class="file-load__text">{{ __('performance.poster') }}</span>
                    </label>

                    <div class="file-load__list" data-file-list>
                        @if($performance->getFirstMediaUrl('posters', 'thumb'))
                            <ul>
                                <li>
                                    <img src="{{$performance->getFirstMediaUrl('posters', 'thumb')}}" alt="photo">
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
        <div class="performance-dates">
            <div class="panel panel-info">
                <div class="panel-heading">{{ __('admin.performance_data') }}</div>
                <div class="panel-body">
                    <div data-dates>
                        @foreach($performance->allDates as $date)
                            <div class="performance-date row" data-perfomance-date-row>
                                <div class="form-group col-md-6">
                                    {{ Form::label('performance_dates', __('performance.performanceDate')) }}
                                    <div class='input-group date input-date-perfomance'>
                                        <p>
                                            <button type="button" class="btn btn-danger" data-date-remove="true">
                                                <span class="fa fa-trash"></span>
                                            </button>
                                            <a class="btn btn-primary"
                                               href="{{ route('performance-actors-roles.edit', ['id' => $date->id]) }}"
                                               target="_blank"><i class="fa fa-pencil"></i></a>
                                        </p>
                                        <span class="input-group-addon">
                                        <span class="glyphicon glyphicon-calendar"></span>
                                    </span>
                                        {{ Form::text('performance_date', $date->date, ['class' => 'form-control', 'id' => null]) }}
                                    </div>
                                </div>
                                {{ Form::hidden('performance_date_id', $date->id, ['class' => 'form-control', 'id' => null]) }}
                                <div class="form-group col-md-6">
                                    {{ Form::label('special_actors', __('performance.specialActors')) }}
                                    {{ Form::select('special_actors[]', [], null, [
                                        'class' => 'form-control',
                                        'data-selected' => json_encode(array_to_index_array(
                                            array_diff_assoc_recursive(
                                              array_formatter_index($date->actors, ['id' => 'actor_id', 'fullName' => 'fullName']),
                                              $generalActorsIndex
                                            )
                                          )
                                        )
                                      ])
                                    }}
                                </div>
                            </div>
                        @endforeach
                    </div>
                    <div class="row">
                        <div class="col-md-12 form-group">
                            {{ Form::button(__('performance.addDate'), ['class' => 'btn btn-success add-date']) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12 form-group">
                <label class="global__checkbox">
                    {{ Form::checkbox('is_published', 1, Input::old('is_published')) }}
                    <span class="global__checkbox-text">Публікувати?</span>
                </label>
            </div>
        </div>

        {{ Form::submit(__('admin.update'), ['class' => 'btn btn-success']) }}

        <a class="btn btn-warning" href="{{ route('performance.index') }}">{{ __('admin.cancel') }}</a>
@endsection
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
        $('#directors_en, #directors_ru, #directors_ua, #directors2_en, #directors2_ru, #directors2_ua').ckeditor({
            filebrowserImageBrowseUrl: '/laravel-filemanager?type=Images',
            filebrowserImageUploadUrl: '/laravel-filemanager/upload?type=Images&_token={{csrf_token()}}',
            filebrowserBrowseUrl: '/laravel-filemanager?type=Files',
            filebrowserUploadUrl: '/laravel-filemanager/upload?type=Files&_token={{csrf_token()}}'
        });
        $('textarea').ckeditor();
    </script>
    {!! Html::script('js/admin/global.js') !!}
@stop

@extends('layouts.admin')

@section('content')
    <div class="container-fluid">
        <div class="df mb15">
            <h1 class="global__page-title">{{ __('admin.editDistributor') }}</h1>
            <div class="fsh">
                <a class="btn btn-primary" href="{{ route('distributors.index') }}">{{ __('admin.back') }}</a>
            </div>
        </div>

        @include('admin.errors')

        {!! Form::open(['method' => 'POST', 'route' => 'distributors.store']) !!}

        <div class="row">
            <div class="col-md-6 form-group">
                <label for="title">Назва:</label>
                {!! Form::text('title', null, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="email">Email:</label>
                {!! Form::text('email', null, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="phone">Телефон:</label>
                {!! Form::text('phone', null, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="color_code">Колір:</label>
                {!! Form::color('color_code', null, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="status">Статус:</label>
                {!! Form::select('is_active', $statuses, null, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="type">Тип:</label>
                {!! Form::select('type', $types, null, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-12">
                <button type="submit" class="btn btn-success">Зберегти</button>
            </div>
        </div>
    </div>

    {!! Form::close() !!}
@endsection

@section('styles')
    {!! Html::style('css/global.css') !!}
@endsection
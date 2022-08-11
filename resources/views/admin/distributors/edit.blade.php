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

        {!! Form::model($distributor, ['method' => 'PATCH', 'route' => ['distributors.update', $distributor->id]]) !!}

        <div class="row">
            <div class="col-md-6 form-group">
                <label for="title">Назва:</label>
                {!! Form::text('title', $distributor->title, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="email">Email:</label>
                {!! Form::text('email', $distributor->email, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="phone">Телефон:</label>
                {!! Form::text('phone', $distributor->phone, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="color_code">Колір:</label>
                {!! Form::color('color_code', $distributor->color_code, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="status">Статус:</label>
                {!! Form::select('is_active', $statuses, $distributor->is_active, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="type">Тип:</label>
                {!! Form::select('type', $types, $distributor->type, ['class' => 'form-control']) !!}
            </div>
            <div class="col-md-6 form-group">
                <label for="type">Токен:</label>
                <div class="input-group">
                    <input class="form-control" name="token" id="token">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-primary mt-2" id="generate-token" data-id="{{ $distributor->id }}">Генерувати</button>
                        <button type="button" class="btn btn-secondary mt-2" id="copy-token">Копіювати</button>
                    </span>
                </div>
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

@section('scripts')
    <script>
        $(document).ready(() => {
            $('#generate-token').click((e) => {
                let target = e.currentTarget;

                $.ajax({
                    url: '{{ route('distributors.token', $distributor->id) }}',
                    success: (data) => {
                        $('#token').val(data.token);
                    }
                });
            });

            $('#copy-token').click(() => {
                $('#token').select();
                document.execCommand('copy');
                alert('Токен скопійований');
            });
        });
    </script>
@endsection
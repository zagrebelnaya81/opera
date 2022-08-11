@extends('layouts.admin')

@section('content')
    <div class="df mb15">
        <h2 class="global__page-title">Дистриб'ютори</h2>
        <div class="fsh">
            @can('distributor-create')
                <a href="{{ route('distributors.create') }}" class="btn btn-success">Створити новий</a>
            @endcan
        </div>
    </div>

    @include('admin.message')

    <table class="table table-bordered global__table" id="price-table">
        <thead>
        <tr>
            <th class="global__table-short">ID</th>
            <th>Назва</th>
            <th>Тип</th>
            <th>Номер телефону</th>
            <th>E-mail</th>
            <th>Колір</th>
            <th>Статус</th>
            <th class="global__table-short">Дія</th>
        </tr>
        </thead>
        <tbody>
        @foreach ($distributors as $key => $distributor)
            <tr>
                <td class="global__table-short">{{ $distributor->id }}</td>
                <td>{{ $distributor->title }}</td>
                <td>{{ $distributor->getType() }}</td>
                <td>{{ $distributor->phone }}</td>
                <td>{{ $distributor->email }}</td>
                <td style="background-color: {{ $distributor->color_code }}"></td>
              <td style="text-align: center"><i class="fa {{ $distributor->is_active ? 'fa-check' : 'fa-times' }}"
                  style="color: {{ $distributor->is_active ? '#449d44' : '#af0007' }}"></i></td>
              <td class="global__table-short">
                    @can('distributor-edit')
                        <a class="btn btn-primary btn-sm" href="{{ route('distributors.edit', $distributor->id) }}">
                            <i class="fa fa-pencil"></i>
                        </a>
                    @endcan
                    @can('distributor-delete')
                        {{ Form::open(['method' => 'DELETE', 'route' => ['distributors.destroy', $distributor->id], 'data-confirm' => 'Ви впевнені, що хочете видалити?', 'style' => 'display:inline-block' ])}}
                        {{ Form::button("<i class=\"fa fa-trash\"></i>", ['type' => 'submit', 'class' => 'btn btn-danger btn-sm']) }}
                        {{ Form::close() }}
                    @endcan
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>

    {!! $distributors->links() !!}
@endsection

@section('modal')
    <div class="modal fade" id="create" tabindex="-1" role="dialog" aria-labelledby="create">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Додати дистриб'ютора</h4>
                </div>
                <div class="modal-body">
                    <div class="alert" role="alert" style="display: none">
                        <div class="alert-content"></div>
                    </div>
                    {{ Form::open(['url' => '/admin/distributors', 'files' => true, 'id' => 'create-distributor', 'data-form-price-patterns' => 'create', 'data-form-distributors' => 'create']) }}
                    <div>
                        <div class="form-group">
                            {{ Form::label('title', 'Дистриб\'ютор') }}
                            {{ Form::text('title', Input::old('title'), ['class' => 'form-control']) }}
                            {{ Form::label('email', 'Email') }}
                            {{ Form::text('email', Input::old('email'), ['class' => 'form-control']) }}
                            {{ Form::label('phone', 'Номер телефону') }}
                            {{ Form::text('phone', Input::old('phone'), ['class' => 'form-control']) }}
                            {{ Form::label('color_code', 'Колір') }}
                            {{ Form::input('color', 'color_code', null, array('class' => 'input-big form-control')) }}
                        </div>
                    </div>
                    <div class="df jcend">
                        {{ Form::submit('Додати', ['class' => 'btn btn-success']) }}
                    </div>
                    {{ Form::close() }}
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="edit">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title" id="myModalLabel">Редагування дистриб'ютора</h4>
                </div>
                <div class="modal-body">
                    <div class="alert" role="alert" style="display: none">
                        <div class="alert-content"></div>
                    </div>
                    {{ Form::model('', ['route' => array('distributors.update', 0), 'method' => 'PUT', 'data-form-edit', 'data-form-price-patterns' => 'edit', 'data-form-distributors' => 'edit']) }}
                    <div>
                        <div class="form-group">
                            {{ Form::label('title', 'Дистриб\'ютор') }}
                            {{ Form::text('title', Input::old('title'), ['class' => 'form-control']) }}
                            {{ Form::label('email', 'Email') }}
                            {{ Form::text('email', Input::old('email'), ['class' => 'form-control']) }}
                            {{ Form::label('phone', 'Номер телефону') }}
                            {{ Form::text('phone', Input::old('phone'), ['class' => 'form-control']) }}
                            {{ Form::label('color_code', 'Колір') }}
                            {{ Form::input('color', 'color_code', null, array('class' => 'input-big form-control')) }}
                        </div>
                    </div>
                    <div class="df jcend">
                        {{ Form::submit('Редагувати', ['class' => 'btn btn-success']) }}
                    </div>
                    {{ Form::close() }}
                </div>
            </div>
        </div>
    </div>

    <template id="template-create">
        <tr data-tr-template>
            <td class="global__table-short" data-td="id"></td>
            <td data-td="title"></td>
            <td data-td="entity_type"></td>
            <td data-td="phone"></td>
            <td data-td="email"></td>
            <td data-td="color_code"></td>
            <td data-td="is_active" class="text-center"></td>
            <td class="global__table-short">
                <a class="btn btn-primary btn-sm" href="{{ route('distributors.edit', ['id' => 'current-id']) }}" data-td="edit">
                    <i class="fa fa-pencil"></i>
                </a>
                {{ Form::open(['method' => 'DELETE', 'route' => ['distributors.destroy', ''], 'data-confirm' => 'Ви впевнені, що хочете видалити?', 'style' => 'display:inline-block', 'data-td' => 'delete' ])}}
                {{ Form::button("<i class=\"fa fa-trash\"></i>", ['type' => 'submit', 'class' => 'btn btn-danger btn-sm']) }}
                {{ Form::close() }}
            </td>
        </tr>
    </template>
@endsection

@section('styles')
    {!! Html::style('css/global.css') !!}
@endsection

@section('scripts')
    {!! Html::script('js/admin/global.js') !!}
    {!! Html::script('js/admin/kasir.js') !!}
@stop


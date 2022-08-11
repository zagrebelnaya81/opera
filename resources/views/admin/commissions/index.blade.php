@extends('layouts.admin')

@section('content')
    <div class="df mb15">
        <h2 class="global__page-title">Управління комісійними зборами</h2>
        <div class="fsh">
          @can('commission-create')
            @if(count($commissions) < 2)
                <a class="btn btn-success"
                   href="{{ route('commissions.create') }}">Створити новий комісійний збір</a>
            @endif
          @endcan
        </div>
    </div>

    @include('admin.message')

    <table class="table table-bordered global__table">
        <tr>
            <th class="global__table-short">ID</th>
            <th>{{ __('admin.name') }}</th>
            <th>Розмір, %</th>
            <th class="global__table-short">{{ __('admin.action') }}</th>
        </tr>
        @foreach ($commissions as $key => $commission)
            <tr>
                <td class="global__table-short">{{ $commission->id }}</td>
                <td>{{ $commission->translate->title }}</td>
                <td>{{ $commission->size }}</td>
                <td class="global__table-short">
                    @can('commission-edit')
                        <a class="btn btn-primary" href="{{ route('commissions.edit',$commission->id) }}"><i
                                    class="fa fa-pencil"></i></a>
                    @endcan
                </td>
            </tr>
        @endforeach
    </table>

@endsection

@section('styles')
    {!! Html::style('css/global.css') !!}
@endsection

@section('scripts')
    {!! Html::script('js/admin/global.js') !!}
@stop

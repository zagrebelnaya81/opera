@extends('layouts.admin')

@section('content')
    <div class="df mb15">
        <h2 class="global__page-title">Управлння слайдером</h2>
        <div class="fsh">
            @can('slider-create')
                <a class="btn btn-success" href="{{ route('slider.create') }}">Створити слайд</a>
            @endcan
        </div>
    </div>


    @include('admin.message')

    <table class="table table-bordered global__table">
        <tr>
            <th class="global__table-short">ID</th>
            <th>{{ __('admin.title') }}</th>
            <th class="global__table-short">{{ __('admin.poster') }}</th>
            <th class="global__table-short">{{ __('admin.action') }}</th>
        </tr>
        @foreach ($slides as $slide)
            <tr>
                <td class="global__table-short">{{ $slide->id }}</td>
                <td>{{ $slide->translate->title }}</td>
                <td class="global__table-short"><img src="{{ $slide->getFirstMediaUrl('posters', 'thumb') }}"
                                                     alt="{{ $slide->translate->title }}"
                                                     class="global__table-preview"></td>
                <td class="global__table-short">
                    @can('slider-edit')
                        <a class="btn btn-primary" href="{{ route('slider.edit',$slide->id) }}"><i
                                    class="fa fa-pencil"></i></a>
                    @endcan
                    @can('slider-delete')
                        {{ Form::open(['method' => 'DELETE', 'route' => ['slider.destroy', $slide->id], 'data-confirm' => 'Are you sure you want to delete?', 'style' => 'display:inline-block' ])}}
                        {{ Form::button("<i class=\"fa fa-trash\"></i>", ['type' => 'submit', 'class' => 'btn btn-danger']) }}
                        {{ Form::close() }}
                    @endcan
                </td>
            </tr>
        @endforeach
    </table>

    {!! $slides->links() !!}

@endsection

@section('styles')
    {!! Html::style('css/global.css') !!}
@endsection

@section('scripts')
    {!! Html::script('js/admin/global.js') !!}
@stop

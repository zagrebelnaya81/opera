@extends('layouts.admin')
@section('content')

    <div class="df mb15">
        <h1 class="global__page-title">{{__('admin.editPerformance')}}</h1>
        <div class="fsh">
            <a class="btn btn-primary" href="{{ route('performance.index') }}">До списку виступів</a>
        </div>
    </div>

    @include('admin.message')

    @include('admin.errors')
    {{ Form::model($performance, [
        'route' => ['performance.update', $performance->id],
        'method' => 'PUT', 'id' => 'edit-performance',
        'files' => true
       ])
    }}
    <div>
        <div class="row">
            <select name="actors" id="actors[]"></select>
            <select name="actors" id="roles[]"></select>
            <button class="add_actor_roles">Добавить</button>
        </div>
    </div>


    {{ Form::submit(__('admin.update'), ['class' => 'btn btn-success']) }}

    <a class="btn btn-warning" href="{{ route('performance.index') }}">{{ __('admin.cancel') }}</a>
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

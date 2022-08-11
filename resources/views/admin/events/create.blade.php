@extends('layouts.admin')
@section('content')
    <div class="df mb15">
        <h1 class="global__page-title">{{__('admin.createNewPerformance')}}</h1>
    </div>

    @include('admin.errors')

    {{ Form::open(['url' => route('events.store', ['performance' => $performance->id]), 'files' => true, 'id' => 'create-event']) }}



    {{ Form::submit(__('admin.create'), ['class' => 'btn btn-success']) }}

    {{ Form::close() }}
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

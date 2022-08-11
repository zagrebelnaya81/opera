@extends('layouts.admin')

@section('content')
    <div class="df mb15">
        <h1 class="global__page-title">{{__('admin.report-view.h2')}}</h1>
    </div>

    <table class="table table-bordered global__table" id="report-templates">
        <thead>
            <tr>
                <td style="width: 100%">{{ __('admin.report-view.title') }}</td>
                <td>{{ __('admin.report-view.period') }}</td>
                <td>{{ __('admin.report-view.action') }}</td>
            </tr>
        </thead>
        <tbody>
        @forelse($templates as $template)
            <tr data-id="{{ $template->id }}">
                <td>{{ $template->title }}</td>
                <td>
                    <input name="from" class="reports-table__input" type="date">
                </td>
                <td>
                    <input name="to" class="reports-table__input" type="date">
                </td>
                <td>
                    <button type="button" class="btn btn-primary btn-form">{{ __('admin.report-view.form') }}</button>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="{{ count($fields) }}">{{ __('admin.reports-constructor.not-found') }}</td>
            </tr>
        @endforelse
        </tbody>
    </table>

@endsection

@section('styles')
    {!! Html::style('css/select2.min.css') !!}
    {!! Html::style('css/bootstrap-datetimepicker.css') !!}
    {!! Html::style('css/global.css') !!}
    {!! Html::style('plugins/notifications/jgrowl/jquery.jgrowl.min.css') !!}
    {!! Html::style('plugins/datepickers/daterangepicker/daterangepicker.css') !!}
@endsection

@section('scripts')
    {!! Html::script('js/plugins/mask.min.js') !!}
    {!! Html::script('js/plugins/moment.min.js') !!}
    {!! Html::script('js/plugins/select2.min.js') !!}
    {!! Html::script('js/plugins/bootstrap-datetimepicker.min.js') !!}
    {!! Html::script('plugins/templates/jquery.tmpl.min.js') !!}
    {!! Html::script('plugins/notifications/jgrowl/jquery.jgrowl.min.js') !!}
    {!! Html::script('js/admin/global.js') !!}
    {!! Html::script('plugins/datepickers/daterangepicker/daterangepicker.js') !!}
    <script>
        $(document).ready(() => {

            const format = 'YYYY-MM-DD';

            let drp = $('.date-range-picker').daterangepicker({}, function(){
                let tr = this.element.closest('tr');

                tr.data({
                    dateFrom: this.startDate.format(format),
                    dateTo: this.endDate.format(format)
                });
            });

            $('.btn-form').on('click', (e) => {
                const
                    target = $(e.currentTarget),
                    row = target.closest('tr'),
                    id = row.data('id'),
                    from = row.find('[name=from]').val(),
                    to = row.find('[name=to]').val();

                let route = '{{ route('admin.reports.view', [':id:']) }}',
                    dateFrom = moment(from).format(format),
                    dateTo = moment(to).format(format);

                route = route.replace(':id:', id).concat(`?from=${dateFrom}&to=${dateTo}`);

                window.location.href = route;
            });
        });
    </script>
@stop


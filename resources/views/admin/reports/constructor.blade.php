@extends('layouts.admin')

@section('content')
    <style>
        table{
            width: 3000px !important;
            max-width: 3000px !important;
        }
        table td.field{
            width: 150px;
        }
        table td{
            text-align: center;
            width: 120px;
        }
        table td.action{
            width: 0px !important;
        }
        input[type=checkbox], input[type=radio]{
            width: 18px;
            height: 18px;
        }
    </style>
    <div class="df mb15">
        <h1 class="global__page-title">{{__('admin.report-constructor.h2')}}</h1>
    </div>

    <div class="actions" style="margin: 10px 0">
        <button class="btn btn-primary" id="add-row">
            <i class="fa fa-plus"></i>
        </button>
    </div>

    <table class="table table-bordered global__table" id="report-templates">
        <thead>
        <tr>
            <td style="width: 0px"></td>
            @foreach($fields as $field)
                <td>{{ __('admin.report-constructor.fields.' . $field) }}</td>
            @endforeach
        </tr>
        </thead>
        @forelse($templates as $template)
            <tr data-id="{{ $template->id }}">
                <td style="width: 50px">
                    <button class="btn btn-danger btn-delete">
                        <i class="fa fa-trash"></i>
                    </button>
                    <button class="btn btn-success btn-save">
                        <i class="fa fa-save"></i>
                    </button>
                </td>
                @foreach($fields as $field)
                    <td class="field" data-field-name="{{ $field }}">
                        @if($field === 'title')
                            <input name="{{ $field }}" type="text" value="{{ $template[$field] }}">
                        @else
                            <input name="{{ $field }}" type="checkbox" value="{{ $template[$field] }}" {{ (int) $template[$field] ? 'checked': '' }}>
                        @endif
                    </td>
                @endforeach
            </tr>
        @empty
            <tr>
                <td colspan="{{ count($fields) }}">{{ __('admin.reports-constructor.not-found') }}</td>
            </tr>
        @endforelse
    </table>
    <script id="row-template" type="text/x-handlebars-template">
        <tr>
            <td style="width: 50px">
                <button class="btn btn-danger btn-delete">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btn btn-success btn-save">
                    <i class="fa fa-save"></i>
                </button>
            </td>
            @{{each(i, field) fields}}
            <td class="field" data-field-name="${field}">
                @{{if field == 'title'}}
                <input type="text" name="title">
                @{{else}}
                <input type="checkbox" name="${field}" value="0">
                @{{/if}}
            </td>
            @{{/each}}
        </tr>
    </script>
@endsection

@section('styles')
    {!! Html::style('css/select2.min.css') !!}
    {!! Html::style('css/bootstrap-datetimepicker.css') !!}
    {!! Html::style('css/global.css') !!}
    {!! Html::style('plugins/notifications/jgrowl/jquery.jgrowl.min.css') !!}
@endsection

@section('scripts')
    {!! Html::script('js/plugins/mask.min.js') !!}
    {!! Html::script('js/plugins/moment.min.js') !!}
    {!! Html::script('js/plugins/select2.min.js') !!}
    {!! Html::script('js/plugins/bootstrap-datetimepicker.min.js') !!}
    {!! Html::script('plugins/templates/jquery.tmpl.min.js') !!}
    {!! Html::script('plugins/notifications/jgrowl/jquery.jgrowl.min.js') !!}
    {!! Html::script('js/admin/global.js') !!}
    <script>
        $(document).ready(() => {

            const storeRoute = '{{ route('report-constructor.store') }}';
            const updateRoute = '{{ route('report-constructor.update', ':id:') }}';
            const deleteRoute = '{{ route('report-constructor.update', ':id:') }}';

            const fields = @json($fields, JSON_PRETTY_PRINT);

            function request(url, method, data, callback){
                $.ajax({
                    type: method.toUpperCase(),
                    url: url,
                    data: {
                        ...data,
                        '_method': method,
                        'csrf': '{{ csrf_token() }}'
                    }
                }).done(callback).fail(callback);
            }

            function store(data){
                request(storeRoute, 'POST');
            }

            function update(data, id){
                request(updateRoute, 'PUT');
            }

            function addRow(){
                $.template('row-template', $('#row-template').html());

                let row = $.tmpl(
                    'row-template',
                    {
                        fields: fields
                    },
                    {
                        isTitle(){
                            return this === 'title';
                        },
                        isChecked(){
                            return this !== 0 ? 'checked': '';
                        }
                    }
                );

                let btnDelete = row.find('.btn-delete');
                let btnSave = row.find('.btn-save');

                btnDelete.on('click', deleteRow);
                btnSave.on('click', saveRow);

                row.appendTo('#report-templates');
            }

            function deleteRow(e){
                let button = e.currentTarget,
                    tr = $(button).closest('tr'),
                    id = tr.data('id');

                if( ! confirm('{{ __('delete template?') }}'))
                    return false;

                if(id){
                    request(deleteRoute.replace(':id:', id), 'delete', null, () => {
                        tr.remove();
                        $.jGrowl("{{ __('successfully removed!') }}", {
                            theme: 'green'
                        });
                    });
                }else{
                    tr.remove();
                }
            }

            function saveRow(e){
                let button = $(e.currentTarget),
                    tr = button.closest('tr'),
                    id = tr.data('id');

                button.val(button.is(':checked') ? 1 : 0);

                let inputs = tr.find('input'),
                    data = {};

                $.map(inputs, function(input, i){
                    data[$(input).attr('name')] = $(input).val();
                });

                tr.find('#btn-save').prop('disabled', true);

                if(id){
                    request(updateRoute.replace(':id:', id), 'PUT', data, (data) => {
                        tr.find('#btn-save').prop('disabled', false);
                        $.jGrowl("{{ __('successfully saved!') }}", {
                            theme: 'green'
                        });
                    });
                }else{
                    request(storeRoute.replace(':id:', id), 'POST', data, (data) => {
                      console.log(data);
                        tr.attr('data-id', data.data.id);
                        tr.find('#btn-save').prop('disabled', false);
                        $.jGrowl("{{ __('successfully saved!') }}", {
                            theme: 'green'
                        });
                    });
                }
            }

            $(document).on('click', '#report-templates [type=checkbox]', function(){
                $(this).val($(this).is(':checked') ? 1 : 0);
            });

            $('.btn-delete').on('click', deleteRow);
            $('.btn-save').on('click', saveRow);
            $('#add-row').on('click', addRow);

        });
    </script>
@stop


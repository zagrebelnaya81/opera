@extends('layouts.admin')

@section('content')
    <style>
        table{
        }
        table td.field{
            min-width: 150px;
        }
        table td{
            text-align: center;
            width: 120px;
        }
        table td.event{
            text-align: left;
            min-width: 200px;
        }
        table td.id{
            width: 10px;
        }
    </style>

    <div class="df mb15">
        <h1 class="global__page-title">{{ __('admin.reports.h2') }}</h1>
    </div>

    @include('admin.message')

    <div class="actions" style="padding: 10px 0px">
        <button class="btn btn-primary" id="export">Export to csv</button>
        <button class="btn btn-primary" id="print">View to print</button>
    </div>

    <table class="table table-bordered global__table" id="report-table">
        <thead>
            <tr>
                <td class="id">id</td>
                @foreach($fields as $field => $value)
                    <td>{{ __('admin.report-constructor.fields.' . $field) }}</td>
                @endforeach
            </tr>
        </thead>
        <tbody>
            @foreach($reports as $report)
                <tr>
                    <td class="id">{{ $report->id }}</td>
                    @foreach($fields as $field => $value)
                        @if($field === 'reservation')
                            <td>{{ __('admin.reports.' . $report->$field) }}</td>
                        @else
                            <td>{{ $report->$field }}</td>
                        @endif
                    @endforeach
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection

@section('styles')
    {!! Html::style('css/global.css') !!}
@endsection

@section('scripts')
  {!! Html::script('plugins/table2csv.js') !!}
  {!! Html::script('js/admin/global.js') !!}
  <script>
    $(document).ready(() => {
		$('#export').on('click', () => {
			TableToExcel.convert(document.getElementById("report-table"));
		});

		function print(element) {
			let css = window.getComputedStyle(element, null).cssText;
			let style = document.createElement('style');
			let a = window.open('', '', 'height=600, width=600');

			style.innerText = css;
			a.document.write('<html><body>' + style.outerHTML);
			a.document.write(element.outerHTML);
			a.document.write('</body></html>');
			a.document.close();
			a.print();
			//a.close();
		}

		$('#print').on('click', () => {
			print(document.getElementById('report-table'));
		});

    });
  </script>
@endsection

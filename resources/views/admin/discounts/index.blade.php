@extends('layouts.admin')

@section('content')
  <div class="df mb15">
    <h2 class="global__page-title">Знижки</h2>
    <div class="fsh">
      @can('discount-create')
        <a class="btn btn-success btn-create" href="{{ route('discounts.create') }}">{{ __('admin.create') }}</a>
      @endcan
    </div>
  </div>

  @include('admin.message')

  <table class="table table-bordered global__table" id="price-table">
    <thead>
    <tr>
      <th class="global__table-short">ID</th>
      <th>Назва</th>
      <th>Розмір, %</th>
      <th>Активовано?</th>
      <th class="global__table-short">Дія</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($discounts as $key => $discount)
      <tr>
        <td class="global__table-short">{{ $discount->id }}</td>
        <td>{{ $discount->name }}</td>
        <td>{{ $discount->size }}</td>
        <td style="text-align: center"><i class="fa {{ $discount->is_active ? 'fa-check' : 'fa-times' }}"
                                          style="color: {{ $discount->is_active ? '#449d44' : '#af0007' }}"></i></td>
        <td class="global__table-short">
          @can('discount-edit')
            <a class="btn btn-primary btn-sm" href="{{ route('discounts.edit', $discount->id) }}"
               data-td="edit"><i
                class="fa fa-pencil"></i></a>
          @endcan
          @can('discount-delete')
            {{ Form::open(['method' => 'DELETE', 'route' => ['discounts.destroy', $discount->id], 'data-confirm' => 'Ви впевнені, що хочете видалити?', 'style' => 'display:inline-block', 'data-td' => 'delete' ])}}
            {{ Form::button("<i class=\"fa fa-trash\"></i>", ['type' => 'submit', 'class' => 'btn btn-danger btn-sm']) }}
            {{ Form::close() }}
          @endcan
        </td>
      </tr>
    @endforeach
    </tbody>
  </table>

  {!! $discounts->links() !!}
@endsection

@section('modal')

@endsection

@section('styles')
  {!! Html::style('css/global.css') !!}
@endsection

@section('scripts')
  {!! Html::script('js/admin/global.js') !!}
@stop


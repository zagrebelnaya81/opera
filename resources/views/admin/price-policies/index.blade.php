@extends('layouts.admin')

@section('content')
  <div class="df mb15">
    <h2 class="global__page-title">Цінові політики</h2>
    <div class="fsh">
      @can('price-policy-create')
        <a class="btn btn-success btn-create" href="{{ route('price-policies.create') }}">{{ __('admin.create') }}</a>
      @endcan
    </div>
  </div>

  @include('admin.message')

  <table class="table table-bordered global__table" id="price-table">
    <thead>
    <tr>
      <th class="global__table-short">ID</th>
      <th>Назва</th>
      <th>Розмір, .грн</th>
      <th>Колір</th>
      <th class="global__table-short">Дія</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($pricePolicies as $key => $pricePolicy)
      <tr>
        <td class="global__table-short">{{ $pricePolicy->id }}</td>
        <td>{{ $pricePolicy->name }}</td>
        <td>{{ $pricePolicy->size }}</td>
        <td style="background-color: {{ $pricePolicy->color_code }}"></td>
        <td class="global__table-short">
          @can('price-policy-edit')
            <a class="btn btn-primary btn-sm" href="{{ route('price-policies.edit', $pricePolicy->id) }}"
               data-td="edit"><i
                class="fa fa-pencil"></i></a>
          @endcan
          @can('price-policy-delete')
            {{ Form::open(['method' => 'DELETE', 'route' => ['price-policies.destroy', $pricePolicy->id], 'data-confirm' => 'Ви впевнені, що хочете видалити?', 'style' => 'display:inline-block', 'data-td' => 'delete' ])}}
            {{ Form::button("<i class=\"fa fa-trash\"></i>", ['type' => 'submit', 'class' => 'btn btn-danger btn-sm']) }}
            {{ Form::close() }}
          @endcan
        </td>
      </tr>
    @endforeach
    </tbody>
  </table>

  {!! $pricePolicies->links() !!}
@endsection

@section('modal')

@endsection

@section('styles')
  {!! Html::style('css/global.css') !!}
@endsection

@section('scripts')
  {!! Html::script('js/admin/global.js') !!}
@stop


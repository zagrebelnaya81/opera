@extends('layouts.admin')
@section('content')
    <div class="df mb15">
        <h2 class="global__page-title">{{ __('admin.performancesManagement') }}</h2>
        <div class="fsh">
            @can('performance-type-list')
                <a class="btn btn-primary"
                   href="{{ route('performance-types.index') }}">{{ __('admin.performanceTypes') }}</a>
            @endcan
            @can('performance-create')
                <a href="{{url('/admin/performance/create')}}" class="btn btn-success">{{__('admin.create')}}</a>
            @endcan
        </div>
    </div>

    @include('admin.message')

    <!-- search form -->
    <div>
      <form action="{{ route('performance.index') }}" method="get" autocomplete="off">
        <div class="input-group">
          <input id="search" name="query" type="text" class="form-control" placeholder="Знайти...." style="color: whitesmoke; background-color:#20262a; border: none;">
          <div id="autocomplete-search-result-wrapper" style="display: none"></div>
          <span class="input-group-btn">
            <button type="submit" value="" class="btn btn-flat" style="background-color: #ebeff4;"><i class="fa fa-search"></i></button>
          </span>
        </div>
      </form>
    </div>
    <br>
    <!-- /.search form -->

    <table class="table table-bordered global__table">
        <thead>
        <tr>
            <td class="global__table-short">ID</td>
            <td class="global__table-short">{{ __('admin.poster') }}</td>
            <td>{{__('performance.title')}}</td>
            <td class="col-md-5">{{__('performance.descriptions')}}</td>
            <td>{{__('performance.date')}}</td>
            <td class="global__table-short">{{__('performance.price')}}</td>
            <td class="global__table-short">{{__('performance.duration')}}</td>
            <td class="global__table-short">Публіковано?</td>
            <td class="global__table-short">{{ __('admin.action') }}</td>
        </tr>
        </thead>
        <tbody>
        @foreach($performances as $performance)
            <tr>
                <td class="global__table-short">{{ $performance->id }}</td>
                <td class="global__table-short"><img
                            src="{{ $performance->getFirstMediaUrl('posters', 'thumb') != null ? $performance->getFirstMediaUrl('posters', 'thumb') : config('dummy-images.performance.thumb') }}"
                            alt="{{ $performance->translate->title }}"
                            class="global__table-preview"></td>
                <td>
                    @if($performance->is_published)
                        <a href="{{ route('front.events.show', ['id' => $performance->id, 'slug' => $performance->translate->slug]) }}">{{ $performance->translate->title }}</a>
                    @else
                        {{ $performance->translate->title }}
                    @endif
                </td>
                <td>{!! $performance->shortDescription() !!}</td>
                <td>{{ $performance->period() }}</td>
                <td class="global__table-short">{{ $performance->price }}</td>
                <td class="global__table-short">{{ $performance->duration }}</td>
                <td class="global__table-short"><i
                            class="fa {{ $performance->is_published ? 'fa-check' : 'fa-times' }}"
                            style="color: {{ $performance->is_published ? '#449d44' : '#af0007' }}"></i>
                </td>
                <td class="global__table-short">
                    @can('performance-actor-role-edit')
                        <a class="btn btn-small btn-warning"
                           href="{{ route('performance-roles.edit', ['id' => $performance->id]) }}">{{ __('admin.roles') }}</a>
                    @endcan
                    <hr>
                    @can('event-manage')
                        <a class="btn btn-info" href="{{ route('performance.show', $performance->id) }}"><i
                                    class="fa fa-cog"></i></a>
                    @endcan
                    @can('performance-edit')
                        <a class="btn btn-primary" href="{{ url("/admin/performance/{$performance->id}/edit") }}"><i
                                    class="fa fa-pencil"></i></a>
                    @endcan
                    @can('performance-delete')
                        {{ Form::open([
                            'url' => '/admin/performance/' . $performance->id,
                            'data-confirm' => 'Are you sure you want to delete?',
                            'style' => 'display:inline-block'
                          ])
                        }}
                        {{ Form::hidden('_method', 'DELETE') }}
                        {{ Form::button("<i class=\"fa fa-trash\"></i>", [
                          'type' => 'submit',
                          'class' => 'btn btn-danger',
                          'data-confirm' => 'Are you sure you want to delete?'
                        ]) }}
                        {{ Form::close() }}
                    @endcan
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>
    {!! $performances->links() !!}
@endsection

@section('styles')
    {!! Html::style('css/global.css') !!}
@endsection

@section('scripts')
    {!! Html::script('js/admin/global.js') !!}

    <script type="text/javascript">
      var route = "{{ route('admin.performance.search') }}";

      $('#search').on('keyup', function() {
        $.get(route, {query: $(this).val()})
          .done((data) => {
            if (!data.length) {
              return;
            }

            let html = '<ul id="autocomplete-search-result" class="dropdown-menu">';

            for (let i = 0; i < data.length; i++) {
              html += `<li><a class="dropdown-item" href="{{ route('performance.index') }}?id=${data[i].id}">${data[i].title}</a></li>`;
            }

            html += '</ul>';

            $('#autocomplete-search-result-wrapper').html(html);
            $('#autocomplete-search-result').show();
            $('#autocomplete-search-result-wrapper').show();
          });
      });

    </script>
@stop

@extends('layouts.admin')
@section('content')
    <div class="df mb15">
        <h2 class="global__page-title">{{ __('admin.actorsList') }}</h2>
        <div class="fsh">
            @can('actor-group-list')
                <a class="btn btn-primary" href="{{ route('actor_groups.index') }}">{{ __('admin.actorGroups') }}</a>
            @endcan
            @can('actor-role-list')
                <a class="btn btn-primary" href="{{ route('actor-roles.index') }}">{{ __('admin.actorRoles') }}</a>
            @endcan
            @can('actor-create')
                <a href="{{URL::to('admin/actor/create/')}}"
                   class="btn btn-success btn-create">{{__('admin.createActor')}}</a>
            @endcan
        </div>
    </div>

    <!-- search form -->
    <div>
      <form action="{{ route('actor.index') }}" method="get" autocomplete="off">
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
            <th class="global__table-short">ID</th>
            <th>{{ __('admin.poster') }}</th>
            <th>{{ __('admin.name_people') }}</th>
            <th>{{ __('admin.description') }}</th>
            <th>{{ __('admin.cat') }}</th>
            <th class="global__table-short">{{ __('admin.action') }}</th>
        </tr>
        </thead>
        <tbody>
        @foreach($actors as $actor)
            <tr>
                <td class="global__table-short">{{$actor->id}}</td>
                <td>
                    <img src="{{ $actor->getFirstMediaUrl('posters', 'thumb') != null ? $actor->getFirstMediaUrl('posters', 'thumb') : config('dummy-images.actor.thumb') }}"
                         alt="{{ $actor->translate->fullName }}" width="150" href="150">
                </td>
                <td>{{ $actor->translate->fullName }}</td>
                <td>{{str_limit($actor->translate->descriptions, 100)}}</td>
                <td>{{ $actor->group->translate->title }}</td>
                <td class="global__table-short">
                    @can('actor-edit')
                        <a class="btn btn-primary " href="{{ URL::to('admin/actor/' . $actor->id . '/edit') }}"><i
                                    class="fa fa-pencil"></i></a>
                    @endcan
                    @can('actor-delete')
                        {{ Form::open(array('url' => 'admin/actor/' . $actor->id, 'data-confirm' => 'Are you sure you want to delete?', 'style' => 'display:inline-block' )) }}
                        {{ Form::hidden('_method', 'DELETE') }}
                        <button type="submit" class="btn btn-danger" href="{{ route('actor.destroy', $actor->id) }}">
                            <i class="fa fa-trash"></i>
                        </button>
                        {{ Form::close() }}
                    @endcan
                </td>
            </tr>
        @endforeach
        </tbody>
    </table>

    {{ $actors->links() }}

@endsection
@section('styles')
    {!! Html::style('css/global.css') !!}
    {{--    {!! Html::style('css/bootstrap.min.css') !!}--}}
@endsection
@section('scripts')
    {!! Html::script('js/admin/actor.js') !!}
    {!! Html::script('js/admin/global.js') !!}

    <script type="text/javascript">
      var route = "{{ route('admin.actor.search') }}";

      $('#search').on('keyup', function() {
        $.get(route, {query: $(this).val()})
          .done((data) => {
            if (!data.length) {
              return;
            }

            let html = '<ul id="autocomplete-search-result" class="dropdown-menu">';

            for (let i = 0; i < data.length; i++) {
              html += `<li><a class="dropdown-item" href="{{ route('actor.index') }}?id=${data[i].id}">${data[i].fullName}</a></li>`;
            }

            html += '</ul>';

            $('#autocomplete-search-result-wrapper').html(html);
            $('#autocomplete-search-result').show();
            $('#autocomplete-search-result-wrapper').show();
          });
      });

    </script>
@stop

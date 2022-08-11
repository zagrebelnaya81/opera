@extends('layouts.admin')

@section('content')
    <div class="df mb15">
        <h2 class="global__page-title">{{ __('admin.albumsManagement') }}</h2>
        <div class="fsh">
            @can('season-list')
                <a class="btn btn-primary" href="{{ route('seasons.index') }}">{{ __('admin.seasons') }}</a>
            @endcan
            @can('album-category-list')
                <a class="btn btn-primary"
                   href="{{ route('album-categories.index') }}">{{ __('admin.albumCategories') }}</a>
            @endcan
            @can('album-create')
                <a class="btn btn-success" href="{{ route('albums.create') }}">{{ __('admin.createNewAlbum') }}</a>
            @endcan
        </div>
    </div>

    @include('admin.message')

    <!-- search form -->
    <div>
      <form action="{{ route('albums.index') }}" method="get" autocomplete="off">
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
        <tr>
            <th class="global__table-short">ID</th>
            <th>{{ __('admin.name') }}</th>
            <th class="global__table-short">{{ __('admin.poster') }}</th>
            <th class="global__table-short">{{ __('admin.action') }}</th>
        </tr>
        @foreach ($albums as $key => $album)
            <tr>
                <td class="global__table-short">{{ $album->id }}</td>
                <td>{{ $album->translate->title }}</td>
                <td class="global__table-short"><img src="{{ $album->getFirstMediaUrl('posters', 'thumb') }}"
                                                     alt="{{ $album->translate->title }}" class="global__table-preview">
                </td>
                <td class="global__table-short">
                    @can('album-edit')
                        <a class="btn btn-primary" href="{{ route('albums.edit',$album->id) }}"><i
                                    class="fa fa-pencil"></i></a>
                    @endcan
                    @can('album-delete')
                        {{ Form::open(['method' => 'DELETE', 'route' => ['albums.destroy', $album->id], 'data-confirm' => 'Are you sure you want to delete?', 'style' => 'display:inline-block' ])}}
                        {{ Form::button("<i class=\"fa fa-trash\"></i>", ['type' => 'submit', 'class' => 'btn btn-danger']) }}
                        {{ Form::close() }}
                    @endcan
                </td>
            </tr>
        @endforeach
    </table>

    {!! $albums->links() !!}

@endsection

@section('styles')
    {!! Html::style('css/global.css') !!}
@endsection

@section('scripts')
    {!! Html::script('js/admin/global.js') !!}

    <script type="text/javascript">
      var route = "{{ route('admin.albums.search') }}";

      $('#search').on('keyup', function() {
        $.get(route, {query: $(this).val()})
          .done((data) => {
            if (!data.length) {
              return;
            }

            let html = '<ul id="autocomplete-search-result" class="dropdown-menu">';

            for (let i = 0; i < data.length; i++) {
              html += `<li><a class="dropdown-item" href="{{ route('albums.index') }}?id=${data[i].id}">${data[i].title}</a></li>`;
            }

            html += '</ul>';

            $('#autocomplete-search-result-wrapper').html(html);
            $('#autocomplete-search-result').show();
            $('#autocomplete-search-result-wrapper').show();
          });
      });

    </script>

@stop

<!doctype html>
<html lang="{{ session('locale') }}" class="no-js">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  {!! SEO::generate() !!}
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  <!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css"> -->
  <!-- <script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.1/xlsx.core.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>
  <script src="https://unpkg.com/tableexport@5.2.0/dist/js/tableexport.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/tableexport@5.2.0/dist/css/tableexport.min.css">
  <link rel="stylesheet" href="/design/css/reports.css">
  @include('pages.global._blocks.head.head')
</head>
<body>
  <input type="hidden" id="cash-box-id" value="{{ \Auth::user()->id }}">
  <input type="hidden" id="cash-box-fullname" value="{{ \Auth::user()->lastName }} {{ \Auth::user()->firstName }}">
  {{ csrf_field() }}
  <div id="app"></div>

  <script src="/design/js/reports.js"></script>
</body>
</html>

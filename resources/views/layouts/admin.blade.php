<!doctype html>
<html lang="ua">
<head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/admin.css">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"> -->
    <!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="/fonts/font-awesome.min.css">

    @yield('styles')
</head>
<body>
<button type="button" class="burger" data-active data-menu-btn="">
  Menu
  <span class="burger__toggle-line burger__toggle-line--1"></span>
  <span class="burger__toggle-line burger__toggle-line--2"></span>
  <span class="burger__toggle-line burger__toggle-line--3"></span>
</button>
<div class="nav-side-menu">
    <div class="brand">CXID Opera</div>
    <i class="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
    @include('layouts.components.admin-menu')
</div>
<div class="content">
    @if(session('success'))
        <div class="alert alert-success" role="alert">{{ session('success') }}</div>
    @endif
    <div class="container-fluid" style="height: 100%;">@yield('content')</div>
</div>

@yield('modal')

<script src="/js/plugins/jquery-3.2.1.min.js"></script>
<script src="/js/libs/bootstrap.min.js"></script>
@yield('scripts')
<script src="/js/admin/disabled-btn.js"></script>
<script>
  //toggle menu
  (function (){
    var burger = document.querySelector('[data-menu-btn]');
    burger.addEventListener('click', function(e){
      if (window.innerWidth > 767) burger.toggleAttribute('data-active');
    });
  })();
</script>
</body>
</html>

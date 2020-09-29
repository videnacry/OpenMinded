@extends('master')

@include('wall.post')
@include('wall.header')
@include('wall.publication')

@section('style')
    <!-- Post css -->
    @yield('post-style')

    <!-- Header css -->
    @yield('header-style')

    <!-- Publication css -->
    @yield('publication-style')

    <!-- Wall css -->
    <style>
        body{background-image:url("{{asset('img/blackSpace.jpg')}}");}
    </style>
@endsection

@section('content')
    @yield('header-content')
    <div id="close-modal" class="w-screen h-screen absolute hidden inset-0 z-10">
    </div>
    <div id="publications"></div>
    @yield('post-content')
    @yield('publication-content')
@endsection

@section('content-script')
    <script src="{{asset('js/publicWall.js')}}" defer></script>
@endsection
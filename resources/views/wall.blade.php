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
    @yield('post-content')
    @yield('publication-content')
@endsection
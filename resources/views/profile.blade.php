@extends('master')

@include('user.header')
@include('user.summery')
@include('wall.publication')
@include('wall.post')

@section('style')
    <style>
        body{
            background-image:url("{{asset('img/blackSun.jpg')}}"); 
        }
    </style>
    <!-- Summery styles -->
    @yield('summery-style')
    <!-- Publication styles -->
    @yield('publication-style')
    <!-- Post styles -->
    @yield('post-style')
@endsection

@section('content')
    <div id="close-modal" class="w-screen h-screen absolute hidden inset-0 z-10">
    </div>
    @yield('header-content')
    @yield('summery-content')
    @yield('publication-content')
    @yield('post-content')
@endsection

@section('content-script')
    <script src="{{asset('js/profileWall.js')}}" defer></script>
@endsection
@extends('master')

@include('user.header')
@include('user.summery')
@include('wall.publication')

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
@endsection

@section('content')
        @yield('header-content')
        @yield('summery-content')
        @yield('publication-content')
@endsection
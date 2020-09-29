<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:400,600,700" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">

        <!--Specific stylesheet-->
        @yield('style')

        <style>
            .shadow-outer{box-shadow: 0 0 3px 3px gray;}
            .shadow-red{box-shadow: 0 0 3px 3px red;}
            .shadow-yellow{box-shadow: 0 0 3px 3px yellow;}
            .shadow-blue{box-shadow: 0 0 3px 3px blue;}
            .shadow-green{box-shadow: 0 0 3px 3px green;}
            .shadow-black{box-shadow: 0 0 6px 12px black;}
            .shadow-inner{box-shadow: inset 0 0 3px 3px gray;}}
            button *{text-shadow: 1px 1px green;}
            .profile-icon{width:3.5vw; height:3.5vw;}
            .found>*{z-index:20;}
        </style>
    </head>
    <body class="font-sans antialiased bg-fixed bg-cover">
    
        @yield('content')
        <script src="{{asset('js/app.js')}}"></script>
        @yield('content-script')
    </body>
</html>

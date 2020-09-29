@section('summery-style')
<style>
    body{
        overflow-x: hidden;
    }
    .traveler{
        animation: flow 10s infinite ;
        animation-timing-function: linear;
    }
    .delay-2{
        animation-delay: 3s;
    }
    .delay-3{
        animation-delay: 6s;
    }
    @keyframes flow{

        0%{transform:  translate(400%); color:rgb(234, 240, 149)}
        20%{transform:  rotate(72deg) translate(300%); color:rgb(149, 214, 240)}
        40%{transform:  rotate(144deg) translate(300%); color:rgb(157, 240, 149)}
        60%{transform:  rotate(216deg) translate(200%); color:rgb(240, 149, 213)}
        80%{transform:  rotate(298deg) translate(200%); color:rgb(240, 149, 213)}
        100%{transform: rotate(360deg) translate(400%); color:rgb(151, 131, 241)}
        
    }
</style>
@endsection

@section('summery-content')
    <div id="close-modal" class="w-screen h-screen absolute hidden inset-0 z-10">
    </div>
    <section class="h-screen">
            <!-- <img class="traveler shadow-lg absolute inset-y-9/12 inset-x-4/12 rounded-full border-solid border-2 border-gray-100" width="100px" src="{{asset('img/god1.jpg')}}">
            <img class="traveler shadow-lg absolute inset-y-2/12 inset-x-6/12  rounded-full border-solid border-2 border-gray-100" width="100px" src="{{asset('img/LionDark.gif')}}">
            <img class="traveler shadow-lg absolute inset-y-6/12 inset-x-10/12 rounded-full border-solid border-2 border-gray-100" width="100px" src="{{asset('img/DEMON.png')}}"> -->
            <img class="h-24 traveler shadow-lg absolute inset-y-5/12 inset-x-6/12 rounded-full border-solid border-2 border-gray-100 shadow-yellow" width="100px" src="{{asset('img/god1.jpg')}}">
            <img class="h-24 delay-2 traveler shadow-lg absolute inset-y-5/12 inset-x-6/12  rounded-full border-solid border-2 border-gray-100 shadow-red" width="100px" src="{{asset('img/LionDark.gif')}}">
            <img class="h-24 delay-3 traveler shadow-lg absolute inset-y-5/12 inset-x-6/12 rounded-full border-solid border-2 border-gray-100 shadow-blue" width="100px" src="{{asset('img/DEMON.png')}}">
            
            <img class="shadow-lg absolute inset-x-6/12 inset-y-5/12 rounded-full border-solid border-2 border-gray-100 shadow-black" width="150px" src="{{asset('img/GranadaCat.jpg')}}">
    </section>
    <section>
        <nav class="h-screen flex flex-col justify-center absolute inset-0 w-28">
            <button class="shadow-inner flex justify-center h-10 m-3">
                <img class="h-full" src="{{asset('img/arrow.png')}}">
                <span class="text-black-800 absolute mt-2">Description</span>
            </button>
            <button class="shadow-inner flex justify-center h-10 m-3">
                <img class="h-full" src="{{asset('img/arrow.png')}}">
                <span class="text-black-800 absolute mt-2">Upgrade</span>
            </button>
        </nav>
    </section>
@endsection
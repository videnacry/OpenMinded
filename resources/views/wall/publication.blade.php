@section('publication-style')
@endsection

@section('publication-content')
<div id="publications">
    <div class="proto-post">
        <button class="proto-icon flex">
            <img class="shadow-inner rounded-full profile-icon m-auto" src="{{asset('img/GranadaCat.jpg')}}">
            <div class="text-blue-400">
                <h1 class="w-2/12">Videnacry</h1>
                <p>Would the emotion give you thinks ?</p>
            </div>
        </button>
        <article class="rounded-sm bg-red-300 w-2/12 p-2 relative">
            <img class="shadow-outer" src="{{asset('img/DoubleOdalis.png')}}">
            <span class="left-3 bottom-3 absolute text-6x1 font-bold text-red-300"></span>
        </article>
    </div>
</div>
@endsection
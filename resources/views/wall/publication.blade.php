@section('publication-style')
@endsection

@section('publication-content')
    <button class="flex">
        <img class="shadow-inner rounded-full w-10 h-10" src="{{asset('img/GranadaCat.jpg')}}">
        <div class="text-blue-400">
            <h1 class="w-2/12">Videnacry</h1>
            <p>Would the emotion give you thinks ?</p>
        </div>
    </button>
    <article class="rounded-sm bg-red-300 w-2/12 p-2">
        <img class="shadow-outer" src="{{asset('img/DoubleOdalis.png')}}">
    </article>
@endsection
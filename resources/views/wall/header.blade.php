@section('header-style')
@endsection

@section('header-content')
    <div class="h-32"></div>
    <nav id="searcher" class="found flex flex-wrap justify-end right-0 top-0 pl-20 py-5 fixed w-7/12">
        <input class="my-5 h-6 rounded-full text-xs border-solid border-2 border-gray-400 p-1 w-48 flex flex-col bg-gray-100 placeholder-gray-500" placeholder="What are you looking for ?">
        <button class="my-5 h-6 mr-10 ml-3 bg-pink-200 rounded-md border-blue-200 border-solid border-2 px-2">Search</button>
        <div class="px-20 py-5"></div>
    </nav>
@endsection
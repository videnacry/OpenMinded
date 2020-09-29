@section('header-style')
@endsection

@section('header-content')
    <nav class="flex justify-between h-16 px-20 py-4">
        <div id="searcher" class="flex flex-wrap h-30">
            <input class="my-1 rounded-full text-xs border-solid border-2 border-gray-400 p-1 w-48 flex flex-col bg-gray-100 placeholder-gray-500" placeholder="Specific publication ?">
            <button class="shadow-outer my-1 ml-3 bg-pink-300 rounded-md border-blue-200 border-solid border-2 px-2">Search</button>
            <div class="found"></div>
        </div>
        <div class="flex justify-end">
            <button class="inline h-full mr-3 relative">
                <img width="40px" src="{{asset('img/heart.png')}}"/>
                <span class="text-gray-200 absolute top-1 left-0">Likes</span>
            </button>
            <button class="inline h-full mr-3 relative">
                <img width="50px" src="{{asset('img/friends.png')}}"/>
                <span class="text-gray-200 absolute top-2 left-0">Friends</span>
            </button>
            <button id="newPost" class="shadow-outer my-1 mr-10 bg-orange-300 rounded-md border-gray-200 border-solid border-2 px-2">Post</button>
        </div>
    </nav>
@endsection
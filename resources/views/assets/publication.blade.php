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
<div id="comment-modal" class="hidden z-20 translate-t-l top-1/2 left-1/2 fixed bg-cover bg-center">
    <div class="w-full h-64 border-2 border-solid border-black-500 shadow-inner overflow-y-auto">
        <p id="close-comment" class="text-red-800 shadow-negro text-2xl text-right pr-3">
            x
        </p>
        <p class="proto-comment bg-pink-100 rounded-full border-gray-600 border-2 border-solid shadow-inner m-2 py-1 px-2 text-xs">
            <b class="text-orange-500">Author&nbsp;-&gt;&nbsp;</b>
            <span>Comment example</span>
        </p>
        <div id="comments">
        </div>
    </div>
    <input id="post-content" class="my-5 h-6 ml-3 rounded-full text-xs border-solid border-2 border-gray-400 p-1 w-48 flex flex-col bg-gray-100 placeholder-gray-500" placeholder="What do you think about it ?">
    <button id="send-comment" class="my-5 h-6 ml-3 bg-blue-300 shadow-outer rounded-md border-blue-200 border-solid border-2 px-2">Comment</button>
</div>
@endsection
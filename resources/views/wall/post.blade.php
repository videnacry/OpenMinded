@section('post-style')
<style>
    *:focus{outline:none !important;}
    input[type=file]{visibility:hidden;height:0px;width:0px;}
    .post{background-image:url("{{asset('img/deepOcean.jpg')}}")}
    body>div{height:fit-content;}
</style>
@endsection
@section('post-content')
<div class="flex min-h-screen justify-center flex-col antialized text-gray-300 absolute w-screen inset-0 hidden">
    <div class="flex justify-center">
        <article class="post w-1/2 bg-fixed bg-cover px-20">
            <header class="flex justify-between p-5">
                <div></div>
                <h1 class="text-center text-3xl ">Post factory :D</h1>
                <button class="text-3xl">x</button>
            </header>
            <hr>
            <form method="post" action="{{url('insert_post')}}" class="p-5 text-gray-400">
                @CSRF
                    <label for="post-text" class="rounded-sm border-solid border-2 border-gray-400 p-2 flex flex-col bg-gray-100">
                        <span class="">What is your idea ? We encourage you to explain it !</span>
                        <textarea type="text" id="post-text" class="h-20 bg-gray-100"></textarea>
                    </label>
                </fieldset>
                <fieldset class="mt-2 mb-5">
                    <label for="upload-img" class="flex justify-end">
                        <input type="file" id="upload-img"/>
                        <img class="bg-gray-100 rounded-sm" width="30px" src="https://icon-library.com/images/img-icon/img-icon-14.jpg"/>
                    </label>
                </fieldset> 
                <img width="100%" src="https://static.scientificamerican.com/blogs/cache/file/638FC5CE-96EC-46DA-AAC64985822092FE_source.jpg?w=590&h=800&BDB89ACC-71A2-463A-928419A181070C77"/>
                <footer class="mt-10 flex justify-end">
                    <button>POST</button>
                </footer>
            </form>
        </article>
    </div>
</div>
@endsection
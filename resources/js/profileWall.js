axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

let postModel = document.getElementById('post')

document.getElementById('newPost').addEventListener('click',function(){
    postModel.classList.remove('hidden')
})

document.getElementById('close-post').addEventListener('click',function(){
    postModel.classList.add('hidden')
})

document.getElementById('post-info').addEventListener('submit',function(){
    event.preventDefault()
    let form = document.getElementById('post-info')
    let formData = new FormData(form)
    console.log(this.currenTarget);
    axios.post('post/create', formData).then(function(res){
        postModel.classList.add('hidden')
        document.getElementById('post-text').textContent = ""
        document.getElementById('post-img').files = []
        console.log(document.getElementById('post-img'))
        console.log(res.data)
    })
})

document.getElementById('post-info').addEventListener('change',function(){
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("img-preview").setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(document.getElementById('post-img').files[0]); 
})
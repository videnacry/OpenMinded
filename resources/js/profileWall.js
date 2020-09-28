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
    console.log(event.currentTarget);
    axios.post('post/create', formData).then(function(res){
        postModel.classList.add('hidden')
        document.getElementById('post-text').value = ""
        document.getElementById('post-img').value = ""
        document.getElementById("img-preview").src = "https://static.scientificamerican.com/blogs/cache/file/638FC5CE-96EC-46DA-AAC64985822092FE_source.jpg?w=590&h=800&BDB89ACC-71A2-463A-928419A181070C77"
        console.log(res.data)
        let postInfo = res.data
        let newPost = document.getElementsByClassName('proto-post')[0].cloneNode(true)
        newPost.getElementsByTagName('img')[0].src = postInfo.authorImg
        newPost.getElementsByTagName('img')[1].src = "https://static.scientificamerican.com/blogs/cache/file/638FC5CE-96EC-46DA-AAC64985822092FE_source.jpg?w=590&h=800&BDB89ACC-71A2-463A-928419A181070C77"
        newPost.getElementsByTagName('h1')[0].textContent = postInfo.author
        newPost.getElementsByTagName('p')[0].textContent = postInfo.content
        document.getElementById('publications').prepend(newPost)
    })
})

document.getElementById('post-info').addEventListener('change',function(){
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("img-preview").setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(document.getElementById('post-img').files[0]); 
})
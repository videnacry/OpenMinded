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

document.getElementById('post-info').addEventListener('submit',function(e){
    e.preventDefault()
    let form = document.getElementById('post-info')
    let formData = new FormData(form)
    console.log(e.currentTarget);
    axios.post('posts', formData).then(function(res){
        postModel.classList.add('hidden')
        document.getElementById('post-text').value = ""
        document.getElementById('post-img').value = ""
        document.getElementById("img-preview").src = "https://static.scientificamerican.com/blogs/cache/file/638FC5CE-96EC-46DA-AAC64985822092FE_source.jpg?w=590&h=800&BDB89ACC-71A2-463A-928419A181070C77"
        let postInfo = res.data
        document.getElementById('publications').prepend(createPost('proto-post', undefined
        , postInfo.content, postInfo.author, postInfo.authorImg))
    })
})

/**
 * Clones a post by class, fill it with new data and return it
 * @param string proto_class
 * @param string img_src
 * @param string post_content
 * @param string post_author
 * @param string post_authorImg
 */
function createPost(protoClass
    , imgSrc='https://static.scientificamerican.com/blogs/cache/file/638FC5CE-96EC-46DA-AAC64985822092FE_source.jpg?w=590&h=800&BDB89ACC-71A2-463A-928419A181070C770'
    , postContent, authorUsername , authorImg){
    let newPost = document.getElementsByClassName(protoClass)[0].cloneNode(true)
    newPost.getElementsByTagName('img')[0].src = authorImg
    newPost.getElementsByTagName('img')[1].src = imgSrc
    newPost.getElementsByTagName('h1')[0].textContent = authorUsername
    newPost.getElementsByTagName('p')[0].textContent = postContent
    return newPost;
}

document.getElementById('post-info').addEventListener('change',function(){
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("img-preview").setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(document.getElementById('post-img').files[0]); 
})

axios.post('posts/username').then(function(res){
    for(let key in res.data.posts){
        let elem = res.data.posts[key]
        let author = res.data.user
        let post = createPost('proto-post', undefined, elem.content, author.name, author.profile_photo_path)
        document.getElementById('publications').prepend(post)
    }
})
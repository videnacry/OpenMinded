axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};

let closeModal = document.getElementById('close-modal')

let postModel = document.getElementById('post')

let postId

document.getElementById('newPost').addEventListener('click',function(){
    postModel.classList.remove('hidden')
})

document.getElementById('close-post').addEventListener('click',function(){
    postModel.classList.add('hidden')
})

//-----------------Send post data to server to create post------------------
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
        let newPost = createPost('proto-post', undefined, postInfo.content, postInfo.author, postInfo.authorImg)
        newPost.setAttribute('data-id', postInfo.id)
        newPost.addEventListener('dblclick',like)
        document.getElementById('publications').prepend(newPost)
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
function createPost(protoClass='proto-post'
    , imgSrc='https://static.scientificamerican.com/blogs/cache/file/638FC5CE-96EC-46DA-AAC64985822092FE_source.jpg?w=590&h=800&BDB89ACC-71A2-463A-928419A181070C770'
    , postContent, authorUsername , authorImg){
    let newPost = document.getElementsByClassName(protoClass)[0].cloneNode(true)
    newPost.getElementsByTagName('img')[0].src = authorImg
    newPost.getElementsByTagName('img')[1].src = imgSrc
    newPost.getElementsByTagName('h1')[0].textContent = authorUsername
    newPost.getElementsByTagName('p')[0].textContent = postContent
    return newPost;
}

//-----------------Show preview of the image going to post------------------
document.getElementById('post-info').addEventListener('change',function(){
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("img-preview").setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(document.getElementById('post-img').files[0]); 
})

//-----------------Show posts in profile from the user------------------
axios.post('posts/username').then(function(res){
    for(let key in res.data.posts){
        let elem = res.data.posts[key]
        let author = res.data.user
        let post = createPost(undefined, undefined, elem.content, author.name, author.profile_photo_path)
        post.addEventListener('dblclick',like)
        post.addEventListener('click', comments)
        post.addEventListener('contextmenu', showOptions)
        post.setAttribute('data-id',elem.id)
        post.getElementsByTagName('span')[0].textContent = elem.likes_count
        document.getElementById('publications').prepend(post)
    }
})

//-----------------Show post contextmenu------------------

let postMenu = document.getElementById('post-menu')
function showOptions(e){
    e.preventDefault()
    postId = e.currentTarget.getAttribute('data-id')
    if(postMenu.classList.contains('hidden')){
        postMenu.classList.toggle('hidden')
    }
    postMenu.style.top = e.pageY + "px"
    postMenu.style.left = e.screenX + "px"
}

document.getElementById('post-delete').onclick = function(e){
    axios.delete('posts/delete/'+postId).then(function(res){
        if(res.data == 'deleted'){
            document.querySelector('div[data-id="'+postId+'"]').remove()
        }
    })
}

//----------------------------Searcher-------------------------------------
let searcher = document.getElementById('searcher')
//----------search events--------------
searcher.children[0].onchange = search

searcher.children[1].onclick = search

//-----------search function-----------
function search(e){
    closeModal.classList.toggle('hidden')
    searcher.children[2].innerHTML = ""
    axios.post('posts/search', {text: searcher.children[0].value}).then(function(res){
        console.log(res.data)
        let posts = res.data
        for(let elem in res.data){
            console.log(searcher)
            let post = createPost(undefined, undefined, posts[elem].content, posts[elem].user.name , posts[elem].user.profile_photo_path)
            searcher.children[2].appendChild(post)
        }
    })
}

//---------close search result--------
closeModal.onclick = function(e){
    e.currentTarget.classList.toggle('hidden')
    searcher.children[2].textContent = ""
}


//-----------------------------------------LIKES-------------------------------------------------------

/**
 * Send the id of post to insert new id on DB, alse return likes count of the post
 * @param {event} e 
 */
function like(e){
    let post = e.currentTarget
    let data = {post_id:post.getAttribute('data-id')}
    axios.post('likes/store', data).then(function(res){
        post.getElementsByTagName('span')[0].textContent = res.data
    })
}

//----------------------------------------------COMMENTS----------------------------------------------
let commentModal = document.getElementById('comment-modal')
let commentSection = document.getElementById('comments')

/**
 * Show comments of clicked post in a comment modal
 */
function comments(e){
    commentSection.textContent = ""
    commentModal.style.backgroundImage = 'url("' + e.currentTarget.getElementsByTagName('img')[1].src + '")'
    commentModal.classList.toggle('hidden')
    postId = e.currentTarget.getAttribute('data-id')
    let data = {post_id:postId}
    axios.post('comments/post', data).then(function(res){
        let comments = res.data
        for(let key in comments){
            let newComment = createComment(undefined, undefined, comments[key].content, comments[key].user.name + ' -> ')
            commentSection.append(newComment)
        }
    }).then(()=>commentModal.children[0].scrollBy(0, commentModal.children[0].clientHeight))
}

function createComment(proto= 'proto-comment', user= false, content, author){
    newComment = document.getElementsByClassName(proto)[0].cloneNode(true)
    newComment.children[0].textContent = author
    newComment.children[1].textContent = content
    if(user){
        newComment.classList.add('bg-green-100')
        newComment.classList.remove('bg-pink-100')
        newComment.children[0].classList.add('text-purple-700')
        newComment.children[0].classList.remove('text-orange-500')
    }
    return newComment
}

document.getElementById('close-comment').onclick = ()=>commentModal.classList.toggle('hidden')
document.getElementById('send-comment').addEventListener('click',sendComment)

/**
 * Send comment from input on comment modal
 * @param {*} e 
 */
function sendComment(e){
    let postContent = document.getElementById('post-content').value
    let data = {post_id: postId, post_content: postContent}
    axios.post('comments/store', data).then(function(res){
        document.getElementById('post-content').value = ""
        let comment = res.data.comment, user=res.data.user
        let newComment = createComment(undefined, true, comment.content, user.name + ' -> ')
        commentSection.append(newComment)
    })
}
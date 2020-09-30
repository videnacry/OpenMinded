let closeModal = document.getElementById('close-modal')
//---------------.........-------------Searcher----------------------------------------------
let searcher = document.getElementById('searcher')
//----------search events--------------
searcher.children[0].onchange = search

searcher.children[1].onclick = search

//-----------search function-----------
function search(e){
    closeModal.classList.toggle('hidden')
    searcher.children[2].innerHTML = ""
    if(searcher.children[0].value.substring(0,1)=='@'){
        let text = searcher.children[0].value.substring(1)
        axios.post('users/search', {text: text}).then(function(res){
            console.log(res.data)
            let users = res.data
            for(let elem in users){
                let profile = createProfile(undefined, users[elem].description, users[elem].name , users[elem].profile_photo_path)
                profile.addEventListener('click', addFriend)
                searcher.children[2].appendChild(profile)
            }
        })
    }
}

//---------close search result--------
closeModal.onclick = function(e){
    e.currentTarget.classList.toggle('hidden')
    searcher.children[2].textContent = ""
}

/**
 * Clones an html element by class, fill it with new data and return it
 * @param string proto_class
 * @param string description
 * @param string username
 * @param string img -> src
 */
function createProfile(protoClass='proto-icon', description, username , img){
let newProfile = document.getElementsByClassName(protoClass)[0].cloneNode(true)
newProfile.getElementsByTagName('img')[0].src = img
newProfile.getElementsByTagName('h1')[0].textContent = username
newProfile.getElementsByTagName('p')[0].textContent = description
return newProfile;
}

//-----------addFriend function-----------
function addFriend(e){
    let tar = e.currentTarget;
    let target = e.currentTarget.getElementsByTagName('h1')[0].textContent
    axios.post('friends/store', {target: target}).then(function(res){
        console.log(res.data)
        tar.style.display = 'none'
    })
}

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


//-----------------show posts from everyone------------------

axios.post('posts/friends').then(function(res){
    let users = res.data
    for(let key in users){
        for(let index in users[key].posts){
            let friendPost = createPost(undefined, undefined, users[key].posts[index].content, users[key].name, users[key].profile_photo_path)
            friendPost.addEventListener('dblclick', like)
            friendPost.addEventListener('click', comments)
            friendPost.setAttribute('data-id', users[key].posts[index].id)
            friendPost.getElementsByTagName('span')[0].textContent = users[key].posts[index].likes_count
            document.getElementById('publications').prepend(friendPost)            
        }
    }
})


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
let postId

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
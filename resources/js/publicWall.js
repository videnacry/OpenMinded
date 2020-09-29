let closeModal = document.getElementById('close-modal')
//----------------------------Searcher-------------------------------------
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
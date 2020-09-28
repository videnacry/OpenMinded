axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};
console.log('a')
document.getElementById('newPost').addEventListener('click',function(){
    document.getElementById('post').classList.toggle('hidden')
})

document.getElementById('close-post').addEventListener('click',function(){
    document.getElementById('post').classList.toggle('hidden')
})

document.getElementById('post-info').addEventListener('submit',function(){
    event.preventDefault()
    let form = document.getElementById('post-info')
    let formData = new FormData(form)
    console.log(this.currenTarget);
    axios.post('post/create', formData).then(function(res){
        console.log(res)
    })
})
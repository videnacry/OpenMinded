/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/profileWall.js":
/*!*************************************!*\
  !*** ./resources/js/profileWall.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
};
var closeModal = document.getElementById('close-modal');
var postModel = document.getElementById('post');
var postId;
var selectedPost;
postForm = document.getElementById('post-info');
document.getElementById('newPost').addEventListener('click', function () {
  postModel.classList.remove('hidden');
});
document.getElementById('close-post').addEventListener('click', function () {
  postModel.classList.add('hidden');
  postForm.onsubmit = insertPost;
}); //-----------------Send post data to server to create post------------------

postForm.onsubmit = insertPost;

function insertPost(e) {
  e.preventDefault();
  var formData = new FormData(postForm);
  axios.post('posts', formData).then(function (res) {
    postModel.classList.add('hidden');
    document.getElementById('post-text').value = "";
    document.getElementById('post-img').value = "";
    document.getElementById("img-preview").src = "https://static.scientificamerican.com/blogs/cache/file/638FC5CE-96EC-46DA-AAC64985822092FE_source.jpg?w=590&h=800&BDB89ACC-71A2-463A-928419A181070C77";
    var postInfo = res.data;
    var newPost = createPost('proto-post', undefined, postInfo.content, postInfo.author, postInfo.authorImg);
    newPost.setAttribute('data-id', postInfo.id);
    newPost.addEventListener('dblclick', like);
    document.getElementById('publications').prepend(newPost);
  });
}
/**
 * Clones a post by class, fill it with new data and return it
 * @param string proto_class
 * @param string img_src
 * @param string post_content
 * @param string post_author
 * @param string post_authorImg
 */


function createPost() {
  var protoClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'proto-post';
  var imgSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://static.scientificamerican.com/blogs/cache/file/638FC5CE-96EC-46DA-AAC64985822092FE_source.jpg?w=590&h=800&BDB89ACC-71A2-463A-928419A181070C770';
  var postContent = arguments.length > 2 ? arguments[2] : undefined;
  var authorUsername = arguments.length > 3 ? arguments[3] : undefined;
  var authorImg = arguments.length > 4 ? arguments[4] : undefined;
  var newPost = document.getElementsByClassName(protoClass)[0].cloneNode(true);
  newPost.getElementsByTagName('img')[0].src = authorImg;
  newPost.getElementsByTagName('img')[1].src = imgSrc;
  newPost.getElementsByTagName('h1')[0].textContent = authorUsername;
  newPost.getElementsByTagName('p')[0].textContent = postContent;
  return newPost;
} //-----------------Show preview of the image going to post------------------


postForm.addEventListener('change', function () {
  var reader = new FileReader();

  reader.onload = function (e) {
    document.getElementById("img-preview").setAttribute("src", e.target.result);
  };

  reader.readAsDataURL(document.getElementById('post-img').files[0]);
}); //-----------------Show posts in profile from the user------------------

axios.post('posts/username').then(function (res) {
  for (var key in res.data.posts) {
    var elem = res.data.posts[key];
    var author = res.data.user;
    var post = createPost(undefined, undefined, elem.content, author.name, author.profile_photo_path);
    post.addEventListener('dblclick', like);
    post.addEventListener('click', comments);
    post.addEventListener('contextmenu', showOptions);
    post.setAttribute('data-id', elem.id);
    post.getElementsByTagName('span')[0].textContent = elem.likes_count;
    document.getElementById('publications').prepend(post);
  }
}); //-----------------Show post contextmenu------------------

var postMenu = document.getElementById('post-menu');

function showOptions(e) {
  e.preventDefault();
  postId = e.currentTarget.getAttribute('data-id');
  selectedPost = e.currentTarget;

  if (postMenu.classList.contains('hidden')) {
    postMenu.classList.toggle('hidden');
  }

  postMenu.style.top = e.pageY + "px";
  postMenu.style.left = e.screenX + "px";
}

document.getElementById('post-delete').onclick = function (e) {
  axios["delete"]('posts/delete/' + postId).then(function (res) {
    if (res.data == 'deleted') {
      selectedPost.remove();
    }
  });
};

document.getElementById('post-edit').onclick = function (e) {
  if (postModel.classList.contains('hidden')) {
    postModel.classList.remove('hidden');
  }

  postModel.getElementsByTagName('img')[1].src = selectedPost.getElementsByTagName('img')[1].src;
  postForm.getElementsByTagName('textarea')[0].value = selectedPost.getElementsByTagName('p')[0].textContent;

  postForm.onsubmit = function (e) {
    e.preventDefault();
    var data = new FormData(postForm);
    axios.post('posts/update/' + postId, data).then(function (res) {
      selectedPost.getElementsByTagName('p')[0].textContent = res.data.content; //selectedPost.getElementsByTagName('img')[1].src = res.data.photo
    })["finally"](function () {
      postForm.onsubmit = insertPost;
      postModel.classList.add('hidden');
    });
  };
}; //----------------------------Searcher-------------------------------------


var searcher = document.getElementById('searcher'); //----------search events--------------

searcher.children[0].onchange = search;
searcher.children[1].onclick = search; //-----------search function-----------

function search(e) {
  closeModal.classList.toggle('hidden');
  searcher.children[2].innerHTML = "";
  axios.post('posts/search', {
    text: searcher.children[0].value
  }).then(function (res) {
    console.log(res.data);
    var posts = res.data;

    for (var elem in res.data) {
      console.log(searcher);
      var post = createPost(undefined, undefined, posts[elem].content, posts[elem].user.name, posts[elem].user.profile_photo_path);
      searcher.children[2].appendChild(post);
    }
  });
} //---------close search result--------


closeModal.onclick = function (e) {
  e.currentTarget.classList.toggle('hidden');
  searcher.children[2].textContent = "";
}; //-----------------------------------------LIKES-------------------------------------------------------

/**
 * Send the id of post to insert new id on DB, alse return likes count of the post
 * @param {event} e 
 */


function like(e) {
  var post = e.currentTarget;
  var data = {
    post_id: post.getAttribute('data-id')
  };
  axios.post('likes/store', data).then(function (res) {
    post.getElementsByTagName('span')[0].textContent = res.data;
  });
} //----------------------------------------------COMMENTS----------------------------------------------


var commentModal = document.getElementById('comment-modal');
var commentSection = document.getElementById('comments');
/**
 * Show comments of clicked post in a comment modal
 */

function comments(e) {
  commentSection.textContent = "";
  commentModal.style.backgroundImage = 'url("' + e.currentTarget.getElementsByTagName('img')[1].src + '")';
  commentModal.classList.toggle('hidden');
  postId = e.currentTarget.getAttribute('data-id');
  var data = {
    post_id: postId
  };
  axios.post('comments/post', data).then(function (res) {
    var comments = res.data;

    for (var key in comments) {
      var _newComment = createComment(undefined, undefined, comments[key].content, comments[key].user.name + ' -> ');

      commentSection.append(_newComment);
    }
  }).then(function () {
    return commentModal.children[0].scrollBy(0, commentModal.children[0].clientHeight);
  });
}

function createComment() {
  var proto = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'proto-comment';
  var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var content = arguments.length > 2 ? arguments[2] : undefined;
  var author = arguments.length > 3 ? arguments[3] : undefined;
  newComment = document.getElementsByClassName(proto)[0].cloneNode(true);
  newComment.children[0].textContent = author;
  newComment.children[1].textContent = content;

  if (user) {
    newComment.classList.add('bg-green-100');
    newComment.classList.remove('bg-pink-100');
    newComment.children[0].classList.add('text-purple-700');
    newComment.children[0].classList.remove('text-orange-500');
  }

  return newComment;
}

document.getElementById('close-comment').onclick = function () {
  return commentModal.classList.toggle('hidden');
};

document.getElementById('send-comment').addEventListener('click', sendComment);
/**
 * Send comment from input on comment modal
 * @param {*} e 
 */

function sendComment(e) {
  var postContent = document.getElementById('post-content').value;
  var data = {
    post_id: postId,
    post_content: postContent
  };
  axios.post('comments/store', data).then(function (res) {
    document.getElementById('post-content').value = "";
    var comment = res.data.comment,
        user = res.data.user;
    var newComment = createComment(undefined, true, comment.content, user.name + ' -> ');
    commentSection.append(newComment);
  });
}

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./resources/js/profileWall.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\Open_Minded\resources\js\profileWall.js */"./resources/js/profileWall.js");


/***/ })

/******/ });
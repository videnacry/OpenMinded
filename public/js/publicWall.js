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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/publicWall.js":
/*!************************************!*\
  !*** ./resources/js/publicWall.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var closeModal = document.getElementById('close-modal'); //---------------.........-------------Searcher----------------------------------------------

var searcher = document.getElementById('searcher'); //----------search events--------------

searcher.children[0].onchange = search;
searcher.children[1].onclick = search; //-----------search function-----------

function search(e) {
  closeModal.classList.toggle('hidden');
  searcher.children[2].innerHTML = "";

  if (searcher.children[0].value.substring(0, 1) == '@') {
    var text = searcher.children[0].value.substring(1);
    axios.post('users/search', {
      text: text
    }).then(function (res) {
      console.log(res.data);
      var users = res.data;

      for (var elem in users) {
        var profile = createProfile(undefined, users[elem].description, users[elem].name, users[elem].profile_photo_path);
        profile.addEventListener('click', addFriend);
        searcher.children[2].appendChild(profile);
      }
    });
  }
} //---------close search result--------


closeModal.onclick = function (e) {
  e.currentTarget.classList.toggle('hidden');
  searcher.children[2].textContent = "";
};
/**
 * Clones an html element by class, fill it with new data and return it
 * @param string proto_class
 * @param string description
 * @param string username
 * @param string img -> src
 */


function createProfile() {
  var protoClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'proto-icon';
  var description = arguments.length > 1 ? arguments[1] : undefined;
  var username = arguments.length > 2 ? arguments[2] : undefined;
  var img = arguments.length > 3 ? arguments[3] : undefined;
  var newProfile = document.getElementsByClassName(protoClass)[0].cloneNode(true);
  newProfile.getElementsByTagName('img')[0].src = img;
  newProfile.getElementsByTagName('h1')[0].textContent = username;
  newProfile.getElementsByTagName('p')[0].textContent = description;
  return newProfile;
} //-----------addFriend function-----------


function addFriend(e) {
  var tar = e.currentTarget;
  var target = e.currentTarget.getElementsByTagName('h1')[0].textContent;
  axios.post('friends/store', {
    target: target
  }).then(function (res) {
    console.log(res.data);
    tar.style.display = 'none';
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
} //-----------------show posts from everyone------------------


axios.post('posts/friends').then(function (res) {
  var users = res.data;

  for (var key in users) {
    for (var index in users[key].posts) {
      var friendPost = createPost(undefined, undefined, users[key].posts[index].content, users[key].name, users[key].profile_photo_path);
      friendPost.addEventListener('dblclick', like);
      friendPost.addEventListener('click', comments);
      friendPost.setAttribute('data-id', users[key].posts[index].id);
      friendPost.getElementsByTagName('span')[0].textContent = users[key].posts[index].likes_count;
      document.getElementById('publications').prepend(friendPost);
    }
  }
});
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
var postId;
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

/***/ 1:
/*!******************************************!*\
  !*** multi ./resources/js/publicWall.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\Open_Minded\resources\js\publicWall.js */"./resources/js/publicWall.js");


/***/ })

/******/ });
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'render']);

Route::get('user/{username}', [UserController::class, 'render']);

Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/profile', [function(){return view('profile');}]);

Route::resource('posts','PostController');

Route::get('/wall', function(){
    return view('wall');
});

//-----------------Create and retrieve post------------------
Route::post('posts',[PostController::class,'store']);

//-----------------Get all posts from the user logged------------------
Route::post('/posts/username', [PostController::class, 'getByUsername']);

//-----------------Get all posts with a content containing a text------------------
Route::post('/posts/search', [PostController::class, 'getByText']);

//-----------------Get users whose username match a text------------------
Route::post('users/search', [UserController::class, 'getByText']);
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $author = Auth::user();
        $postText = $request['post-text'];
        $post = Post::create(['author'=>$author->id, 'content'=>$postText]);
        $post->save();
        echo json_encode(['author'=>$author->name, 'content'=>$postText, 'authorImg' => asset('storage/'.$author->profile_photo_path)]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Get the posts in a json of an user by its username
     * @param string $username
     */
    public function getByUsername(string $username = 'ñ'){
        if($username == 'ñ'){
            $user = Auth::user();
        }else{
            $userInstance = new UserController;
            $user = $userInstance->getByUsername($username);
        }
        $userPosts = Post::where('author', $user->id)->get();
        $user->profile_photo_path = asset('storage/'.$user->profile_photo_path);
        return json_encode(['posts'=>$userPosts, 'user'=>$user]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

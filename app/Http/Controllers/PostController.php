<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
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
     * It returns an array parsed to string with author and post data
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
    public function getFriends()
    {
        $friendInstance = new friendController;
        $users = $friendInstance->getFriends();
        foreach($users as $friend){
            $friend->posts = $friend->posts()->get();
            $friend->profile_photo_path = asset('storage/'.$friend->profile_photo_path);
            foreach($friend->posts as $post){
                $post->likes_count = $post->likes()->get()->count();
            }
        }
        return $users;
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
        foreach($userPosts as $post){
            $post->likes_count = $post->likes()->get()->count();
        }
        $user->profile_photo_path = asset('storage/'.$user->profile_photo_path);
        return json_encode(['posts'=>$userPosts, 'user'=>$user]);
    }

    /**
     * Get the posts in a json by a piece of text
     * @param string $username
     */
    public function getByText(Request $request){
        
        $userPosts = Post::where('content', 'like', '%'. $request->text. '%')->get();
        foreach($userPosts as $userPost){
            $userPost->user = $userPost->user;
            $userPost->user->profile_photo_path = asset('storage/'.$userPost->user->profile_photo_path);
        }
        return json_encode($userPosts);
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
        $updatedPost = Post::find($id);
        $updatedPost->content = $request['post-text'];
        $updatedPost->save();
        return $updatedPost;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Post::destroy($id);
        return 'deleted';
    }
}

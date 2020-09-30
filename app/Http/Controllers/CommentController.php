<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
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
        $newComment = Comment::create(["author"=>Auth::user()->id, "post"=>$request->post_id, "content"=>$request->post_content]);
        $newComment->save();
        $author = $newComment->user;
        return ['comment'=>$newComment, 'user'=>$author];
    }

    /**
     * Get comments from a post by id
     *
     * @param  \App\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function post(Request $request)
    {
        $comments = Comment::where('post', $request->post_id)->get();
        foreach($comments as $comment){
            $comment->user = $comment->user;
        }
        return $comments;
    }
    public function pos($request)
    {
        $comments = Comment::where('post', $request)->get();
        foreach($comments as $comment){
            $comment->user = $comment->user;
        }
        return $comments;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        //
    }
}

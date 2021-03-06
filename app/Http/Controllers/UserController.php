<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
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
     * Gets user by the username
     * @param string $username
     */
    public function getByUsername(string $username){
        return User::where('username', $username)->get()->first();
    }

    /**
     * Gets friends info as json by username
     * @param string $username
     */
    public function getFriendsByUsername(string $username){
        $userId = User::where('username', $username)->get()->first()->id;
        $friendInstance = new FriendController;
        $friendsIds = $friendInstance->getIdsBySenderId($userId);
        $friends = [];
        foreach($friendsIds as $friendId){
            $friend = User::find($friendId);
            array_push($friends, $friend);
        }
        return json_encode($friends);
    }
    
    /**
     * Gets users whose username match a text
     * @param Request $request
     */
    public function getByText(Request $request){
        $users = User::where('name','like','%'.$request->text.'%')->get();
        foreach($users as $user){
            $user->profile_photo_path = asset('storage/'.$user->profile_photo_path);
        }
        return $users;
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
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function render($username)
    {
        $user = User::where('name', $username)->first();
        return 'Username: ' . $user->email;
    }
}

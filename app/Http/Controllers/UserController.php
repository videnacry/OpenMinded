<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
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

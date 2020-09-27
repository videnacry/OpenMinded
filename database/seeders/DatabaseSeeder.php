<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Friend;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(10)->create();
        Friend::factory(20)->create();
        Post::factory(30)->create();
        Like::factory(100)->create();
        Comment::factory(150)->create();
    }
}

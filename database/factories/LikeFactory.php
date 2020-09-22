<?php

namespace Database\Factories;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LikeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Like::class;

    private $records = [];

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        do {
            $user_id = User::inRandomOrder()->first()->id;
            $post_id = Post::inRandomOrder()->first()->id;
            $needle = $user_id . '_' . $post_id;
        } while (in_array($needle, $this->records));

        array_push($this->records, $needle);

        return [
            'author' => $user_id,
            'post' => $post_id,
        ];
    }
}

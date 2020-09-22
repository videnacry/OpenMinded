<?php

namespace Database\Factories;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class FriendFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Friend::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = User::inRandomOrder()->limit(5)->get();
        $sender = $users[0];
        $receiver = $users[1];

        return [
            'sender' => $sender->id,
            'receiver' => $receiver->id,
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected']),
        ];
    }
}

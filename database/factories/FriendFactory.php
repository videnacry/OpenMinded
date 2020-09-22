<?php

namespace Database\Factories;

use App\Models\Friend;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FriendFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Friend::class;
    private $records = [];

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        do {
            $users = User::inRandomOrder()->limit(2)->get();
            $user_1 = $users[0]->id;
            $user_2 = $users[1]->id;
            $needle = $user_1 . '_' . $user_2;
        } while (in_array($needle, $this->records));

        array_push($this->records, $user_1 . '_' . $user_2);
        array_push($this->records, $user_2 . '_' . $user_1);

        return [
            'sender' => $user_1,
            'receiver' => $user_2,
            'status' => $this->faker->randomElement([0, 1]),
        ];
    }
}

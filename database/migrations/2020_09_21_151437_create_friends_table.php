<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFriendsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('friends', function (Blueprint $table) {
            $table->unsignedBigInteger('sender');
            $table->foreign('sender')->references('id')->on('users');
            $table->unsignedBigInteger('receiver');
            $table->foreign('receiver')->references('id')->on('users');
            $table->primary(['sender', 'receiver']);
            // 0: pending; 1: approved; 2: rejected
            $table->integer('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('friends');
    }
}

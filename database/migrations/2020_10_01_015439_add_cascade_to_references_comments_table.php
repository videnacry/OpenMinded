<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCascadeToReferencesCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign('comments_author_foreign');
            $table->dropForeign('comments_post_foreign');
            $table->foreign('author')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('post')->references('id')->on('posts')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('references_comments', function (Blueprint $table) {
            //
        });
    }
}

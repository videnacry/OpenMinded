<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    public $fillable = [
        'author',
        'post',
        'content'
    ];

    /**
     * Relation, so comment instance get post property, who he is related to
     */
    public function post(){
        return $this->belongsTo('App\Models\post', 'post');
    }

    /**
     * Relation, so comment instance get user propery, who he is related to
     */
    public function user(){
        return $this->belongsTo('App\Models\user', 'author');
    }
}

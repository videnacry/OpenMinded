<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'author',
        'content'
    ];

    public function user(){
        return $this->belongsTo('App\Models\User', 'author', 'id');
    }

    public function likes(){
        return $this->hasMany('App\Models\Like', 'post');
    }
}

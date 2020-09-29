<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
    
    protected $primaryKey = ['author', 'post'];
    public $incrementing = false;

    public $fillable = ['author', 'post'];

    public function post(){
        return $this->belongsTo('App\Models\Post', 'post');
    }
}

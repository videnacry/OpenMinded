<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sender',
        'receiver',
        'status'
    ];
    
    /**
     * Returns the user of an specific friendship
     */
    public function user(){
        return $this->belongsTo('App\Models\User');
    }
    protected $primaryKey = ['sender', 'receiver'];
    public $incrementing = false;
}

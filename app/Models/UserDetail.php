<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class UserDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'address',
        'experiences',
        'soc_fb',
        'soc_linkedin',
        'soc_twitter',
        'about'
    ];

    protected $casts = [
        'experiences' => 'array'
    ];
}

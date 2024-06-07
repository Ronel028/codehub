<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    protected $appends = ['full_name'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getFullNameAttribute()
    {
        if (!is_null($this->userDetail)) {
            if ($this->userDetail->middle_name) {
                return $this->userDetail->first_name . " " . $this->userDetail->middle_name . " " . $this->userDetail->last_name;
            } else {
                return $this->userDetail->first_name . " " . $this->userDetail->last_name;
            }
        }
    }

    public function upload(): MorphOne
    {
        return $this->morphOne(Upload::class, 'uploadable')->latestOfMany();
    }

    public function userDetail(): HasOne
    {
        return $this->hasOne(UserDetail::class, 'user_id');
    }
}

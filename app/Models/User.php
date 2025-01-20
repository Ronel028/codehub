<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
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
            $fname = $this->userDetail->first_name;
            $mname = $this->userDetail->middle_name;
            $lname = $this->userDetail->last_name;

            if (is_null($fname) && is_null($lname)) {
                return null;
            } else {
                if ($mname) {
                    return $fname . " " . $mname . " " . $lname;
                } else {
                    return $fname . " " . $lname;
                }
            }
        }
    }

    public function upload(): MorphOne
    {
        return $this->morphOne(Upload::class, 'uploadable')->latestOfMany();
    }

    public function avatar(): MorphOne
    {
        return $this->morphOne(Upload::class, 'uploadable')->where('type', '=', 'avatar')->take(1)->latest();
    }

    public function cover(): MorphOne
    {
        return $this->morphOne(Upload::class, 'uploadable')->where('type', '=', 'cover')->take(1)->latest();
    }

    public function userDetail(): HasOne
    {
        return $this->hasOne(UserDetail::class, 'user_id');
    }

    public function socialMediaLinks(): HasMany
    {
        return $this->hasMany(SocialMediaLinks::class, 'user_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Support\Str;

class BlogPost extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;
    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }

    protected $fillable = [
        'user_id',
        'slug',
        'title',
        'description',
        'content',
        'is_published'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function upload(): MorphOne
    {
        return $this->morphOne(Upload::class, 'uploadable')->latestOfMany();;
    }

    // public function category(): BelongsTo
    // {
    //     return $this->belongsTo(CategoryReference::class, 'category_reference_id');
    // }
}

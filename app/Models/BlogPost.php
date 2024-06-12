<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class BlogPost extends Model
{
    use HasFactory;

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

    public function category(): BelongsTo
    {
        return $this->belongsTo(CategoryReference::class, 'category_reference_id');
    }
}

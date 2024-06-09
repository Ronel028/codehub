<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CategoryReference extends Model
{
    use HasFactory;

    public function blog(): BelongsTo
    {
        return $this->belongsTo(BlogPost::class);
    }
}

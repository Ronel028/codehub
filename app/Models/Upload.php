<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Upload extends Model
{
    use HasFactory;

    protected $fillable = [
        'filename',
        'path',
        'uploadable_id',
        'uploadable_type',
    ];

    protected $appends = ['full_image_path'];

    protected function fullImagePath(): Attribute
    {
        return new Attribute(
            get: fn () => asset($this->path),
        );
    }

    public function uploadable(): MorphTo
    {
        return $this->morphTo();
    }
}

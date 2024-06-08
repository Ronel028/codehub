<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BlogPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'slug' => 'unique:blog_posts',
            'title' => 'required|unique:blog_posts',
            'description' => 'required',
            'category' => 'required',
            'content' => 'required',
            'image' => 'max:8192'
        ];
    }

    public function messages()
    {
        return [
            'title.unique' => 'Title already exist, please choose unique title for your blog',
            'image.max' => "Maximum file size to upload is 8MB (8192 KB). If you are uploading a photo, try to reduce its resolution to make it under 8MB"
        ];
    }
}

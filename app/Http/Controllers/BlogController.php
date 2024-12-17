<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogPostRequest;
use App\Models\BlogPost;
use App\Models\CategoryReference;
use App\Models\Upload;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    // RENDER CREATE PAGE
    public function createPage()
    {
        return Inertia::render('Blog/Create', [
            'category' => CategoryReference::all()
        ]);
    }

    // RENDER BLOG LIST PAGE
    public function Index(Request $request)
    {
        $search = $request->query('search');
        $blog_list = BlogPost::with(['upload'])
            ->where('user_id', Auth::user()->id)
            ->when(
                $search,
                fn($query) =>
                $query->where('title', 'LIKE', "%{$search}%")
            )
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('Blog/Index', [
            'blogs' => $blog_list
        ]);
    }

    // RENDER EDIT PAGE
    public function editPage(Request $request)
    {
        return Inertia::render('Blog/Edit', [
            'category' => CategoryReference::all(),
            'blog' => BlogPost::with(['upload'])->find($request->id)
        ]);
    }

    // CREATE AND SAVE NEW BLOG
    public function store(BlogPostRequest $request)
    {
        DB::beginTransaction();
        $blog = new BlogPost();
        $blog->user_id = Auth::user()->id;
        $blog->title = $request->title;
        $blog->slug = Str::slug($request->title, '-');
        $blog->description = $request->description;
        $blog->content = $request->content;
        $blog->is_published = $request->is_publish;

        if ($blog->save()) {

            if ($request->hasFile('image')) {

                $uploadedFile = Cloudinary::upload($request->file('image')->getRealPath(), [
                    'folder' => 'knowl_img'
                ]);

                $blog->upload()->create([
                    'filename' => $request->file('image')->getClientOriginalName(),
                    'path' => $uploadedFile->getSecurePath(),
                ]);

                // $blog->upload()->create([
                //     'filename' => $request->file('image')->getClientOriginalName(),
                //     'path' => $request->file('image')->store('images', 'public')
                // ]);
            }

            DB::commit();
        } else {
            DB::rollBack();
        }
    }

    // SAVE UPDATED BLOG
    public function update(Request $request)
    {

        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'category' => 'required',
            'content' => 'required',
            'image' => 'max:8192'
        ]);

        DB::beginTransaction();
        $blog = BlogPost::find($request->id);
        $blog->user_id = Auth::user()->id;
        $blog->title = $request->title;
        $blog->slug = Str::slug($request->title, '-');
        $blog->description = $request->description;
        $blog->category_reference_id = $request->category;
        $blog->content = $request->content;
        $blog->is_published = $request->is_publish;

        if ($blog->save()) {

            if ($request->hasFile('image')) {

                $uploadedFile = Cloudinary::upload($request->file('image')->getRealPath(), [
                    'folder' => 'knowl_img'
                ]);

                $blog->upload()->create([
                    'filename' => $request->file('image')->getClientOriginalName(),
                    'path' => $uploadedFile->getSecurePath(),
                ]);

                // $blog->upload()->create([
                //     'filename' => $request->file('image')->getClientOriginalName(),
                //     'path' => $request->file('image')->store('images', 'public')
                // ]);
            }

            DB::commit();
        } else {
            DB::rollBack();
        }
    }
}

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
    public function createPage(Request $request)
    {
        $blog = null;
        if (!is_null($request->id)) {
            $blog = BlogPost::find($request->id);
        }
        return Inertia::render('Blog/Create', [
            'blog' => $blog
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
            'blog' => BlogPost::with(['upload'])->find($request->id)
        ]);
    }

    // CREATE AND SAVE NEW BLOG BlogPostRequest
    public function store(Request $request)
    {
        try {
            $blog = BlogPost::updateOrCreate(
                [
                    "id" => $request->post_id
                ],
                [
                    'content' => $request->content,
                    'is_published' => $request->is_publish,
                ]
            );
            return redirect()->route('blog.create-page', ['id' => (string)$blog->id]);
        } catch (\Throwable $th) {
            dd($th->getMessage());
            DB::rollBack();
        }
    }

    public function createPostTitle(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);
        DB::beginTransaction();
        try {
            $blog = new BlogPost();
            $blog->user_id = Auth::id();
            $blog->title = $request->title;
            $blog->description = $request->description;
            if ($blog->save()) {
                if ($request->hasFile('image')) {

                    $uploadedFile = Cloudinary::upload($request->file('image')->getRealPath(), [
                        'folder' => 'knowl_img'
                    ]);

                    $blog->upload()->create([
                        'filename' => $request->file('image')->getClientOriginalName(),
                        'path' => $uploadedFile->getSecurePath(),
                    ]);
                }
                DB::commit();
                return redirect()->route('blog.create-page', ['id' => (string)$blog->id]);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }

    // SAVE UPDATED BLOG
    public function update(Request $request)
    {

        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'content' => 'required',
            'image' => 'max:8192'
        ]);

        DB::beginTransaction();
        $blog = BlogPost::find($request->id);
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
            }

            DB::commit();
        } else {
            DB::rollBack();
        }
    }
}

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
        DB::beginTransaction();
        try {
            $title = null;
            $description = null;
            preg_match('/<h1>(.*?)<\/h1>/', $request->content, $title);
            preg_match('/<h2>(.*?)<\/h2>/', $request->content, $description);
            if (isset($title[1])) {
                $title = $title[1];
            } else {
                $title = null;
            }
            if (isset($description[1])) {
                $description = $description[1];
            } else {
                $description = null;
            }
            // $title = Str::betweenFirst($request->content, '<h1>', '</h1>');
            // $description = Str::betweenFirst($request->content, '<h2>', '</h2>');

            $blog = BlogPost::updateOrCreate(
                [
                    "id" => $request->post_id
                ],
                [
                    'user_id' => Auth::user()->id,
                    'slug' => Str::uuid(),
                    'title' => $title,
                    'description' => $description,
                    'content' => $request->content,
                    'is_published' => $request->is_publish,
                ]
            );

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
            return redirect()->route('blog.create-page', ['id' => $blog->id]);
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

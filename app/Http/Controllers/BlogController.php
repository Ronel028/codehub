<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogPostRequest;
use App\Models\BlogPost;
use App\Models\CategoryReference;
use App\Models\Upload;
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
        $blog_list = BlogPost::with(['category', 'upload'])
            ->where('user_id', Auth::user()->id)
            ->when(
                $search,
                fn ($query) =>
                $query->where('title', 'LIKE', "%{$search}%")
            )
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
            'blog' => BlogPost::with(['category', 'upload'])->find($request->id)
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
        $blog->category_reference_id = $request->category;
        $blog->content = $request->content;
        $blog->is_published = $request->is_publish;

        if ($blog->save()) {

            if ($request->hasFile('image')) {
                $blog->upload()->create([
                    'filename' => $request->file('image')->getClientOriginalName(),
                    'path' => $request->file('image')->store('images', 'public')
                ]);
            }

            DB::commit();
        } else {
            DB::rollBack();
        }
    }

    // SAVE UPDATED BLOG
    public function update(Request $request)
    {
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
                $blog->upload()->create([
                    'filename' => $request->file('image')->getClientOriginalName(),
                    'path' => $request->file('image')->store('images', 'public')
                ]);
            }

            DB::commit();
        } else {
            DB::rollBack();
        }
    }
}

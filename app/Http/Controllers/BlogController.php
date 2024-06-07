<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlogPostRequest;
use App\Models\BlogPost;
use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function createPage()
    {
        return Inertia::render('Blog/Create');
    }

    public function store(BlogPostRequest $request)
    {

        DB::beginTransaction();
        $blog = new BlogPost();
        $blog->user_id = Auth::user()->id;
        $blog->title = $request->title;
        $blog->slug = Str::slug($request->title, '-');
        $blog->description = $request->description;
        $blog->content = $request->content;
        $blog->status = $request->status;

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

    public function fetch()
    {
        $blog_post = BlogPost::with('upload')->get();
        dd($blog_post);
    }
}

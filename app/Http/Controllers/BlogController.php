<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function createPage()
    {
        return Inertia::render('Blog/Create');
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        $blog = new BlogPost();
        $blog->user_id = Auth::user()->id;
        $blog->title = $request->title;
        $blog->description = $request->description;
        $blog->content = $request->content;

        if ($blog->save()) {

            if ($request->hasFile('image')) {
                $blog->upload()->create([
                    'filename' => $request->file('image')->getClientOriginalName(),
                    'path' => $request->file('image')->store('public/images')
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

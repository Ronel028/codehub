<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\CategoryReference;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogListController extends Controller
{
    public function index()
    {
        return Inertia::render("Home/Blogs", [
            'latest_blog' => BlogPost::with(['upload', 'user'])->where('status', 'publish')->latest()->take(3)->get(),
            'blogs' => BlogPost::with(['upload', 'user'])->where('status', 'publish')->orderBy('created_at', 'desc')->get()
        ]);
    }

    public function fetch(Request $request)
    {
        try {
            $username = $request->username;
            $id = $request->id;

            return Inertia::render('Home/View', [
                'blog' =>  BlogPost::with(['user' => function ($query) {
                    $query->with('userDetail', 'avatar');
                }])->whereHas('user', function ($query) use ($username) {
                    $query->where('username', $username);
                })->where('id', $id)->first(),
                'more_blogs' => BlogPost::with(['user', 'upload'])->whereHas('user', function ($query) use ($username) {
                    $query->where('username', $username);
                })->where('status', 'publish')->whereNot('id', $id)->orderBy('created_at', 'desc')->get()
            ]);
        } catch (\Throwable $th) {
            dd($th->getMessage());
            //throw $th;
        }
    }

    public function blogs(Request $request)
    {
        return Inertia::render('Home/Blogs');
    }
}

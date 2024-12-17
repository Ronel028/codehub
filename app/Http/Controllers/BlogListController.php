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
            'latest_blog' => BlogPost::with(['upload', 'user'])->where('is_published', 1)->latest()->take(3)->get(),
            'blogs' => BlogPost::with(['upload', 'user'])->where('is_published', 1)->orderBy('created_at', 'desc')->get(),
            'categories' => CategoryReference::all()
        ]);
    }

    public function blogListCategory(Request $request)
    {
        $category = $request->category;
        $search = $request->query('search');

        return Inertia::render("Home/Category", [
            'category' => $request->category,
            'blogs' => BlogPost::with(['upload', 'user'])->where('is_published', 1)->when(
                $search,
                fn($query) =>
                $query->where('title', 'LIKE', "%{$search}%")
            )->get()
        ]);
    }

    public function fetch(Request $request)
    {
        $username = $request->username;
        $slug = $request->slug;

        return Inertia::render('Home/View', [
            'blog' =>  BlogPost::with(['user' => function ($query) {
                $query->with('userDetail', 'upload');
            }])->whereHas('user', function ($query) use ($username) {
                $query->where('username', $username);
            })->where('slug', $slug)->first(),
            'more_blogs' => BlogPost::with(['user', 'upload'])->whereHas('user', function ($query) use ($username) {
                $query->where('username', $username);
            })->whereNot('slug', $slug)->orderBy('created_at', 'desc')->get()
        ]);
    }

    public function blogs(Request $request)
    {
        return Inertia::render('Home/Blogs');
    }
}

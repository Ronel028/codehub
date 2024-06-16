<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogListController extends Controller
{
    public function index()
    {
        return Inertia::render("Home/Index", [
            'latest_blog' => BlogPost::with(['category', 'upload', 'user'])->where('is_published', 1)->latest()->take(3)->get(),
            'blogs' => BlogPost::with(['category', 'upload', 'user'])->where('is_published', 1)->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function blogListCategory(Request $request)
    {
        $category = $request->category;
        $search = $request->query('search');

        return Inertia::render("Home/Category", [
            'category' => $request->category,
            'blogs' => BlogPost::with(['upload', 'user'])->where('is_published', 1)->whereHas('category', function ($query) use ($category) {
                $query->where('name', $category);
            })->when(
                $search,
                fn ($query) =>
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
            }, 'category'])->whereHas('user', function ($query) use ($username) {
                $query->where('username', $username);
            })->where('slug', $slug)->first()
        ]);
    }

    public function blogs(Request $request)
    {
        return Inertia::render('Home/Blogs');
    }
}

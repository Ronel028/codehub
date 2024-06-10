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
            'latest_blog' => BlogPost::with(['category', 'upload'])->latest()->take(4)->get()
        ]);
    }
}

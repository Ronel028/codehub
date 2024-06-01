<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function createPage()
    {
        return Inertia::render('Blog/Create');
    }
}

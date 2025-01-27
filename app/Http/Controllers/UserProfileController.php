<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function index(Request $request)
    {
        $username = $request->username;
        $user = User::with(['userDetail', 'avatar', 'cover', 'socialMediaLinks'])->where('username', $username)->first();
        $blogs = BlogPost::with(['upload', 'user'])
            ->where('user_id', $user->id)
            ->where('status', 'publish')
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('Profile/Index', [
            'user' => $user,
            'blogs' => $blogs
        ]);
    }
}

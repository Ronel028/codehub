<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\CategoryReference;
use App\Models\PostView;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function PHPUnit\Framework\isNull;

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
            $slug = $request->slug;

            $ipAddress = $request->ip();

            $user = Auth::user();

            $blog = BlogPost::with(['upload', 'user' => function ($query) {
                $query->with('userDetail', 'avatar', 'socialMediaLinks');
            }])->whereHas('user', function ($query) use ($username) {
                $query->where('username', $username);
            })->where('slug', $slug)->where('status', 'publish')->first();

            if (is_null($blog)) {
                return Inertia::render('Error/NotFound');
            }

            $exists = PostView::where('blog_post_id', $blog->id)
                ->whereDate('created_at', Carbon::today())
                ->when($user, function ($query) use ($user) {
                    return $query->where('user_id', $user->id);
                }, function ($query) use ($ipAddress) {
                    return $query->where('ip_address', $ipAddress);
                })
                ->exists();

            if (!$exists) {
                $postView = new PostView();
                $postView->blog_post_id = $blog->id;
                $postView->user_id = Auth::id();
                $postView->ip_address = $request->ip();
                $postView->user_agent = $request->userAgent();
                $postView->save();
            }

            return Inertia::render('Home/View', [
                'blog' => $blog,
                'viewsCount' => PostView::where('blog_post_id', $blog->id)->count(),
                'more_blogs' => BlogPost::with(['user', 'upload'])->whereHas('user', function ($query) use ($username) {
                    $query->where('username', $username);
                })->where('status', 'publish')->whereNot('slug', $slug)->orderBy('created_at', 'desc')->get()
            ]);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }

    public function blogs(Request $request)
    {
        return Inertia::render('Home/Blogs');
    }
}

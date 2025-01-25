<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $blogPost = BlogPost::where('user_id', Auth::id())->orderBy('created_at', 'desc')->get();
        return Inertia::render('Author/Posts/Index',  [
            'blogPost' => $blogPost
        ]);
    }
    public function createPage()
    {
        return Inertia::render('Author/Posts/Create');
    }
    public function createPostTitle(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required'
        ]);
        DB::beginTransaction();
        try {
            $blog = new BlogPost();
            $blog->user_id = Auth::id();
            $blog->title = $request->title;
            $blog->description = $request->description;
            if ($blog->save()) {
                if ($request->hasFile('thumbnail')) {

                    $uploadedFile = Cloudinary::upload($request->file('thumbnail')->getRealPath(), [
                        'folder' => 'knowl_img'
                    ]);

                    $blog->upload()->create([
                        'filename' => $request->file('thumbnail')->getClientOriginalName(),
                        'path' => $uploadedFile->getSecurePath(),
                    ]);
                }
                DB::commit();
                // return redirect()->route('blog.create-page', ['id' => (string)$blog->id]);
                return redirect()->route('author.post.index');
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
        }
    }
}

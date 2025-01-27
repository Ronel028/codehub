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

    public function createPage(Request $request)
    {
        $blogId = $request->query('id');
        $blogPost = BlogPost::with(['upload'])->find($blogId);
        return Inertia::render('Author/Posts/Create', [
            'blogPost' => $blogPost
        ]);
    }

    public function createPostTitle(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required|min:150|max:300',
            'thumbnail' => 'required|max:1024'
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
                return redirect()->route('author.post.create.page', ['id' => (string)$blog->id]);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);
        }
    }

    public function saveBlogContent(Request $request)
    {
        try {
            $blog = BlogPost::updateOrCreate(
                [
                    "id" => $request->post_id
                ],
                [
                    'content' => $request->content,
                ]
            );
            return redirect()->route('author.post.create.page', ['id' => (string)$blog->id]);
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }

    public function changePostStatus(Request $request)
    {
        try {
            $blog = BlogPost::find($request->post_id);
            $blog->status = $request->status;
            if ($blog->save()) {
                return redirect()->route('author.post.create.page', ['id' => (string)$blog->id]);
            }
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }
}

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
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('Profile/Index', [
            'user' => $user,
            'blogs' => $blogs
        ]);
    }

    public function edit()
    {
        $user = User::with(['userDetail', 'upload'])->where('id', Auth::user()->id)->first();
        return Inertia::render('Profile/Edit', [
            'user' => $user
        ]);
    }

    // UPDATE PROFILE
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = User::with('userDetail')->where('id', Auth::id())->first();
            $user->userDetail()->updateOrCreate(
                [
                    'user_id' => $user->id,
                ],
                [
                    'first_name' => $request->first_name,
                    'middle_name' => $request->middle_name,
                    'last_name' => $request->last_name,
                    'address' => $request->address,
                    'experiences' => is_null($request->experience[0]) ? null : $request->experience,
                    'soc_fb' => $request->soc_fb,
                    'soc_linkedin' => $request->soc_linkedin,
                    'soc_twitter' => $request->soc_twitter,
                    'about' => $request->about,
                ]
            );
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }

    public function updateProfilePicture(Request $request)
    {
        try {
            $user = User::find(Auth::id());
            if ($request->hasFile('photo')) {

                $uploadedFile = Cloudinary::upload($request->file('photo')->getRealPath(), [
                    'folder' => 'knowl_img'
                ]);

                $user->upload()->create([
                    'filename' => $request->file('photo')->getClientOriginalName(),
                    'path' => $uploadedFile->getSecurePath(),
                ]);
            }
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }
}

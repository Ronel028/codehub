<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\SocialMediaLinks;
use App\Models\User;
use App\Models\UserDetail;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(){
        return Inertia::render('Author/Profile/Index');
    }
    public function editProfile(){
        $socialMediaLinks = SocialMediaLinks::where('user_id', Auth::id())->get();
        $userDetail = UserDetail::where('user_id', Auth::id())->first();
        $user = User::with('avatar')->where('id', Auth::id())->first();
        return Inertia::render('Author/Profile/Edit', [
            'socialMediaLinks' => $socialMediaLinks,
            'userDetail' => $userDetail,
            'userAvatar' => $user->avatar
        ]);
    }

    // =========== Social Media Links Function ============
    public function addSocialMediaAccount(Request $request){
        $request->validate([
            'platform' => 'required',
            'link' => 'required',
        ]);
        try {
            $socialMediaLinks = new SocialMediaLinks();
            $socialMediaLinks->user_id = Auth::id();
            $socialMediaLinks->platform = $request->platform;
            $socialMediaLinks->link = $request->link;
            if($socialMediaLinks->save()){
                return to_route('author.profile.edit');
            }
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    public function updateSocialMediaLink(Request $request){
        $request->validate([
            'link' => 'required',
        ]);
        try {
            $socialMediaLinks = SocialMediaLinks::find($request->id);
            $socialMediaLinks->link = $request->link;
            if($socialMediaLinks->save()){
                return to_route('author.profile.edit');
            }
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    public function removeSocialMediaLink(Request $request){
        try {
            $socialMediaLinks = SocialMediaLinks::find($request->id);
            if($socialMediaLinks->delete()){
                return to_route('author.profile.edit');
            }
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    // =========== Social Media Links Function ============

    // =========== PERSONAL INFORMATION FUNCTION ============
    public function savePersonalInformation(Request $request){
        $request->validate([
            'fullname' => 'required',
            'tagline' => 'required',
            'bio' => 'required',
        ]);
        try {
            $userDetail = UserDetail::updateOrCreate(
                    [
                        'user_id' => Auth::id()
                    ],
                    [
                        'full_name' => $request->fullname,
                        'tagline' => $request->tagline,
                        'address' => $request->address,
                        'bio' => $request->bio,
                    ]
                );
            if($userDetail){
                return to_route('author.profile.edit');
            }
        } catch (\Throwable $th) {
            dd($th);
        }
    }
    // =========== PERSONAL INFORMATION FUNCTION ============

    // =========== PROFILE AND COVER PHOTO FUNCTION ============
    public function saveProfilePhoto(Request $request){
        $request->validate([
            'photo' => 'required'
        ]);
        try {
            $user = User::find(Auth::id());
            if ($request->hasFile('photo')) {

                $uploadedFile = Cloudinary::upload($request->file('photo')->getRealPath(), [
                    'folder' => 'knowl_img'
                ]);

                $user->upload()->create([
                    'filename' => $request->file('photo')->getClientOriginalName(),
                    'path' => $uploadedFile->getSecurePath(),
                    'type' => 'avatar'
                ]);

                return to_route('author.profile.edit');
            }
        } catch (\Throwable $th) {
            dd($th->getMessage());
        }
    }
    // =========== PROFILE AND COVER PHOTO FUNCTION ============

}

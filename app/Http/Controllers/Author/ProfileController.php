<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use App\Models\SocialMediaLinks;
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
        return Inertia::render('Author/Profile/Edit', [
            'socialMediaLinks' => $socialMediaLinks
        ]);
    }
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
}

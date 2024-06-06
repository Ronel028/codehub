<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function index()
    {
        $user = User::with('userDetail')->where('id', Auth::user()->id)->first();
        return Inertia::render('Profile/Index', [
            'user' => $user
        ]);
    }

    public function edit()
    {
        $user = User::with('userDetail')->where('id', Auth::user()->id)->first();
        return Inertia::render('Profile/Edit', [
            'user' => $user
        ]);
    }

    // UPDATE PROFILE
    public function store(Request $request)
    {
        // dd($request);
        DB::beginTransaction();
        $user = User::with('userDetail')->where('id', Auth::user()->id)->first();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = !is_null($request->password) ? $request->password : $user->password;
        if ($user->save()) {
            DB::commit();
            if (is_null($user->userDetail)) {
                $user->userDetail()->create([
                    'user_id' => $user->id,
                    'first_name' => $request->first_name,
                    'middle_name' => $request->middle_name,
                    'last_name' => $request->last_name,
                    'address' => $request->address,
                    'experiences' => $request->experience,
                    'soc_fb' => $request->soc_fb,
                    'soc_linkedin' => $request->soc_linkedin,
                    'soc_twitter' => $request->soc_twitter,
                    'about' => $request->about,
                ]);
            } else {
                $user->userDetail()->update([
                    'first_name' => $request->first_name,
                    'middle_name' => $request->middle_name,
                    'last_name' => $request->last_name,
                    'address' => $request->address,
                    'experiences' => $request->experience,
                    'soc_fb' => $request->soc_fb,
                    'soc_linkedin' => $request->soc_linkedin,
                    'soc_twitter' => $request->soc_twitter,
                    'about' => $request->about,
                ]);
            }
        } else {
            DB::rollBack();
        }
    }
}

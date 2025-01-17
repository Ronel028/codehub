<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index(){
        return Inertia::render('Author/Profile/Index');
    }
    public function editProfile(){
        return Inertia::render('Author/Profile/Edit');
    }
    public function addSocialMediaAccount(Request $request){
        dd($request);
    }
}

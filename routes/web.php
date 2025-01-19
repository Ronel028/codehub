<?php

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BlogListController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\Author\DashboardController;
use App\Http\Controllers\Author\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Index');
})->name('index');

// BLOG LIST
Route::name('blog-list.')->prefix('blog-list')->group(function () {
    Route::get('/', [BlogListController::class, 'index'])->name('index');
    Route::get('/read/{username}/{id}', [BlogListController::class, 'fetch']);
    Route::get('/blog/{category}', [BlogListController::class, 'blogListCategory'])->name('blog-list-category');
    // Route::get('/all', [BlogListController::class, 'blogs'])->name('all');
});

// USER AUTHENTICATION
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/create-account', [AuthController::class, 'createAccount'])->name('create-account');
Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return Inertia::render('Home/Index');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::get('/email/verify', function () {
    return Inertia::render('Home/Index', [
        'email_verified_at' => is_null(auth()->user()->email_verified_at) ? 0 : 1
    ]);
})->middleware('auth')->name('verification.notice');


// BLOG ROUTE
Route::middleware(['auth', 'verified'])->name('blog.')->prefix('blog')->group(function () {
    Route::get('/create', [BlogController::class, 'createPage'])->name('create-page');
    Route::get('/edit/{id}', [BlogController::class, 'editPage'])->name('edit-page');
    Route::post('/save-edit', [BlogController::class, 'update'])->name('save-edit');
    Route::get('/list', [BlogController::class, 'index'])->name('list');
    Route::post('/store', [BlogController::class, 'store'])->name('store');
    Route::post('/create-blog-title', [BlogController::class, 'createPostTitle'])->name('create-blog-title');
    Route::get('/fetch', [BlogController::class, 'fetch'])->name('fetch');
});

// USER PROFILE ROUTE
Route::middleware(['auth', 'verified'])->name('profile.')->prefix('profile')->group(function () {
    Route::get('/', [UserProfileController::class, 'index'])->name('index');
    Route::get('/edit', [UserProfileController::class, 'edit'])->name('edit');
    Route::post('/store', [UserProfileController::class, 'store'])->name('store');
    Route::post('/change-profile-picture', [UserProfileController::class, 'updateProfilePicture'])->name('change-profile-picture');
});


// ======= AUTHOR PAGES ROUTE ============
Route::middleware(['auth', 'verified'])->name('author.')->prefix('author')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

    // ======== PROFILE SECTION ========
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/edit', [ProfileController::class, 'editProfile'])->name('profile.edit');
    Route::post('/profile/edit/social-media-account', [ProfileController::class, 'addSocialMediaAccount'])->name('profile.edit.social-media-account');
    Route::post('/profile/edit/social-media-account/update', [ProfileController::class, 'updateSocialMediaLink'])->name('profile.edit.social-media-account.update');
    Route::delete('/profile/edit/social-media-account/remove/{id}', [ProfileController::class, 'removeSocialMediaLink'])->name('profile.edit.social-media-account.remove');
    Route::post('/profile/edit/personal-information/save', [ProfileController::class, 'savePersonalInformation'])->name('profile.edit.personal-information.save');
    Route::post('/profile/edit/user-photo/save', [ProfileController::class, 'saveProfilePhoto'])->name('profile.edit.profile-photo.save');
    // ======== PROFILE SECTION ========

});
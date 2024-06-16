<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BlogListController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [BlogListController::class, 'index'])->name('index')->middleware('auth');

// BLOG LIST
Route::middleware('auth')->name('blog-list.')->prefix('blog-list')->group(function () {
    Route::get('/read/{username}/{slug}', [BlogListController::class, 'fetch']);
    Route::get('/blog/{category}', [BlogListController::class, 'blogListCategory'])->name('blog-list-category');
    Route::get('/all', [BlogListController::class, 'blogs'])->name('all');
});

// USER AUTHENTICATION
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/create-account', [AuthController::class, 'createAccount'])->name('create-account');
Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// BLOG ROUTE
Route::name('blog.')->prefix('blog')->group(function () {
    Route::get('/create', [BlogController::class, 'createPage'])->name('create-page');
    Route::get('/edit/{id}', [BlogController::class, 'editPage'])->name('edit-page');
    Route::post('/save-edit', [BlogController::class, 'update'])->name('save-edit');
    Route::get('/list', [BlogController::class, 'index'])->name('list');
    Route::post('/store', [BlogController::class, 'store'])->name('store');
    Route::get('/fetch', [BlogController::class, 'fetch'])->name('fetch');
});

// BLOG ROUTE
Route::middleware('auth')->name('profile.')->prefix('profile')->group(function () {
    Route::get('/', [UserProfileController::class, 'index'])->name('index');
    Route::get('/edit', [UserProfileController::class, 'edit'])->name('edit');
    Route::post('/store', [UserProfileController::class, 'store'])->name('store');
});

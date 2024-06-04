<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Index');
})->name('home')->middleware('auth');

// USER AUTHENTICATION
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::get('/register', [AuthController::class, 'register'])->name('register');
Route::post('/create-account', [AuthController::class, 'createAccount'])->name('create-account');
Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


// BLOG ROUTE
Route::name('blog.')->prefix('blog')->group(function () {
    Route::get('/create', [BlogController::class, 'createPage'])->name('create-page');
    Route::post('/store/{status}', [BlogController::class, 'store'])->name('store');
    Route::get('/fetch', [BlogController::class, 'fetch'])->name('fetch');
});

// BLOG ROUTE
Route::middleware('auth')->name('profile.')->prefix('profile')->group(function () {
    Route::get('/', [UserProfileController::class, 'index'])->name('index');
    Route::get('/edit', [UserProfileController::class, 'edit'])->name('edit');
});

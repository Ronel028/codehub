<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BlogController;
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


// BLOG ROUTE
Route::name('blog.')->prefix('blog')->group(function () {
    Route::get('/create', [BlogController::class, 'createPage'])->name('create-page');
});

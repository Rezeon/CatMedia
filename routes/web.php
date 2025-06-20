<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    if (!Auth::check()) {
        return redirect()->route('login');
    }

    return redirect((route("post.posts")));
})->middleware(['auth', 'verified']);


Route::prefix('post')->name('post.')->group(function () {
    Route::get('/', [PostController::class, 'index'])->name('posts');
    Route::get('/show', [PostController::class, 'show'])->name('post.show');
});

Route::prefix('like')->name('like.')->group(function () {
    Route::get('/', [LikeController::class, 'index'])->name('like');
    Route::get('/show', [LikeController::class, 'show'])->name('like.show');
});

Route::prefix('comment')->name('comment.')->group(function () {
    Route::get('/', [CommentController::class, 'index'])->name('comment');
    Route::get('/show', [CommentController::class, 'show'])->name('comment.show');
});

// Protected Routes
Route::middleware('auth')->group(function () {

    //Profile
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/update', [ProfileController::class, 'update'])->name('update');
        Route::delete('/delete', [ProfileController::class, 'destroy'])->name('destroy');
    });

    // Post
    Route::prefix('post')->name('post.')->group(function () {
        Route::get('/post', [PostController::class, 'create'])->name('post');
        Route::post('/create', [PostController::class, 'store'])->name('create');
        Route::get('/edit/{id}', [PostController::class, 'edit'])->name('edit');
        Route::patch('/update{id}', [PostController::class, 'update'])->name('update');
        Route::delete('/delete{id}', [PostController::class, 'destroy'])->name('delete');
    });

    // Like
    Route::prefix('likes')->name('like.')->group(function () {
        Route::post('/give', [LikeController::class, 'store'])->name('store');
        Route::delete('/{id}', [LikeController::class, 'destroy'])->name('destroy');
    });

    // Comment
    Route::prefix('comment')->name('comments.')->group(function () {
        Route::post('/store', [CommentController::class, 'store'])->name('store');
        Route::put('/update', [CommentController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [CommentController::class, 'destroy'])->name('delete');
    });

    // Message
    Route::prefix('message')->name('message.')->group(function () {
        Route::get('/{receiverId?}', [MessageController::class, 'index'])->name('index');
        Route::get('/show', [MessageController::class, 'show'])->name('show');
        Route::post('/message', [MessageController::class, 'store'])->name('store');
        Route::put('/update/{id}', [MessageController::class, 'update'])->name('update');
        Route::delete('/delete/{id}', [MessageController::class, 'destroy'])->name('destroy');
    });

    // Friend
    Route::prefix('friend')->name('friend.')->group(function () {
        Route::get('/', [FriendController::class, 'index'])->name('index');
        Route::get('/show', [FriendController::class, 'show'])->name('show');
        Route::post('/create', [FriendController::class, 'store'])->name('store');
        Route::put('/update/{id}', [FriendController::class, 'update'])->name('update');
        Route::get('/request', [FriendController::class, 'requests'])->name('requests');
        Route::delete('/delete/{id}', [FriendController::class, 'destroy'])->name('delete');
    });

    Route::get('/search-users', [UserController::class, 'search'])->name('users.search');

});

require __DIR__.'/auth.php';

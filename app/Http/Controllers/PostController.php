<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\Post;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
 public function index()
{
    $authId = Auth::id();
    $posts = Post::with(['user', 'likes.user', 'comments.user'])->latest()->get()->map(function ($post) use ($authId) {
            $friend = Friend::where(function ($q) use ($authId, $post) {
                $q->where('sender_id', $authId)->where('receiver_id', $post->user_id);
            })->orWhere(function ($q) use ($authId, $post) {
                $q->where('sender_id', $post->user_id)->where('receiver_id', $authId);
            })->first();

            $post->friend_status = $friend?->status ?? null;
            return $post;
        });;

    return Inertia::render('Profile/GlobalPost', [
        'posts' => $posts,
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('Profile/PostUser');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $request->validate([
        'content' => 'required|string',
        'photo' => 'nullable|url',
    ]);

    Post::create([
        'user_id' => Auth::id(),
        'content' => $request->content,
        'photo' => $request->photo,
    ]);

    return redirect((route("post.posts")));
}

    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Post::with(['user', 'likes', 'comments'])->findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
         $post = Post::findOrFail($id);

        return Inertia::render('Profile/EditPost' , [
            'post' => $post,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::findOrFail($id);

        if ($post->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'content' => ['required', 'string', 'max:255'],
            'photo' => ['nullable', 'string']
        ]);

        $post->update($validated);
        return redirect(route("post.posts"));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id); 

        if ($post->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->delete();
        return redirect((route("post.posts")));
    }
}

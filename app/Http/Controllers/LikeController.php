<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    /**
     * Display a listing of likes by the authenticated user.
     */
    public function index()
    {
        return Like::where('user_id', Auth::id())->with('post')->get();
    }

    /**
     * Store a new like.
     */
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
        ]);

        $like = Like::firstOrCreate([
            'user_id' => Auth::id(),
            'post_id' => $request->post_id,
        ]);

        return redirect((route("post.posts")));
    }

    /**
     * Display a specific like.
     */
    public function show(string $id)
    {
        $like = Like::findOrFail($id);

        if ($like->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($like);
    }

    /**
     * Remove the like from storage.
     */
    public function destroy(string $id)
    {
        $like = Like::findOrFail($id);

        if ($like->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $like->delete();

        return redirect((route("post.posts")));
    }
}

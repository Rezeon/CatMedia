<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FriendController extends Controller
{
    /**
     * Tampilkan daftar teman yang diterima.
     */
    public function index()
    {
        $userId = Auth::id();

        $friends = Friend::where(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                      ->orWhere('receiver_id', $userId);
            })
            ->where('status', 'accepted')
            ->with(['sender', 'user', 'receiver'])
            ->get();

        $requests = Friend::where('receiver_id', Auth::id())
                    ->where('status', 'pending')
                    ->with('sender')
                    ->get();

        return Inertia::render('Profile/FriendUser',[
            'friends' => $friends,
            'requests' => $requests

        ]) ;
    }

    /**
     * Kirim permintaan pertemanan.
     */
    public function store(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
        ]);

        if ($request->receiver_id == Auth::id()) {
            return response()->json(['message' => 'You cannot add yourself'], 400);
        }

        $existing = Friend::where(function ($query) use ($request) {
                $query->where('sender_id', Auth::id())
                      ->where('receiver_id', $request->receiver_id);
            })
            ->orWhere(function ($query) use ($request) {
                $query->where('sender_id', $request->receiver_id)
                      ->where('receiver_id', Auth::id());
            })
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Friend request already exists or already friends'], 400);
        }

        $friend = Friend::create([
            'sender_id' => Auth::id(),
            'receiver_id' => $request->receiver_id,
            'status' => 'pending',
        ]);

        return Redirect(route("post.posts"));
    }

    /**
     * Tampilkan permintaan pertemanan yang masuk.
     */
    public function show(string $id)
    {
        $friend = Friend::findOrFail($id);

        if ($friend->receiver_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($friend);
    }

    /**
     * Terima atau tolak permintaan pertemanan.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'status' => 'required|in:accepted,declined',
        ]);

        $friend = Friend::findOrFail($id);

        if ($friend->receiver_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $friend->update(['status' => $request->status]);

        return Redirect(route("friend.index"));
    }

    /**
     * Hapus pertemanan.
     */
    public function destroy(string $id)
    {
        $friend = Friend::findOrFail($id);

        if (
            $friend->sender_id != Auth::id() &&
            $friend->receiver_id != Auth::id()
        ) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $friend->delete();

        return Redirect(route("friend.index"));
    }
}

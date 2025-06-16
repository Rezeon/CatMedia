<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class BioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Profile::with(['bio', 'photo'])->latest()->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([ 
            'bio' => 'required|string',
            'photo' => 'nullable|string'
        ]);

        return Profile::create([
            'user_id' => Auth::id(),
            'bio' => $request->bio,
            'photo'=> $request->photo,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
       $profile = Profile::with(['user', 'bio', 'comments'])->findOrFail(Auth::id());

        return Inertia::render( 'Layouts\AuthenticatedLayout' , [
            'profile' => $profile,
        ]);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        $profile = Profile::with('user')->where('user_id', Auth::id())->firstOrFail();

         
        return Inertia::render('Profile/Edit' , [
            'profile' => $profile,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $profile = Profile::where('user_id', Auth::id())->firstOrFail();
    
        $profile->update($request->only('bio', 'photo'));
    
        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

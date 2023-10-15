<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::all()->except(auth()->user()->id);
        return Inertia::render("User/Index", [
            'users' => UserResource::collection($users)
        ]);
    }

    public function edit(Request $request, User $user): Response
    {
        return Inertia::render("User/Edit");
    }
}

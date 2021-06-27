<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function signup(Request $request)
    {
        $validateData = $request->validate([

            'name'     => 'required',
            'email'    => 'email | required | unique:users',
            'password' => 'required'
        ]);
        $validateData['password'] = Hash::make($validateData['password']);
        $user        = User::create($validateData);
        $accessToken = $user->createToken('authToken')->accessToken;
        return response(['user' => $user, 'access_token' => $accessToken]);
    }
}

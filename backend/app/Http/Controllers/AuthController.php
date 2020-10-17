<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
class AuthController extends Controller
{
    function signup(Request $request)
    {
        $validateData = $request->validate([

            'name'     => 'required',
            'email'    => 'email | required | unique:users',
            'password' => 'required'
        ]);

        //$post             = array();
        // $post['name']     = $request->name;
        // $post['email']    = $request->email;
        // $post['password'] = bcrypt($request->password);
        $user             = User::create($request->all());
        $accessToken      = $user->createToken('authToken')->accessToken;
        return response(['user' => $user, 'access_token' => $accessToken]);
    }
}

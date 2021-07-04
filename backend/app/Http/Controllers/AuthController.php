<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use Exception;

class AuthController extends Controller
{
    function signup(Request $request)
    {
        try {
            $validateData = $request->validate([

                'name'     => 'required',
                'email'    => 'email | required | unique:users',
                'password' => 'required'
            ]);
            $validateData['password'] = Hash::make($validateData['password']);
            $validateData['role_id']  =  3;
            $user        = User::create($validateData);
            if($user){
                $accessToken = $user->createToken('authToken')->accessToken;
                return response(['user' => $user, 'access_token' => $accessToken]);
            }else{
                return response()->json(['code' => 2, 'message' => "Somthing went wrong, Please try after sometime." . PHP_EOL]);  
            }
            
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }
}

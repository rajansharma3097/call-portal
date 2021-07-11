<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\User;
use Exception;

class AuthController extends Controller
{
    /**
     *For Signup user
     *@author  Birendra Kanwasi <bkanwasi21@gmail.com>
     */
    function signup(Request $request)
    {
        try {
            $validateData = $request->validate([

                'name'     => 'required',
                'email'    => 'email | required | unique:users',
                'password' => 'required'
            ]);

            $validateData['password'] = Hash::make($validateData['password']);
            $validateData['role_id']  =  3; //
            $user        = User::create($validateData);
            if ($user) {
                $accessToken = $accessToken = User::generateToken($user);
                return response(['user' => $user, 'access_token' => $accessToken, 'code' => 1]);
            } else {
                return response()->json(['code' => 2, 'message' => "Somthing went wrong, Please try after sometime." . PHP_EOL]);
            }
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }


    /**
     *For Login user
     *@author  Birendra Kanwasi <bkanwasi21@gmail.com>
     */
    function login(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email|max:255',
                'password' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json(['code' => 2, 'message' =>  $validator->messages()->first()]);
            }

            $user = User::where('email', $request->email)->first();

            if ($user) {
                if (Hash::check($request->password, $user->password)) {
                    $accessToken = User::generateToken($user);
                    return response(['user' => $user, 'access_token' => $accessToken, 'code' => 1]);
                } else {
                    return response()->json(['code' => 2, 'message' => "Invalid Password"]);
                }
            } else {

                return response()->json(['code' => 2, 'message' => "The email id not registered"]);
            }
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }


    /**
     *For Switch user account
     *@author  Birendra Kanwasi <bkanwasi21@gmail.com>
     */
    public function switchAccount(Request $request, $userId)
    {

        try {
            $user           = User::find($userId);
            $isAdmin= 1;
            if ($user) {
                $accessToken  = User::generateToken($user,$isAdmin);
                return response(['user' => $user, 'access_token' => $accessToken,  'code' => 1]);
            } else {
                return response()->json(['code' => 2, 'message' => "User detail not found." . PHP_EOL]);
            }
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\User;
use App\Models\TblCountry;
use App\Models\TblTimezone;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{

    /**
     * For Updating User Passowrd
     * @author  Birendra Kanwasi <bkanwasi21@gmail.com>
     */
    function updatePassword(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'newPassword'     => 'required|max:255',
                'confirmPassword' => 'required|max:255|same:newPassword',
            ]);

            if ($validator->fails()) {
                return response()->json(['code' => 2, 'message' =>  $validator->messages()->first()]);
            }

            $userId       = $request->user()->id ?? 0;
            $userObj      = User::find($userId);
            if (!empty($userObj)) {

                $userObj->password =  Hash::make($request->newPassword);
                $userObj->update();
                return response()->json(['code' => 1, 'message' => 'Password has been changed successfully.']);
            } else {
                return response()->json(['code' => 2, 'message' => 'No record found.']);
            }
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    /**
     * For get User
     * @author  Birendra Kanwasi <bkanwasi21@gmail.com>
     */
    function getUser(Request $request)
    {

        try {
            $userId  = $request->user()->id ?? 0;
            $getUser = User::getUser($userId)[0];
            return response()->json(['code' => 1, 'message' => 'success', 'userDetails' => $getUser]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    function updateUser(Request $request)
    {

        try {

            $userId       = $request->user()->id ?? 0;

            if (isset($request->email)) {

                $validator = Validator::make($request->all(), [
                    'firstName'     => 'required|max:255',
                    'lastName' => 'required|max:255',
                    'email' => 'unique:users,email,' . $userId
                ]);

                if ($validator->fails()) {
                    return response()->json(['code' => 2, 'message' =>  $validator->messages()->first()]);
                }
            }

            User::updateUser($request, $userId);
            return response()->json(['code' => 1, 'message' => 'Updated successfully!']);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    function getCountryList()
    {

        try {
            return response()->json(['code' => 1, 'message' => 'success', 'data' => TblCountry::getCountryList()]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    function getTimezoneList()
    {

        try {
            return response()->json(['code' => 1, 'message' => 'success', 'data' => TblTimezone::getTimezoneList()]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }
}

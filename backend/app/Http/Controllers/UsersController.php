<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{


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
            $userObj      = User::getUserDetail($userId);
            if(!empty($userObj)){
               
                $userObj->password =  Hash::make($request->newPassword); ;
                $userObj->update();
                return response()->json(['code' => 1, 'message' => 'Password has been changed successfully.']);
            }else{
                return response()->json(['code' => 2, 'message' => 'No record found.']);
            }
          
            
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    function getUserDetail(Request $request)
    {

        try {
            $userId       = $request->user()->id ?? 0;
            $tblOptionObj = new User();
            $encryptData  = array();
            $encryptData['twilioAccountSid'] =  $request->twilioAccountSid;
            $encryptData['twilioAuthToken']  =  $request->twilioAuthToken;
            $metaValue   = $tblOptionObj->getEncryptDecryptMetaValue('encrypt', $encryptData);
            $tblOptionObj->saveOptionRecord($userId, 'twilio_credentials', $metaValue);
            return response()->json(['code' => 1, 'message' => 'Twilio account had been linked sucessfully.', 'meta_value' => $metaValue]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    function updateAccountDetails(Request $request)
    {

        try {
            $userId       = $request->user()->id ?? 0;
            $tblOptionObj = new User();
            $encryptData  = array();
            $encryptData['twilioAccountSid'] =  $request->twilioAccountSid;
            $encryptData['twilioAuthToken']  =  $request->twilioAuthToken;
            $metaValue   = $tblOptionObj->getEncryptDecryptMetaValue('encrypt', $encryptData);
            $tblOptionObj->saveOptionRecord($userId, 'twilio_credentials', $metaValue);
            return response()->json(['code' => 1, 'message' => 'Twilio account had been linked sucessfully.', 'meta_value' => $metaValue]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }
}

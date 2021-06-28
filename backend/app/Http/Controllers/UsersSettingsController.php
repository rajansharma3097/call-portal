<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TblUserOption;
use Illuminate\Support\Facades\Validator;
use Exception;

class UsersSettingsController extends Controller
{
    function saveTwilioCredentials(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'twilioAccountSid' => 'required|max:255',
                'twilioAuthToken' => 'required|max:255',
            ]);

            if ($validator->fails()) {
                return response()->json(['code' => 2, 'message' =>  $validator->messages()->first()]);
            }

            $userId       = $request->user()->id ?? 0;
            $tblOptionObj = new TblUserOption();
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

    function fetchTwilioCredentials()
    {
    }

    function removeCredentials(Request $request, $metaKey)
    {

        try {

            $tblOptionObj = new TblUserOption();
            $getOptions   = $tblOptionObj->getOption($metaKey, $request->user()->id);
            if ($getOptions) {
                $getOptions->status     = 0;
                $getOptions->meta_value = "";
                $getOptions->updated_at = date('Y-m-d H:i:s');
                $getOptions->update();
                return response()->json(['code' => 1, 'message' => 'Twilio account has been removed succesfully.']);
            } else {
                return response()->json(['code' => 2, 'message' => 'Not found any record.']);
            }
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }
}

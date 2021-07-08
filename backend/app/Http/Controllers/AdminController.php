<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TblAudio;
use App\Models\TblSource;
use App\User;
use Carbon\Carbon;
use Exception;

class AdminController extends Controller
{
    /**
     * For Uploading Admin Audios
     * @author  RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function uploadAudio(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'audio_name' => 'required|max:255',
            'file' => 'required|file|mimes:audio/mpeg,mp3,wav|max:1048',
        ]);

        if ($validator->fails()) {
            return response()->json(['code' => 2, 'message' =>  $validator->messages()->first()]);
        }

        // code for upload 'file'
        if($request->hasFile('file')) {
            $file = $request->file('file');
            $uniqueid = uniqid();
            $extension = $file->getClientOriginalExtension();
            $filename = Carbon::now()->format('Ymd').'_'.$uniqueid.'.'.$extension;
            $file->move('uploads/audios/', $filename);
        } else {
            return response()->json(['code' => 2, 'message' => 'Unable to upload file']);
        }

        $audioObject = new TblAudio;
        $audioObject->user_id    = $request->user()->id;
        $audioObject->audio_name = $request->audio_name;
        $audioObject->audio_file = $filename;
        $audioObject->added_by   = 1;
        $audioObject->status     = 1;
        $audioObject->created_at = date('Y-m-d H:i:s');
        $saved = $audioObject->save();
        if( !$saved ) {
            return response()->json(['code' => 2, 'message' => 'Problem in saving data']);
        }
        return response()->json(['code' => 1, 'message' => 'Audio Added Successfully.']);
    }

    /**
     * Get Audio Listing for Admin
     *
     * @param Request $request
     * @author RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function audioList(Request $request)
    {
        $userId = $request->user()->id ?? 0;

        $audioObject = new TblAudio();
        $audioList   = $audioObject->getAdminAudioList($userId);

        return response()->json(['code' => 1, 'data' => $audioList]);

    }

    public function deleteAudio(Request $request, $id)
    {
        $audioDelete = TblAudio::findOrFail($id);

        if( $audioDelete ) {
            $audioDelete->status = 0;
            $audioDelete->update();
            return response()->json(['code' => 1, 'message' => "Audio Deleted Successfully."]);
        } else {
            return response()->json(['code' => 2, 'message' => "Audio Detail Not Found"]);
        }

    }

    /**
     * For Add Admin Source
     * @author  RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function addSource(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'sourceName' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['code' => 2, 'message' =>  $validator->messages()->first()]);
        }

        $sourceId = $request->sourceId;
        $sourceObject = new TblSource();
        $sourceDetail = $sourceObject->getSourceById($sourceId, $request->user()->id);
        if(empty($sourceDetail))
        {
            $sourceObject->user_id     = $request->user()->id;
            $sourceObject->source_name = $request->sourceName;
            $sourceObject->type        = 1;
            $sourceObject->created_at  = date('Y-m-d H:i:s');
            $saved = $sourceObject->save();
            if( !$saved ) {
                return response()->json(['code' => 2, 'message' => 'Problem in saving data']);
            }
            $message = 'Source Added Successfully.';
        } else {
            $sourceDetail->source_name = $request->sourceName;
            $sourceDetail->updated_at  = date('Y-m-d H:i:s');
            $updated = $sourceDetail->update();
            if( !$updated ) {
                return response()->json(['code' => 2, 'message' => 'Problem in updating data']);
            }
            $message = 'Source Updated Successfully.';
        }
        return response()->json(['code' => 1, 'message' => $message]);
    }

    /**
     * Get Audio Listing for Admin
     *
     * @param Request $request
     * @author RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function sourceList(Request $request)
    {
        $userId = $request->user()->id ?? 0;

        $sourceObject = new TblSource();
        $sourceList   = $sourceObject->getAdminSourceList($userId);

        return response()->json(['code' => 1, 'data' => $sourceList]);

    }

    public function deleteSource(Request $request, $id)
    {
        $sourceDelete = TblSource::findOrFail($id);

        if( $sourceDelete ) {
            $sourceDelete->delete();
            return response()->json(['code' => 1, 'message' => "Source Deleted Successfully."]);
        } else {
            return response()->json(['code' => 2, 'message' => "Source Detail Not Found"]);
        }

    }

    public function getSingleSource(Request $request, $id)
    {
        $userId = $request->user()->id ?? 0;
        $sourceObject = new TblSource();
        $sourceData   = $sourceObject->getSourceById($id, $userId);
        if($sourceData) {
            return response()->json(['code' => 1, 'sourceDetail' => $sourceData]);
        } else {
            return response()->json(['code' => 2, 'message' => "Source Detail Not Found"]);
        }
    }


    public function getUserList(Request $request)
    {
        try {
            
            if($request->user()->role_id == 1){
               
                $obj = new User();
                $search = $request->query('search');
                return response()->json(['code' => 1, 'data' => $obj->getUserList( $search )]);

            }else{
                return response()->json(['code' => 2, 'message'=>"UnAuthorized Access!"]); 
            }
           
        } catch (Exception $ex) {
            return response()->json(['code' => 2, 'message' => $ex->getMessage() . " Line No " . $ex->getLine()]);
        }
    }

}

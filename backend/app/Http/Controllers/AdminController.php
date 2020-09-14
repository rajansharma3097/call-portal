<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TblAudio;
use Carbon\Carbon;

class AdminController extends Controller
{
    /**
     * For Uploading Admin Audios
     * @author  RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function uploadAudio(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'user_id' => 'required',
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

}

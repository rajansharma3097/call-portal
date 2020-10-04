<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TblEmailTemplate;
use Exception;

class EmailTemplateController extends Controller
{
    //
    /**
     * Get Email List
     * @param Request $request
     * @author Birendar Kanwasi <bkanwasi21@gmail.com>
     */
    public function list(Request $request)
    {
        try {
            $userId = $request->user()->id ?? 0;
            $emailTemplateObject = new TblEmailTemplate();
            $emailList   = $emailTemplateObject->getEmailTemplate();
            return response()->json(['code' => 1, 'data' => $emailList]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    /**
     * Get Email Template By ID
     * @param Request $request
     * @author Birendar Kanwasi <bkanwasi21@gmail.com>
     */
    function get(Request $request,$id)
    {

        try {
          
            $emailTemplateObject =  new TblEmailTemplate();
            $result   = $emailTemplateObject->getEmailTemplateById($id);
            return response()->json(['code' => 1, 'data' => $result]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    /**
     * The function Update Email Template
     * @param Request $request
     * @author Birendar Kanwasi <bkanwasi21@gmail.com>
     */
    function update(Request $request)
    {
        try {
            $emailTemplate          = TblEmailTemplate::find($request->id);
            if (!$emailTemplate)
                return response()->json(['code' => 2, 'message' => 'Email Template not found.']);

            $emailTemplate->title   = $request->title;
            $emailTemplate->body    = $request->email_body;
            $emailTemplate->subject = $request->subject;
            $emailTemplate->save();
            return response()->json(['code' => 1, 'message' => 'Email Template updated successfully']);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }
}

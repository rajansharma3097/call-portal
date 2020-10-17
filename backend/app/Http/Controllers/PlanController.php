<?php

namespace App\Http\Controllers;

use App\Models\TblPlan;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Exception;

class PlanController extends Controller
{

    //
    /**
     * Get Plan List
     * @param Request $request
     * @author Birendar Kanwasi <bkanwasi21@gmail.com>
     */
    public function list(Request $request)
    {
        try {

            $obj        = new TblPlan();
            $planList   = $obj->getPlanList();
            return response()->json(['code' => 1, 'data' => $planList]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }

    /**
     * Get Plan By ID
     * @param Request $request
     * @author Birendar Kanwasi <bkanwasi21@gmail.com>
     */
    function get(Request $request, $id)
    {

        try {

            $obj      =  new TblPlan();
            return response()->json(['code' => 1, 'data' => $obj->getPlanById($id)]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }



    /**
     * The function Add Plan
     * @param Request $request
     * @author Birendar Kanwasi <bkanwasi21@gmail.com>
     */
    function add(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'plan_name' => 'required',

            ]);

            if ($validator->fails()) {
                return response()->json(['code' => 2, 'message' =>  $validator->messages()->first()]);
            }

            $obj          = ($request->id > 0) ? TblPlan::find($request->id) : new TblPlan();
            $message      = ($request->id > 0) ? "Plan updated successfully" : "Plan added successfully";

            if (!$obj)
                return response()->json(['code' => 2, 'message' => 'Plan not found.']);

            $obj->plan_name        = $request->plan_name;
            $obj->plan_description = $request->plan_description;
            $obj->signup_cost = $request->signup_cost;
            $obj->status = 1;
            $obj->save();
            return response()->json(['code' => 1, 'message' => $message]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }


    /**
     * The function delete Plan
     * @param Request $request
     * @author Birendar Kanwasi <bkanwasi21@gmail.com>
     */
    function delete(Request $request, $id)
    {

        try {

            $obj      =  TblPlan::find($request->id);

            if (!$obj)
                return response()->json(['code' => 2, 'message' => 'Plan not found.']);

            $obj->status = 0;
            $obj->save();
            return response()->json(['code' => 1, 'message' => "Plan has been deleted successfully."]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }
    }
}

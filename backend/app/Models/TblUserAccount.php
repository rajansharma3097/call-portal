<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblUserAccount extends Model
{
    use HasFactory;

    public static function insertUpdate($request, $userId)
    {

        $obj = TblUserAccount::where('user_id', $userId)->first();
        if ($obj) {

            if (isset($request->address) || isset($request->country_id)) {
                $obj->address = $request->address;
                $obj->timezone_id = $request->timezone_id;
                $obj->city   = $request->city;
                $obj->state  = $request->state;
                $obj->country_id  = $request->country_id;
                $obj->zip         = $request->zip;
            } else {
                $obj->phone  = $request->phone;
            }

            return $obj->update();
        } else {

            $data                = array();
            $data['user_id']     = $userId;
            if (isset($request->address) || isset($request->country_id)) {
                $data['timezone_id'] = $request->timezone_id;
                $data['country_id']  = $request->country_id;
                $data['city']        = $request->city;
                $data['state']       = $request->state;
                $data['address']     = $request->address;
                $data['zip']         = $request->zip;
                $data['created_at']  = date('Y-m-d H:i:s');
            } else {
                $data['phone']      = $request->phone;
                $data['created_at'] = date('Y-m-d H:i:s');
            }
            return TblUserAccount::insertGetId($data);
        }
    }
}

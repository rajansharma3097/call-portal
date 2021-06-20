<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TblCountry;
use App\Models\TblTimezone;
use Exception;

class CommonController extends Controller
{
    /**
     * Get Country Listing
     *
     * @param Request $request
     * @author RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function countryList(Request $request)
    {
        try 
        {
            $countryList   = (new TblCountry())->getCountryList();
            return response()->json(['code' => 1, 'data' => $countryList]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }

    }

    /**
     * Get Country Listing
     *
     * @param Request $request
     * @author RJay Sharma <sharma.rajan3097@gmail.com>
     */
    public function timezoneList(Request $request)
    {
        try 
        {
            $timezoneList   = (new TblTimezone())->getTimezoneList();
            return response()->json(['code' => 1, 'data' => $timezoneList]);
        } catch (Exception $e) {
            return response()->json(['code' => 2, 'message' => $e->getMessage() . PHP_EOL]);
        }

    }
}

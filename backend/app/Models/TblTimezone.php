<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblTimezone extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_timezone';

    /**
     * Get Timezone Listing
     * @return  [array]
     */
    public function getTimezoneList()
    {
        return $this->all()->toArray();
   
    }


    /*
     * Get Timezone Listing for User
     */
    public static function getTimezoneList2()
    {
        return TblTimeZone::where([
            ['status', 1]
            ])->get()->toArray();
    } 
}

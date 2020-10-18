<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblPlan extends Model
{
    //
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_plan';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**  
     * The function return plan list
     * @return  [array]
     */
    function getPlanList()
    {

        return TblPlan::where([
            ['status', 1]
        ])->paginate(15)->toArray();
    }


    /**  
     * Get plan By id
     * @return  [array]
     */
    function getPlanById($id)
    {

        return  TblPlan::find($id)
            ->toArray();
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblSource extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_source';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';


    /**
     * Get Audio Listing for Admin
     * @param   [integer]  $userId
     * @return  [array]
     */
    public function getAdminSourceList( $userId )
    {
        return $this::where([
            ['user_id', $userId],
            ['type' , 1],
            ])->paginate(15)->toArray();
    }

    /**
     * Get Source By Id
     * @param   [type]  $sourceId
     * @param   [type]  $userId
     * @return  [array|object]
     */
    public function getSourceById($sourceId, $userId)
    {
        return $this::where([
           'id'      => $sourceId,
           'user_id' => $userId,
        ])->first();
    }

}

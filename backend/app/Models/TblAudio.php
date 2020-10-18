<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblAudio extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_audio';

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
    public function getAdminAudioList( $userId )
    {
        return TblAudio::where([
            ['user_id', $userId],
            ['added_by' , 1],
            ['status', 1]
            ])->paginate(15)->toArray();
    }

}

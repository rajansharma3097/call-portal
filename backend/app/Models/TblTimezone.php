<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblTimezone extends Model
{
    use HasFactory;

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
}

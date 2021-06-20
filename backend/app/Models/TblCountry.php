<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblCountry extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_country';

    /**
     * Get Country Listing
     * @param   [integer]  $userId
     * @return  [array]
     */
    public function getCountryList()
    {
        return $this->all()->toArray();
    }
}

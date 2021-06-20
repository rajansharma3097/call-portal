<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblCompanies extends Model
{
    use HasFactory;

    /**
     * Get Company Listing with pagination
     * @param   [integer]  $userId
     * @return  [array]
     */
    public function getCompanyList( $userId )
    {
        return $this->where([
            ['user_id', $userId],
            ['status', 1]
            ])->paginate(15)->toArray();
    }

    /**
     * Get Source By Id
     * @param   [type]  $companyId
     * @param   [type]  $userId
     * @return  [array|object]
     */
    public function getCompanyById($companyId, $userId)
    {
        return $this::where([
           'id'      => $companyId,
           'user_id' => $userId,
        ])->first();
    }

    /**
     * Get User's All Active Companies
     * @param   [integer]  $userId
     */
    public function getAllActiveCompanies($userId)
    {
        return $this->select(['id','company_name'])->where(['user_id' => $userId, 'status' => 1])->get()->toArray();
    }

}

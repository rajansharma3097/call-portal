<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TblCampaigns extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_campaigns';

    /**
     * Get Company Listing with pagination
     * @param   [integer]  $userId
     * @return  [array]
     */
    public function getCampaignList( $userId )
    {
        return $this->with('company')->where([
            ['user_id', $userId],
            ['status', 1]
            ])->paginate(15)->toArray();
    }

    /**
     * Get the company record associated with the campaign.
     */
    public function company()
    {
        return $this->belongsTo('App\Models\TblCompanies');
    }

    /**
     * Get Campaign By Id
     * @param   [type]  $campaignId
     * @param   [type]  $userId
     * @return  [array|object]
     */
    public function getCampaignById($campaignId, $userId)
    {
        return $this::where([
           'id'      => $campaignId,
           'user_id' => $userId,
           'status'  => 1
        ])->first();
    }

}

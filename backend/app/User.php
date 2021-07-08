<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\TblUserAccount;
use Illuminate\Support\Facades\DB;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'role_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * The Method return user detail
     * @param $userId [integer]
     * @return [array]
     */
    public static function getUser($userId)
    {
        return  User::select(
            'users.name',
            'users.first_name',
            'users.last_name',
            'users.email',
            'users.email_verified_at',
            'ua.country_id',
            'ua.timezone_id',
            'ua.address',
            'ua.city',
            'ua.state',
            'ua.zip',
            'ua.phone'
        )
            ->leftJoin('tbl_user_accounts as ua', 'users.id', '=', 'ua.user_id')
            ->where('users.id', $userId)->get()->toArray();
    }

    /**
     * The Method update User Account Details
     *  @param [Global Array] Form Handler Request, [Integer] $userId
     *  @return [integer] Last Insert ID
     */
    public static function updateUser($request, $userId)
    {
        if (isset($request->firstName)) {

            $objUser = User::find($userId);
            $objUser->first_name = $request->firstName;
            $objUser->last_name  = $request->lastName;
            $objUser->email = $request->email;
            $objUser->update();
        }

        $isAddressFormRequest = (isset($request->address) || isset($request->phone) || isset($request->country_id)) ? true : false;

        if ($isAddressFormRequest)
            return TblUserAccount::insertUpdate($request, $userId); // Update user 

    }

    /**
     *  The method return user list.
     *  @param   [void]
     *  @return  [array] 
     */
    public function getUserList($search = "")
    {
        return $this->where([
            ['role_id', 3],
            ['email', 'like', '%' . $search . '%']
        ])->paginate(15)->toArray();
    }
}

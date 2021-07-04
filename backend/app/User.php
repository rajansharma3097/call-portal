<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Models\TblUserAccount;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','role_id',
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
     *
     * @var integer
     */
    public static function getUser($id)
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
            ->where('users.id', $id)->get()->toArray();
    }

    /**
     * The Method update User Details
     *
     * @var array
     */
    public static function updateUser($request, $userId)
    {
        if(isset($request->firstName)){
         
           $objUser = User::find($userId);
           $objUser->first_name =$request->firstName;
           $objUser->last_name  = $request->lastName;
           $objUser->email = $request->email;
           $objUser->update();    
        }
        
        $isAddressFormRequest = (isset($request->address) || isset($request->phone) || isset($request->country_id))?true:false;
        
        if($isAddressFormRequest){

            return TblUserAccount::insertUpdate($request, $userId); // Update user 
        }
    }
}

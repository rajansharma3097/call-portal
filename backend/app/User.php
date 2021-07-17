<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use App\Models\TblUserAccount;
use Illuminate\Support\Facades\DB;
use phpDocumentor\Reflection\Types\Boolean;
use Ramsey\Uuid\Type\Integer;

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
     *  @author  Birendra Kanwasi <bkanwasi21@gmail.com>
     */
    public function getUserList()
    {
        $status = [2 => 1, 3 => 0]; // 1=> Active Users,  0 => Deactive User //
        $filters = [
            'email'  => empty($_REQUEST['search']) ? "" : trim($_REQUEST['search']),
            'status' => (isset($_REQUEST['tab']) && $_REQUEST['tab'] == 1) ? null : $status[$_REQUEST['tab']] ?? null
        ];

        return $this->where(

            function ($query) use ($filters) {
                foreach ($filters as $column => $val) {
                    if (!empty(trim($val)) || ($val === 0)) $query->where($column, $val);
                }
            }
        )->role()->paginate(15)->toArray();

        /* dd($this->where(

            function($query) use ($filters)
            {
                foreach ( $filters as $column => $val )
                {
                    //$value = $column;

                    if ( !empty(trim($val))) $query->where($column, $val);
                }
            }
        )->role()->toSql());*/
    }

    public function scopeRole($query)
    {

        return $query->where('role_id', 3);
    }


    /**
     *  The method return token generator
     *  @param   [Object]
     *  @return  [string] 
     *  @author  Birendra Kanwasi <bkanwasi21@gmail.com>
     */
    public static function generateToken(object $user, $isAdminSwitchAccount = 0): string
    {
        if ($isAdminSwitchAccount)
            return $user->createToken('authToken', ['isAdmin', 'isSuperAdmin', 'isUser', 'isCompany'])->accessToken;


        switch ($user->role_id) {

            case 1:
                $accessToken = $user->createToken('authToken', ['isAdmin', 'isSuperAdmin', 'isUser', 'isCompany'])->accessToken;
                break;
            case 2:
                $accessToken = $user->createToken('authToken', ['isSuperAdmin'])->accessToken;
            case 3:
                $accessToken = $user->createToken('authToken', ['isUser'])->accessToken;
                break;
            case 4:
                $accessToken = $user->createToken('authToken', ['isCompany'])->accessToken;
            default:
                $accessToken = "";
                break;
        }

        return  $accessToken;
    }
}

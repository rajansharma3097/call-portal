<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use  App\Component\Encryption;

class TblUserOption extends Model
{
    //
    protected $table = 'tbl_user_option';

    function getEncryptDecryptMetaValue($action, $request)
    {
        $encryptObj      =   new Encryption();
        $metaValue      =   $encryptObj->EncryptDecrypt($action, $request);
        return $metaValue;
    }


    function saveOptionRecord($userId, $metaKey, $metaValue)
    {
        $getOptions = $this->getOption($metaKey, $userId);

        if (!empty($getOptions)) {
            $getOptions->user_id    = $userId;
            $getOptions->meta_key   = $metaKey;
            $getOptions->meta_value = $metaValue;
            $getOptions->updated_at = date('Y-m-d H:i:s');
            $getOptions->status     = 1;
            $getOptions->update();
        } else {
            $this->user_id    = $userId;
            $this->meta_key   = $metaKey;
            $this->meta_value = $metaValue;
            $this->status     = 1;
            $this->created_at = date('Y-m-d H:i:s');
            $this->save();
        }
    }

    public function getOption($metaKey, $userId)
    {
        return $this::where([
            'meta_key'      => $metaKey,
            'user_id' => $userId,
        ])->first();
    }
}

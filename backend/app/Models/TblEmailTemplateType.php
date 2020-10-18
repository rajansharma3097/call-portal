<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblEmailTemplateType extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_email_template_types';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';
    //

    /**
     * Get the Email Template
     */
    public function emailTemplate()
    {
        return $this->hasOne('App\Models\TblEmailTemplate','template_type_id');
    }
}

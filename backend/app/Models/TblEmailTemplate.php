<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TblEmailTemplate extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tbl_email_templates';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';


    /**
     * Get Email Listing for Admin
     * @return  [array]
     */
    public function getEmailTemplate()
    {
        return TblEmailTemplate::where([
            ['status', 1]
            ])->paginate(15)->toArray();
    }

    /**
     * Get Token 
     * @return  [array]
     */
    public function token()
    {
        return $this->belongsTo('App\Models\TblEmailTemplateType','id');
    }

    /**  
     * Get Email Template
     * @return  [array]
     */ 
     public function getEmailTemplateById($id){

        return  TblEmailTemplate::select('tbl_email_templates.id', 
            'token', 
            'title',
            'subject', 
            'body')
            ->join('tbl_email_template_types as T', 'T.id', '=', 'tbl_email_templates.template_type_id')
            ->where([
                ['tbl_email_templates.id', $id]
            ])
            ->first()
            ->toArray();
     }
}

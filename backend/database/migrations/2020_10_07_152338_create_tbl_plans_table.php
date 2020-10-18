<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_plan', function (Blueprint $table) {
           // $table->engine = 'MyISAM';
            $table->id();
            $table->string('plan_name',255);
            $table->double('signup_cost', 8, 2);
            $table->longText('plan_description');
            $table->tinyInteger('status')->comment('1 => means for active, 0=>delete');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_plan');
    }
}

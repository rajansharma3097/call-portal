<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblCountryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
          Schema::create('tbl_country', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->string('country_name', 100);
            $table->string('iso_code', 10);
            $table->string('country_code', 15);
            $table->double('local_phone_cost', 10, 2);
            $table->double('toll_phone_cost', 10, 2);
            $table->double('mobile_phone_cost', 10, 2);
            $table->string('country_code_cost', 15);
            $table->tinyInteger('status')->default(1)->comment("1=>Active,0=>Deleted");
            $table->tinyInteger('is_buy')->default(1);
        });  
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_country');
    }
}

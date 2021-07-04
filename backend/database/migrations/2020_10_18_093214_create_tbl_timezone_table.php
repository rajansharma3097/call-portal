<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblTimezoneTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_timezone', function (Blueprint $table) {
            $table->id();
            $table->time('GMT', 0);
            $table->string('name', 255);
            $table->string('timezone_gmt_symbol', 10);
            $table->string('timezone_name', 255);
            $table->tinyInteger('status')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_timezone');
    }
}

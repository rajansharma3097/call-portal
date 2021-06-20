<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblUserOptionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_user_option', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('meta_key', 100);
            $table->string('meta_value',250);
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
        Schema::dropIfExists('tbl_user_option');
    }
}

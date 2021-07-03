<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblUserAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_user_accounts', function (Blueprint $table) {   
            $table->bigIncrements('id');
            $table->bigInteger('user_id')->unique()->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('country_id')->unsigned();
            $table->integer('timezone_id')->unsigned();
            $table->text('address')->nullable(true);
            $table->string('city',100)->nullable(true);
            $table->string('state',100)->nullable(true);
            $table->string('zip',100)->nullable(true);
            $table->string('phone',100)->nullable(true);
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
        Schema::dropIfExists('tbl_user_accounts');
    }
}

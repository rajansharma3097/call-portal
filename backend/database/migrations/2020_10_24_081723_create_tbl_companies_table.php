<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('company_name', 255);
            $table->string('company_email', 100);
            $table->foreignId('country_id')->unsigned()->constrained('tbl_country');
            $table->string('phone_number', 50);
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('company_website', 255);
            $table->string('address', 500);
            $table->string('city', 255);
            $table->string('state', 255);
            $table->string('zip', 255);
            $table->tinyInteger('status')->default(1);
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
        Schema::dropIfExists('tbl_companies');
    }
}

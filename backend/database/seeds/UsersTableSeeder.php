<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * @return void
     */
    public function run()
    {
        //
          
        DB::table('users')->insert([
            'role_id' => '1',
            'name' => 'Admin',
            'email' => 'callportal@callPortal.com',
            'password' =>  bcrypt('admin@callPortal'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        
        DB::table('users')->insert([
            'role_id' => '2',
            'name' => 'SupportAdmin',
            'email' => 'support@callPortal.com',
            'password' =>  bcrypt('supportAdmin@callPortal'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);

        DB::table('users')->insert([
            'role_id' => '3',
            'name' => 'User',
            'email' => 'user@callPortal.com',
            'password' => bcrypt('user@callPortal.com'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        
        DB::table('users')->insert([
            'role_id' => '4',
            'name' => 'Company',
            'email' => 'company@callPortal.com',
            'password' => bcrypt('company@callPortal.com'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        //



    }
}

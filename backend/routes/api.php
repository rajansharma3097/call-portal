<?php

use App\Http\Controllers\EmailTemplateController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:api'])->get('/token/revoke', function (Request $request) {

    DB::table('oauth_access_tokens')
        ->where('user_id', $request->user()->id)
        ->update([
            'revoked' => true
        ]);
    return response()->json('DONE');
}); 

Route::post('/signup','AuthController@signup');

/** Route Prefix for Admin Routes */
Route::group(['prefix' => 'admin',  'middleware' =>['auth:api']], function() {
    Route::post('upload-audio', 'AdminController@uploadAudio');
    Route::get('audio-list', 'AdminController@audioList');
    Route::delete('delete-audio/{id}', 'AdminController@deleteAudio');
    
});

/*
*AdminEmail template Routing
*/
Route::group(['prefix' => 'admin',  'middleware' => ['auth:api']
], function () {

    Route::get('email-template-list',     'EmailTemplateController@list');
    Route::get('edit-email-template/{id}','EmailTemplateController@get');
    Route::post('update-email-template',  'EmailTemplateController@update');

});


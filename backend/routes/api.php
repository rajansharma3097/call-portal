<?php

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
 //['isAdmin', 'isSuperAdmin', 'isUser', 'isCompany'] Auth scops

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

Route::post('/signup', 'AuthController@signup');
Route::post('/login', 'AuthController@login');

/** Route Prefix for Admin Routes */
Route::group(['prefix' => 'admin',  'middleware' => ['auth:api']], function () {

    Route::post('upload-audio', 'AdminController@uploadAudio');
    Route::get('audio-list', 'AdminController@audioList');
    Route::delete('delete-audio/{id}', 'AdminController@deleteAudio');
    Route::post('add-source', 'AdminController@addSource');
    Route::get('source-list', 'AdminController@sourceList');
    Route::get('get-source/{id}', 'AdminController@getSingleSource');
    Route::delete('delete-source/{id}', 'AdminController@deleteSource');
    Route::get('switch-account/{userId}',    'AuthController@switchAccount');
});

/*
*AdminEmail template Routing
*/
Route::group(['prefix' => 'admin',  'middleware' => ['auth:api']], function () {

    Route::get('email-template-list',     'EmailTemplateController@list');
    Route::get('edit-email-template/{id}', 'EmailTemplateController@get');
    Route::post('update-email-template',  'EmailTemplateController@update');
});

/*
*Plan Routing
*/
Route::group(['prefix' => 'admin',  'middleware' => ['auth:api']], function () {

    Route::get('plan-list',     'PlanController@list');
    Route::get('edit-plan/{id}', 'PlanController@get');
    Route::post('add-plan',     'PlanController@add');
    Route::delete('delete-plan/{id}',  'PlanController@delete');
});

/**
 * Company Routes
 */
Route::group(['middleware' => ['auth:api']], function () {

    Route::post('add-company', 'CompanyController@addCompany');
    Route::get('company-list', 'CompanyController@companyList');
    Route::get('get-company/{id}', 'CompanyController@getCompanyById');
    Route::delete('delete-company/{id}', 'CompanyController@deleteCompany');
    Route::get('get-companies', 'CompanyController@activeCompaniesList');
    Route::post('add-campaign', 'CompanyController@addCampaign');
    Route::get('campaign-list', 'CompanyController@campaignList');
    Route::get('get-campaign/{id}', 'CompanyController@getCampaignById');
});


/**
 * Common Routes
 */
Route::group(['middleware' => ['auth:api']], function () {

    Route::get('get-countries', 'CommonController@countryList');
    Route::get('get-timezones', 'CommonController@timezoneList');
});
/*
 *UserSettings
*/
Route::group(['prefix' => 'user',  'middleware' => ['auth:api']], function () {

    Route::post('save-twilio-settings',    'UsersSettingsController@saveTwilioCredentials');
    Route::get('fetch-twilio-credentials', 'UsersSettingsController@fetchTwilioCredentials');
    Route::delete('remove-credentials/{meta_key}', 'UsersSettingsController@removeCredentials');
});

/*
 *User Credentials
*/
Route::group(['prefix' => 'user',  'middleware' => ['auth:api']], function () {

    Route::post('change-password',    'UsersController@updatePassword');
    Route::get('account-details',     'UsersController@getUserDetail');
    Route::post('update-account',     'UsersController@updateUser');
    Route::get('getuser',             'UsersController@getUser');
});

Route::get('country',     'UsersController@getCountryList');
Route::get('timezone',    'UsersController@getTimezoneList');

/*
 *Admin Manage User Listing
*/
Route::group(['prefix' => 'admin',  'middleware' => ['auth:api','scopes:isAdmin']], function () {
    
        Route::get('user-listing',      'AdminController@getUserList');
    
});

//Route::get('user-listing',      'AdminController@getUserList');

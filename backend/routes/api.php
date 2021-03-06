<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', 'UserController@register');
    Route::group([
        'middleware' => 'api'
    ],function($router) {
        Route::post('login', 'AuthController@login');
        Route::post('logout', 'AuthController@logout');
        Route::get('refresh', 'AuthController@refresh');
        Route::get('user', 'AuthController@user');
    });



});

Route::group([
    'middleware' => 'jwt.verify',
    'prefix' => 'user'
], function ($router) {
    Route::get('list','UserController@index');
});

Route::group([
    'middleware' => 'jwt.verify',
    'prefix' => 'jobs'
], function ($router) {
    Route::get('/','JobController@index');
    Route::post('/add','JobController@create');
    Route::post('/{id}','JobController@update');
    Route::get('/delete/{id}','JobController@destroy');
});

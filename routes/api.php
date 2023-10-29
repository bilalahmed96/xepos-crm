<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployeeController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LogoutController::class, 'logout']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('companies/all', [CompanyController::class, 'allCompanies']);

    // Companies Resource Routes
    Route::resources([
        'companies' => CompanyController::class,
    ]);


    // Employees Resource Routes
    Route::resources([
        'employees' => EmployeeController::class,
    ]);
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Merchant\ProfileController as MerchantProfileController;
use App\Http\Controllers\Merchant\MenuController as MerchantMenuController;
use App\Http\Controllers\Merchant\OrderController as MerchantOrderController;
use App\Http\Controllers\Customer\SearchController as CustomerSearchController;
use App\Http\Controllers\Customer\OrderController as CustomerOrderController;
use App\Http\Controllers\InvoiceController;

Route::get('/', fn () => response()->json(['app'=>'Marketplace Katering']));
Route::get('/auth/user', fn () => Auth::check() ? response()->json(Auth::user()) : response()->json(null, 401));

Route::post('/auth/register/merchant',[RegisterController::class,'registerMerchant']);
Route::post('/auth/register/customer',[RegisterController::class,'registerCustomer']);
Route::post('/auth/login',[RegisterController::class,'login']);
Route::post('/auth/logout',[RegisterController::class,'logout']);

Route::middleware(['auth','role:merchant'])->group(function () {
    Route::get('/merchant/profile',[MerchantProfileController::class,'show']);
    Route::put('/merchant/profile',[MerchantProfileController::class,'update']);

    Route::get('/merchant/menus',[MerchantMenuController::class,'index']);
    Route::post('/merchant/menus',[MerchantMenuController::class,'store']);
    Route::put('/merchant/menus/{menu}',[MerchantMenuController::class,'update']);
    Route::delete('/merchant/menus/{menu}',[MerchantMenuController::class,'destroy']);

    Route::get('/merchant/orders',[MerchantOrderController::class,'index']);
    Route::put('/merchant/orders/{order}',[MerchantOrderController::class,'update']);
});

Route::middleware(['auth','role:customer'])->group(function () {
    Route::get('/customer/search/caterings',[CustomerSearchController::class,'caterings']);
    Route::get('/customer/search/menus',[CustomerSearchController::class,'menus']);
    Route::post('/customer/orders',[CustomerOrderController::class,'create']);
    Route::get('/customer/orders',[CustomerOrderController::class,'myOrders']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/invoices/{invoice}',[InvoiceController::class,'show']);
});

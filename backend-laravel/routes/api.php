<?php

use App\Http\Controllers\CartsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PaymentController;


Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);

//for home page
Route::get('/premium-products', [ProductController::class, 'getPremiumProducts']);



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/admin/{email}', [UserController::class, 'checkAdmin']);
    Route::post('/new-products', [ProductController::class, 'addNewProduct']);
    Route::get('/products', [ProductController::class, 'getAllProducts']);
    Route::get('/admin-home/products', [ProductController::class, 'getAllProducts']);
    //delete single product
    Route::delete('/product/{id}', [ProductController::class, 'deleteProduct']);


    //get single product
    Route::get('/product/{id}', [ProductController::class, 'getProduct']);
    Route::get('/products/paginate/{page}', [ProductController::class, 'getPaginatedProducts']);

    //update single product
    Route::put('/products/{id}', [ProductController::class, 'updateProduct']);

    //profile section
    Route::get('/profile/{email}', [UserController::class, 'getProfile']);


    //add to cart
    Route::post('/add-to-cart', [CartsController::class, 'addProductToCart']);
    //fetch carts
    Route::get('/carts/{email}', [CartsController::class, 'fetchCartItemsByEmail']);
    //delete a cart item
    Route::delete('/carts/{id}', [CartsController::class, 'deleteCartItem']);

    //payment
    Route::post('/payments', [PaymentController::class, 'addPayment']);

    //load my payment history
    Route::get('/payment-history/{email}', [PaymentController::class, 'loadMyPaymentHistory']);
});
Route::middleware(['admin'])->group(function () {
    Route::get('/admin-home/users', [UserController::class, 'loadAllUsers']);
    Route::get('/admin-home/status', [UserController::class, 'adminStatus']);
    Route::get('/payment/history', [PaymentController::class, 'loadAllPaymentHistory']);
    Route::get('/manage-products/paginate/{page}', [ProductController::class, 'getPaginatedProducts']);
});

<?php

use App\Http\Controllers\CartsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);
Route::get('/product/{id}', [ProductController::class, 'getProduct']);
//profile section
Route::get('/profile/{email}', [UserController::class, 'getProfile']);

// all product page
Route::get('/products', [ProductController::class, 'getAllProducts']);

//get product for paginate
Route::get('/products/paginate/{page}', [ProductController::class, 'getPaginatedProducts']);
Route::get('/manage-products/paginate/{page}', [ProductController::class, 'getPaginatedProducts']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/admin/{email}', [UserController::class, 'checkAdmin']);
    Route::post('/new-products', [ProductController::class, 'addNewProduct']);
    Route::get('/admin-home/products', [ProductController::class, 'getAllProducts']);
    //delete single product
    Route::delete('/product/{id}', [ProductController::class, 'deleteProduct']);

    //update single product
    Route::put('/products/{id}', [ProductController::class, 'updateProduct']);


    //add to cart
    Route::post('/add-to-cart', [CartsController::class, 'addProductToCart']);
    //fetch carts
    Route::get('/carts/{email}', [CartsController::class, 'fetchCartItemsByEmail']);
    //delete a cart item
    Route::delete('/carts/{id}', [CartsController::class, 'deleteCartItem']);

    
});
Route::middleware(['admin'])->group(function () {
    Route::get('/admin-home/users', [UserController::class, 'loadAllUsers']);
});


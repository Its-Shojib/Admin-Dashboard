<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::post('/login', [UserController::class, 'login']);
Route::post('/signup', [UserController::class, 'signup']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/admin/{email}', [UserController::class, 'checkAdmin']);
    
});
Route::middleware(['admin'])->group(function () {
    Route::get('/admin-home/users', [UserController::class, 'loadAllUsers']);
});


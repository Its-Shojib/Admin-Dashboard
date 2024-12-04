<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Carts;
use App\Models\Products;
use App\Models\Payments;

class UserController extends Controller
{
    //signup user and send token
    function signup(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:50|min:3',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8',
                'user_role' => 'required|boolean',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'user_role' => $request->user_role,
            ]);

            $token = $user->createToken('authToken')->plainTextToken;
            return response()->json([
                'result' => true,
                'message' => 'User created successfully',
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'result' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'result' => false,
                'message' => 'An error occurred while creating the user',
                'error' => $e->getMessage(),
            ], 200);
        }
    }

    //login User
    function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);
            $user = User::where('email', $request->email)->first();

            if ($user && Hash::check($request->password, $user->password)) {
                $token = $user->createToken('authToken')->plainTextToken;

                return response()->json([
                    "result" => true,
                    'message' => 'User logged in successfully',
                    'user' => $user,
                    'token' => $token,
                ], 200);
            }

            return response()->json([
                "result" => false,
                'message' => 'Invalid email or password',
            ], 200); 
        } catch (ValidationException $e) {
            return response()->json([
                "result" => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 200); 
        } catch (\Exception $e) {
            return response()->json([
                "result" => false,
                'message' => 'An error occurred during login',
                'error' => $e->getMessage(),
            ], 500); 
        }
    }

    //check admin or not
    function checkAdmin($email){
        
            $user = User::where('email', $email)->first();
        
            if($user && $user->user_role == 1){
                return response()->json([
                    "result" => true,
                    'message' => 'User is an admin',
                ], 200);
            }else{
                return response()->json([
                    "result" => false,
                    'message' => 'User is not an admin',
                ], 200);
            }

    }

    function loadAllUsers(){
        $users = User::all();
        return response()->json([
            "result" => true,
            'users' => $users,
        ], 200);
    }

    //load single user
    function getProfile($id){
        $user = User::where('id', $id)->first();
        if($user){
            return response()->json([
                "result" => true,
                'user' => $user,
            ], 200);
        }else{
            return response()->json([
                "result" => false,
               'message' => 'User not found',
            ], 400);
        }
    }

    //admin status for count user, payments, products
    function adminStatus(){
        $usersCount = User::count();
        $cartsCount = Carts::count();
        //count admin
        $adminUsersCount = User::where('user_role', 1)->count();
        //count all payments and products count
        $paymentsCount = Payments::count();
        $productsCount = Products::count();

        //all products
        $products = Products::all();

        return response()->json([
            "result" => true,
            'usersCount' => $usersCount,
            'paymentsCount' => $paymentsCount,
            'productsCount' => $productsCount,
            'adminUsersCount' => $adminUsersCount,
            'cartsCount' => $cartsCount,
            'products' => $products,
        ], 200);
    }
}

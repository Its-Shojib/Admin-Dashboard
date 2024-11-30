<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carts;

class CartsController extends Controller
{
    // Add product to cart
    public function addProductToCart(Request $request)
    {
        try {
            $productId = $request->productId;
            $email = $request->email;
            echo $email;

            $existingCart = Carts::where('productId', $productId)
                                  ->where('email', $email)
                                  ->first();

            if ($existingCart) {
                return response()->json([
                    'result' => false,
                    'message' => 'Product already exists in the cart'
                ], 200);
            }

            // Add the product to the cart
            $cart = new Carts();
            $cart->productId = $productId;
            $cart->email = $email;
            $cart->save();

            return response()->json([
                'result' => true,
                'message' => 'Product added to the cart successfully'
            ], 200);
        } catch (\Exception $e) {
            // Handle exceptions and return error response
            return response()->json([
                'result' =>false, 
                'error' => 'An error occurred while adding the product to the cart',
                'details' => $e->getMessage()], 500);
        }
    }

    public function fetchCartItemsByEmail(Request $request)
    {
        try {
            $email = $request->email;
            $cartItems = Carts::where('email', $email)->get();

            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'No items found in the cart for this email'], 200);
            }

            return response()->json(['cartItems' => $cartItems], 200);
        } catch (\Exception $e) {
            // Handle exceptions and return error response
            return response()->json(['error' => 'An error occurred while fetching cart items', 'details' => $e->getMessage()], 500);
        }
    }
}

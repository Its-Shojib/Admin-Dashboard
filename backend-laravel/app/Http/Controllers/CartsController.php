<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Carts;
use App\Models\Products;

class CartsController extends Controller
{
    // Add product to cart
    public function addProductToCart(Request $request)
    {
        try {
            $productId = $request->productId;
            $email = $request->email;

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
                'result' => false,
                'error' => 'An error occurred while adding the product to the cart',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function fetchCartItemsByEmail($email)
    {
        try {
            $cartItems = Carts::where('email', $email)->get();

            $cartItems = $cartItems->map(function ($cartItem) {
                $product = Products::find($cartItem->productId);
                if ($product) {
                    return [
                        'id' => $cartItem->id, 
                        'product' => $product, 
                    ];
                }
                return null;
            })->filter();

            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'No items found in the cart for this email'], 200);
            }

            return response()->json(['carts' => $cartItems], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching cart items', 'details' => $e->getMessage()], 500);
        }
    }

    //delete a cart item
    public function deleteCartItem($id){
        try {
            $cartItem = Carts::find($id);
            if (!$cartItem) {
                return response()->json(['message' => 'Cart item not found'], 400);
            }
            $cartItem->delete();
            return response()->json(['message' => 'Cart item deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the cart item', 'details' => $e->getMessage()], 500);
        }
    }
}

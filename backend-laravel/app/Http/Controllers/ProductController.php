<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    // add new product
    function addNewProduct(Request $request){
        try {
            $request->validate([
                'name' => 'required|string|max:50|min:3',
                'category'=> 'required|string',
                'color'=> 'required|string',
                'brand'=> 'required|string',
                'price'=> 'required|numeric|min:0',
                'image'=> 'required|string',
                'details'=> 'required|string',
            ]);

            $product = Products::create([
                'name' => $request->name,
                'category' => $request->category,
                'color' => $request->color,
                'brand' => $request->brand,
                'price' => $request->price,
                'image' => $request->image,
                'details' => $request->details,
            ]);

            return response()->json([
                'result' => true,
                'message' => 'Product added successfully',
                'product' => $product,
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
                'message' => 'An error occurred while adding a product',
                'error' => $e->getMessage(),
            ], 500);
        
        
        }
    }
}

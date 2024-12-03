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

    // get all products
    function getAllProducts(){
        $products = Products::all();
        return response()->json([
            'result' => true,
            'products' => $products,
        ], 200);
    }
    //delete single product
    function deleteProduct($id){
        try {
            $product = Products::find($id);
            if (!$product) {
                return response()->json([
                   'result' => false,
                   'message' => 'Product not found',
                ], 404);
            }
            Products::destroy($id);
            return response()->json([
               'result' => true,
               'message' => 'Product deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
               'result' => false,
               'message' => 'An error occurred while deleting the product',
               'error' => $e->getMessage(),
            ], 500);
        }
    }

    //get a single product
    function getProduct($id){
        try {
            $product = Products::find($id);
            if (!$product) {
                return response()->json([
                   'result' => false,
                   'message' => 'Product not found',
                ], 404);
            }
            return response()->json([
               'result' => true,
               'product' => $product,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
               'result' => false,
               'message' => 'An error occurred while getting the product',
               'error' => $e->getMessage(),
            ], 500);
        }
    }

    //update single product
    function updateProduct($id, Request $request){
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

            $product = Products::find($id);
            if (!$product) {
                return response()->json([
                   'result' => false,
                   'message' => 'Product not found',
                ], 404);
            }
            $product->name = $request->name;
            $product->category = $request->category;
            $product->color = $request->color;
            $product->brand = $request->brand;
            $product->price = $request->price;
            $product->image = $request->image;
            $product->details = $request->details;
            $product->save();
            return response()->json([
               'result' => true,
               'message' => 'Product updated successfully',
               'product' => $product,
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'result' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
               'result' => false,
               'message' => 'An error occurred while updating the product',
               'error' => $e->getMessage(),
            ], 500);
        }
    }

    function getPaginatedProducts($page){
        $productsPerPage = 6;
        $skip = ($page - 1) * $productsPerPage;
        $products = Products::skip($skip)->take($productsPerPage)->get();
        return response()->json([
            'result' => true,
            'products' => $products,
            'total_pages' => ceil(Products::count() / $productsPerPage),
        ], 200);
    }

    //load 6 premium product
    function getPremiumProducts(){
        $premiumProducts = Products::take(6)->get();
        return response()->json([
            'result' => true,
            'products' => $premiumProducts,
        ], 200);
    }
}

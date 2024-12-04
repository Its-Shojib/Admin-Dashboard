<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payments;
use App\Models\Carts;
use Illuminate\Validation\ValidationException;

class PaymentController extends Controller
{

    function addPayment(Request $request)
    {
        try {
            $request->validate([
                'price' => 'required|numeric',
                'transactionId' => 'required',
                'email' => 'required|email',
                'cartItems' => 'required|min:1',
            ]);

            $payment = Payments::create([
                'price' => $request->price,
                'transactionId' => $request->transactionId,
                'email' => $request->email,
                'cartItems' => json_encode($request->cartItems),
            ]);


            //delete carts items
            Carts::where('email', $request->email)->delete();

            return response()->json([
                'result' => true,
                'message' => 'Payment successful',
                'payment' => $payment,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'result' => false,
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'result' => false,
                'message' => 'An error occurred while paymenting',
                'errors' => $e->getMessage(),
            ], 200);
        }
    }

    //load my payment history
    function loadMyPaymentHistory($email){
        try {
            $payments = Payments::where('email', $email)->get();

            return response()->json([
                'result' => true,
                'message' => 'Payment history loaded successfully',
                'payments' => $payments,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
               'result' => false,
               'message' => 'An error occurred while loading payment history',
                'errors' => $e->getMessage(),
            ], 200);
        }

    }

    //load all payment history
    function loadAllPaymentHistory(){
        try {
            $payments = Payments::all();

            return response()->json([
               'result' => true,
               'message' => 'Payment history loaded successfully',
                'payments' => $payments,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
               'result' => false,
               'message' => 'An error occurred while loading payment history',
                'errors' => $e->getMessage(),
            ], 200);
        }
    }
}

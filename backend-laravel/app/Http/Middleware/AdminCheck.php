<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Decode the authenticated user from the token
        $authenticatedUser = Auth::guard('sanctum')->user();

        if (!$authenticatedUser) {
            return response()->json(['message' => 'Unauthorized. No authenticated user.'], 401);
        }

        // Extract email from query parameter
        $email = $request->query('email');

        // Verify the email in the query matches the authenticated user's email
        if ($email !== $authenticatedUser->email) {
            return response()->json(['message' => 'Unauthorized. Email mismatch.'], 401);
        }

        // Verify the user with the email is an admin
        $user = User::where('email', $email)->first();

        if (!$user || $user->user_role != 1) { // Adjust 'user_role' based on your database schema
            return response()->json(['message' => 'Unauthorized. User is not an admin.'], 403);
        }

        // If all checks pass, allow the request to proceed
        return $next($request);
    }
}

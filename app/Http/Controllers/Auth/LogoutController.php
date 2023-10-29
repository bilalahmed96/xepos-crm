<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout(Request $request)
    {
        if (Auth::user()) {
            Auth::user()->tokens->each(function ($token, $key) {
                $token->delete();
            });
        }
    
        return response()->json(['message' => 'Logged out successfully']);
    }
}

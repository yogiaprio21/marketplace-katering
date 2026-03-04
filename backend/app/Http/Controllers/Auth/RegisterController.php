<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Merchant;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function registerMerchant(Request $r)
    {
        $data = $r->validate([
            'name'=>'required|string|max:100',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|min:8|confirmed',
            'company_name'=>'required|string|max:150',
            'address'=>'required|string',
            'contact_phone'=>'required|string|max:30',
            'location'=>'required|string|max:100',
            'description'=>'nullable|string',
        ]);
        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
            'role'=>'merchant',
        ]);
        Merchant::create([
            'user_id'=>$user->id,
            'company_name'=>$data['company_name'],
            'address'=>$data['address'],
            'contact_phone'=>$data['contact_phone'],
            'location'=>$data['location'],
            'description'=>$data['description'] ?? null,
        ]);
        Auth::login($user);
        return response()->json(['status'=>'ok']);
    }

    public function registerCustomer(Request $r)
    {
        $data = $r->validate([
            'name'=>'required|string|max:100',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|min:8|confirmed',
            'company_name'=>'required|string|max:150',
            'address'=>'required|string',
            'contact_phone'=>'required|string|max:30',
            'location'=>'required|string|max:100',
            'description'=>'nullable|string',
        ]);
        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
            'role'=>'customer',
        ]);
        Customer::create([
            'user_id'=>$user->id,
            'company_name'=>$data['company_name'],
            'address'=>$data['address'],
            'contact_phone'=>$data['contact_phone'],
            'location'=>$data['location'],
            'description'=>$data['description'] ?? null,
        ]);
        Auth::login($user);
        return response()->json(['status'=>'ok']);
    }

    public function login(Request $r)
    {
        $data = $r->validate([
            'email'=>'required|email',
            'password'=>'required|string',
        ]);
        if (Auth::attempt($data)) {
            $r->session()->regenerate();
            return response()->json(['status'=>'ok']);
        }
        return response()->json(['error'=>'invalid_credentials'], 422);
    }

    public function logout(Request $r)
    {
        Auth::logout();
        $r->session()->invalidate();
        $r->session()->regenerateToken();
        return response()->json(['status'=>'ok']);
    }
}

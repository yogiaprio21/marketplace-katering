<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function show()
    {
        $merchant = Auth::user()->merchant;
        return response()->json($merchant);
    }

    public function update(Request $r)
    {
        $merchant = Auth::user()->merchant;
        $data = $r->validate([
            'company_name'=>'required|string|max:150',
            'address'=>'required|string',
            'contact_phone'=>'required|string|max:30',
            'location'=>'required|string|max:100',
            'description'=>'nullable|string',
        ]);
        $merchant->update($data);
        return response()->json($merchant);
    }
}

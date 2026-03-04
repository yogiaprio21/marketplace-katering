<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    public function index()
    {
        $merchant = Auth::user()->merchant;
        return response()->json(Menu::where('merchant_id',$merchant->id)->latest()->get());
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'name'=>'required|string|max:150',
            'description'=>'nullable|string',
            'photo_url'=>'nullable|url',
            'category'=>'nullable|string|max:50',
            'price'=>'required|numeric|min:0',
            'is_active'=>'boolean',
        ]);
        $data['merchant_id'] = Auth::user()->merchant->id;
        $menu = Menu::create($data);
        return response()->json($menu, 201);
    }

    public function update(Request $r, Menu $menu)
    {
        $this->authorizeOwnership($menu->merchant_id);
        $data = $r->validate([
            'name'=>'required|string|max:150',
            'description'=>'nullable|string',
            'photo_url'=>'nullable|url',
            'category'=>'nullable|string|max:50',
            'price'=>'required|numeric|min:0',
            'is_active'=>'boolean',
        ]);
        $menu->update($data);
        return response()->json($menu);
    }

    public function destroy(Menu $menu)
    {
        $this->authorizeOwnership($menu->merchant_id);
        $menu->delete();
        return response()->json(null, 204);
    }

    protected function authorizeOwnership($merchantId)
    {
        if (Auth::user()->merchant->id !== $merchantId) abort(403);
    }
}

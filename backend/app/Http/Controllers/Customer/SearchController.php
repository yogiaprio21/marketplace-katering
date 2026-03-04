<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use App\Models\Menu;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function caterings(Request $r)
    {
        $q = Merchant::query();
        if ($r->filled('location')) $q->where('location',$r->string('location'));
        if ($r->filled('company_name')) $q->where('company_name','like','%'.$r->string('company_name').'%');
        return response()->json($q->latest()->get());
    }

    public function menus(Request $r)
    {
        $q = Menu::query()->where('is_active',1);
        if ($r->filled('merchant_id')) $q->where('merchant_id',$r->integer('merchant_id'));
        if ($r->filled('category')) $q->where('category',$r->string('category'));
        if ($r->filled('min_price')) $q->where('price','>=',$r->float('min_price'));
        if ($r->filled('max_price')) $q->where('price','<=',$r->float('max_price'));
        return response()->json($q->latest()->get());
    }
}

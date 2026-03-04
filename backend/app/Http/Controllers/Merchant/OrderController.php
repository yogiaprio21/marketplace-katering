<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        $merchantId = Auth::user()->merchant->id;
        $orders = Order::with(['customer.user','items.menu','invoice'])
            ->where('merchant_id',$merchantId)->latest()->get();
        return response()->json($orders);
    }

    public function update(Request $request, Order $order)
    {
        if ($order->merchant_id !== Auth::user()->merchant->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled'
        ]);

        $order->status = $validated['status'];
        $order->save();

        if ($validated['status'] === 'completed') {
            if ($order->invoice) {
                $order->invoice->status = 'paid';
                $order->invoice->save();
            }
        } elseif ($validated['status'] === 'cancelled') {
            if ($order->invoice) {
                $order->invoice->status = 'cancelled';
                $order->invoice->save();
            }
        }

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order->load('invoice')
        ]);
    }
}

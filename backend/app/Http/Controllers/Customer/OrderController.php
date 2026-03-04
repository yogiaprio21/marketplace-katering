<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Menu;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function create(Request $r)
    {
        $data = $r->validate([
            'merchant_id'=>'required|integer|exists:merchants,id',
            'delivery_date'=>'required|date|after_or_equal:today',
            'items'=>'required|array|min:1',
            'items.*.menu_id'=>'required|integer|exists:menus,id',
            'items.*.quantity'=>'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($data) {
            $customerId = Auth::user()->customer->id;
            $order = Order::create([
                'customer_id'=>$customerId,
                'merchant_id'=>$data['merchant_id'],
                'order_date'=>Carbon::today()->toDateString(),
                'delivery_date'=>$data['delivery_date'],
                'status'=>'pending',
                'total_amount'=>0,
            ]);

            $total = 0;
            foreach ($data['items'] as $item) {
                $menu = Menu::where('id',$item['menu_id'])->where('merchant_id',$data['merchant_id'])->firstOrFail();
                $qty = (int)$item['quantity'];
                $subtotal = $qty * (float)$menu->price;
                OrderItem::create([
                    'order_id'=>$order->id,
                    'menu_id'=>$menu->id,
                    'quantity'=>$qty,
                    'unit_price'=>$menu->price,
                    'subtotal'=>$subtotal,
                ]);
                $total += $subtotal;
            }
            $order->update(['total_amount'=>$total]);

            $invoice = Invoice::create([
                'order_id'=>$order->id,
                'invoice_number'=>$this->generateInvoiceNumber($order->id),
                'amount'=>$total,
                'status'=>'unpaid',
                'issued_at'=>Carbon::now(),
                'due_date'=>Carbon::now()->addDays(7),
            ]);

            return response()->json(['order'=>$order->load(['items.menu']),'invoice'=>$invoice], 201);
        });
    }

    public function myOrders()
    {
        $customerId = Auth::user()->customer->id;
        $orders = Order::with(['merchant.user','items.menu','invoice'])
            ->where('customer_id',$customerId)->latest()->get();
        return response()->json($orders);
    }

    protected function generateInvoiceNumber(int $orderId): string
    {
        return 'INV-'.Carbon::now()->format('Ymd').'-'.str_pad((string)$orderId,6,'0',STR_PAD_LEFT).'-'.Str::upper(Str::random(4));
    }
}

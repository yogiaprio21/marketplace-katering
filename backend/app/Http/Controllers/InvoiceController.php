<?php

namespace App\Http\Controllers;

use App\Models\Invoice;

class InvoiceController extends Controller
{
    public function show(Invoice $invoice)
    {
        return response()->json($invoice->load(['order.customer.user','order.merchant.user','order.items.menu']));
    }
}

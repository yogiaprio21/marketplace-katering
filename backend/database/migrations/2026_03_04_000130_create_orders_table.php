<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->restrictOnDelete();
            $table->foreignId('merchant_id')->constrained('merchants')->restrictOnDelete();
            $table->date('order_date');
            $table->date('delivery_date');
            $table->string('status', 20)->default('pending');
            $table->decimal('total_amount', 12, 2)->default(0);
            $table->timestamps();

            $table->index('customer_id');
            $table->index('merchant_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};

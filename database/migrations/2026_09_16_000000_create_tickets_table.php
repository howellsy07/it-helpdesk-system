<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('priority')->default('low'); // low, medium, high, urgent
            $table->string('status')->default('open');   // open, in-progress, resolved, closed
            $table->string('category')->nullable();     // bug, hardware, software, network
            $table->string('user_email')->nullable();    // who submitted the ticket
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};

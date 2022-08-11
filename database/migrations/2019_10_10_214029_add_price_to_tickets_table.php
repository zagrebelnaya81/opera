<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPriceToTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->float('full_price')->default(0);
            $table->float('price')->default(0);
        });

        $tickets = \App\Models\Ticket::with(['seatPrice', 'seatPrice.priceZone']);
        $tickets->chunk(100, function ($tickets) {
            foreach ($tickets as $ticket) {
                $ticket->full_price = $ticket->seatPrice->priceZone->price;
                $ticket->save();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropColumn(['price']);
            $table->dropColumn(['full_price']);
        });
    }
}

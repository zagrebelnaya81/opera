<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddVipBookingStatusToOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE orders CHANGE COLUMN status status ENUM('waiting_for_payment', 'sold', 'booked', 'returned', 'cancelled', 'vip_booked') NOT NULL DEFAULT 'cancelled'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE orders CHANGE COLUMN status status ENUM('waiting_for_payment', 'sold', 'booked', 'returned', 'cancelled')");
    }
}

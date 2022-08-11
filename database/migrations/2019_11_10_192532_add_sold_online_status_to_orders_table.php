<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSoldOnlineStatusToOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {

            DB::statement("ALTER TABLE orders CHANGE COLUMN status status ENUM('waiting_for_payment', 'sold', 'booked', 'returned', 'cancelled', 'vip_booked', 'distributor_booked', 'distributor_sold', 'sold_online') NOT NULL DEFAULT 'cancelled'");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {

            DB::statement("ALTER TABLE orders CHANGE COLUMN status status ENUM('waiting_for_payment', 'sold', 'booked', 'returned', 'cancelled', 'vip_booked', 'distributor_booked', 'distributor_sold') NOT NULL DEFAULT 'cancelled'");
        });
    }
}

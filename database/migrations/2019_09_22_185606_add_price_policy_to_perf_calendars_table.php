<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPricePolicyToPerfCalendarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('performance_calendars', function (Blueprint $table) {
            $table->unsignedInteger('price_policy_id')->nullable();

            $table->foreign('price_policy_id')->references('id')
                ->on('price_policies')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('performance_calendars', function (Blueprint $table) {
            $table->dropForeign(['price_policy_id']);

            $table->dropColumn(['price_policy_id']);
        });
    }
}

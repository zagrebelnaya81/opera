<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsToPerformanceCalendarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('performance_calendars', function (Blueprint $table) {
            $table->string('karabas_link', 255);
            $table->string('internet_bilet_link', 255);
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
            $table->dropColumn('karabas_link');
            $table->dropColumn('internet_bilet_link');
        });
    }
}

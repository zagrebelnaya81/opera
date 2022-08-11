<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePerformanceCalendarActors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('performance_calendar_actors', function (Blueprint $table) {
            $table->integer('performance_calendar_id')->unsigned();
            $table->integer('actor_id')->unsigned();

            $table->foreign('performance_calendar_id')->references('id')
                ->on('performance_calendars')->onDelete('cascade');

            $table->foreign('actor_id')->references('id')
                ->on('actors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('performance_calendar_actors', function (Blueprint $table) {
            $table->dropForeign(['performance_calendar_id']);
            $table->dropForeign(['actor_id']);
        });
        Schema::dropIfExists('performance_calendar_actors');
    }
}

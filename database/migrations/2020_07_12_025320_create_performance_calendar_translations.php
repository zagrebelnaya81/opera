<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePerformanceCalendarTranslations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('performance_calendar_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('performance_calendar_id')->unsigned();
            $table->string('language');
            $table->text('descriptions');
            $table->timestamps();

            $table->foreign('performance_calendar_id', 'performance_calendar_foreign')
                ->references('id')
                ->on('performance_calendars')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('performance_calendar_translations', function (Blueprint $table) {
            $table->dropForeign('performance_calendar_foreign');
        });
        Schema::dropIfExists('performance_calendar_translations');
    }
}

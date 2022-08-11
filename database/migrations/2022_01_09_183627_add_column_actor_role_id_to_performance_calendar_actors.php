<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnActorRoleIdToPerformanceCalendarActors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('performance_calendar_actors', function (Blueprint $table) {
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
            $table->integer('actor_role_id')->unsigned()->nullable();
            $table->foreign('actor_role_id')->references('id')->on('actor_roles')->onDelete('cascade');
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
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
            $table->dropForeign('performance_calendar_actors_actor_role_id_foreign');
            $table->dropColumn('actor_role_id');
        });
    }
}

<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPerformanceToActorRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('actor_roles', function (Blueprint $table) {
            $table->unsignedInteger('performance_id')->nullable();
            $table->foreign('performance_id')->references('id')
                ->on('performances')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('actor_roles', function (Blueprint $table) {
            $table->dropForeign(['performance_id']);
            $table->dropColumn(['performance_id']);
        });
    }
}

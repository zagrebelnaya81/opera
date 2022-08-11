<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeAttrsTypesInActorTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('actor_translations', function (Blueprint $table) {
            $table->text('repertoire')->change();
            $table->text('merit')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('actor_translations', function (Blueprint $table) {
            $table->string('repertoire')->change();
            $table->string('merit')->change();
        });
    }
}

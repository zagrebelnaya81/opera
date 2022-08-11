<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommissionTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commission_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('commission_id')->unsigned();
            $table->string('language', 45);
            $table->string('title', 45);

            $table->foreign('commission_id')->references('id')
                ->on('commissions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('commission_translations', function (Blueprint $table) {
            $table->dropForeign(['commission_id']);
        });

        Schema::dropIfExists('commission_translations');
    }
}

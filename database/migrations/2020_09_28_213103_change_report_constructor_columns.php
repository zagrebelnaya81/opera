<?php

use App\Models\ReportConstructor;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeReportConstructorColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('report_constructor', function (Blueprint $table) {
            $table->tinyInteger(ReportConstructor::FIELD_CASHIER);
            $table->tinyInteger(ReportConstructor::FIELD_HALL);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('report_constructor', function (Blueprint $table) {
        });
    }
}

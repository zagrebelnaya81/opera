<?php

use App\Models\ReportConstructor;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportConstructor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report_constructor', function (Blueprint $table){
            $table->increments('id');
            $table->string(ReportConstructor::FIELD_TITLE);
            $table->tinyInteger(ReportConstructor::FIELD_DISTRIBUTOR);
            $table->tinyInteger(ReportConstructor::FIELD_EVENT);
            $table->tinyInteger(ReportConstructor::FIELD_DATE);
            $table->tinyInteger(ReportConstructor::FIELD_TIME);
            $table->tinyInteger(ReportConstructor::FIELD_DISCOUNT);
            $table->tinyInteger(ReportConstructor::FIELD_PRICE);
            $table->tinyInteger(ReportConstructor::FIELD_RESERVATION);
            $table->tinyInteger(ReportConstructor::FIELD_QUANTITY_DISCOUNT);
            $table->tinyInteger(ReportConstructor::FIELD_QUANTITY_NO_DISCOUNT);
            $table->tinyInteger(ReportConstructor::FIELD_QUANTITY_CASH);
            $table->tinyInteger(ReportConstructor::FIELD_QUANTITY_CASHLESS);
            $table->tinyInteger(ReportConstructor::FIELD_QUANTITY_ONLINE);
            $table->tinyInteger(ReportConstructor::FIELD_QUANTITY_ALL);
            $table->tinyInteger(ReportConstructor::FIELD_AMOUNT_DISCOUNT);
            $table->tinyInteger(ReportConstructor::FIELD_AMOUNT_NO_DISCOUNT);
            $table->tinyInteger(ReportConstructor::FIELD_AMOUNT_CASH);
            $table->tinyInteger(ReportConstructor::FIELD_AMOUNT_CASHLESS);
            $table->tinyInteger(ReportConstructor::FIELD_AMOUNT_ONLINE);
            $table->tinyInteger(ReportConstructor::FIELD_AMOUNT_ALL);
            $table->tinyInteger(ReportConstructor::FIELD_ROLE_ADMIN);
            $table->tinyInteger(ReportConstructor::FIELD_ROLE_SENIOR_CASHIER);
            $table->tinyInteger(ReportConstructor::FIELD_ROLE_CASHIER);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('report_constructor');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('daily_report_id')->constrained('daily_reports')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('direction_id')->constrained('directions')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('personel_name');
            $table->string('unit');
            $table->integer('today');
            $table->string('manhours_unit');
            $table->integer('manhours_prev')->default(0);
            // $table->integer('manhours_today');
            $table->integer('manhours_working_hours');
            $table->integer('manhours_overtime_hours')->default(0);
            $table->integer('manhours_daily_total');
            $table->integer('manhours_cum');
            $table->string('remarks')->nullable();
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
        Schema::dropIfExists('personels');
    }
};

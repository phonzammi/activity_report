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
        Schema::create('daily_reports', function (Blueprint $table) {
            $table->id();
            $table->string('report_number')->unique();
            $table->foreignId('project_id')->nullable()->constrained('projects')->cascadeOnUpdate()->nullOnDelete();
            $table->time('working_hour_start');
            $table->time('working_hour_end');
            // $table->time('overtime_start')->nullable();
            // $table->time('overtime_end')->nullable();
            $table->foreignId('issued_by')->constrained('users')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('approved_by')->nullable()->constrained('users')->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('weekly_report_id')->nullable()->constrained('weekly_reports')->cascadeOnUpdate()->nullOnDelete();
            $table->foreignId('monthly_report_id')->nullable()->constrained('monthly_reports')->cascadeOnUpdate()->nullOnDelete();
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
        Schema::dropIfExists('daily_reports');
    }
};

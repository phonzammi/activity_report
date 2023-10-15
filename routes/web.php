<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DailyReport\ActivityController;
use App\Http\Controllers\DailyReport\EquipmentController;
use App\Http\Controllers\DailyReport\HSEStatisticController;
use App\Http\Controllers\DailyReport\PersonelController;
use App\Http\Controllers\DailyReportController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MonthlyReportController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\WeeklyReportController;
// use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::controller(DailyReportController::class)->prefix('daily-reports')->name('daily-reports.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('create', 'create')->name('create');
        Route::post('store', 'store')->name('store');
        Route::get('{daily_report}', 'show')->name('show');
        Route::get('{daily_report}/export-view', 'export_view')->name('export-view');
        // Route::get('{daily_report}/export-pdf', 'export_pdf')->name('export-pdf');
        Route::get('{daily_report}/edit', 'edit')->name('edit');
        Route::put('{daily_report}/update', 'update')->name('update');
        Route::get('{daily_report}/request-for-approval/{notification?}', 'request_for_approval')->name('request-for-approval');
        Route::post('{daily_report}/notifications/{notification}/approve-request', 'approve_request')->name('approve-request');
        Route::post('{daily_report}/notifications/{notification}/deny-approval', 'deny_approval')->name('deny-approval');
        Route::delete('{daily_report}/delete', 'delete')->name('delete');

        Route::controller(PersonelController::class)->name('personels.')->group(function () {
            Route::post('{daily_report}/personels/store', 'store')->name('store');
            Route::put('{daily_report}/personels/update', 'update')->name('update');
            Route::delete('{daily_report}/personels/{personel}/delete', 'delete')->scopeBindings()->name('delete');
        });

        Route::controller(HSEStatisticController::class)->name('hse-statistics.')->group(function () {
            Route::post('{daily_report}/hse_statistics/store', 'store')->name('store');
            Route::put('{daily_report}/hse_statistics/update', 'update')->name('update');
            Route::delete('{daily_report}/hse-statistics/{hse_statistic}/delete', 'delete')->scopeBindings()->name('delete');
        });

        Route::controller(EquipmentController::class)->name('equipment.')->group(function () {
            Route::post('{daily_report}/equipment/store', 'store')->name('store');
            Route::put('{daily_report}/equipment/update', 'update')->name('update');
            Route::delete('{daily_report}/equipment/{equipment}/delete', 'delete')->scopeBindings()->name('delete');
        });

        Route::controller(ActivityController::class)->name('activities.')->group(function () {
            // Route::get('{daily_report}/activities/{activity}/documentations/{documentation:title}', 'showDocumentation')->scopeBindings()->name('documentations');
            Route::post('{daily_report}/activities/store', 'store')->name('store');
            Route::put('{daily_report}/activities/{activity}/update', 'update')->scopeBindings()->name('update');
            Route::delete('{daily_report}/activities/{activity}/delete', 'delete')->scopeBindings()->name('delete');
            Route::delete('{daily_report}/activities/{activity}/documentations/{documentation}/delete', 'deleteDocumentation')->name('documentations.delete');
        });
    });

    Route::controller(WeeklyReportController::class)->prefix('weekly-reports')->name('weekly-reports.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('create', 'create')->name('create');
        Route::post('store', 'store')->name('store');
        Route::get('{weekly_report}', 'show')->name('show');
        Route::get('{weekly_report}/edit', 'edit')->name('edit');
        Route::put('{weekly_report}/update', 'update')->name('update');
        Route::delete('{weekly_report}/delete', 'delete')->name('delete');
        Route::get('{weekly_report}/request-for-approval/{notification?}', 'request_for_approval')->name('request-for-approval');
        Route::post('{weekly_report}/notifications/{notification}/approve-request', 'approve_request')->name('approve-request');
        Route::post('{weekly_report}/notifications/{notification}/deny-approval', 'deny_approval')->name('deny-approval');
        Route::get('{weekly_report}/export-view', 'export_view')->name('export-view');
    });

    Route::controller(MonthlyReportController::class)->prefix('monthly-reports')->name('monthly-reports.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('create', 'create')->name('create');
        Route::post('store', 'store')->name('store');
        Route::get('{monthly_report}', 'show')->name('show');
        Route::get('{monthly_report}/edit', 'edit')->name('edit');
        Route::put('{monthly_report}/update', 'update')->name('update');
        Route::delete('{monthly_report}/delete', 'delete')->name('delete');
        Route::get('{monthly_report}/request-for-approval/{notification?}', 'request_for_approval')->name('request-for-approval');
        Route::post('{monthly_report}/notifications/{notification}/approve-request', 'approve_request')->name('approve-request');
        Route::post('{monthly_report}/notifications/{notification}/deny-approval', 'deny_approval')->name('deny-approval');
        Route::get('{monthly_report}/export-view', 'export_view')->name('export-view');
    });

    Route::prefix('clients')->name('clients.')->group(function () {
        Route::controller(ClientController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('store', 'store')->name('store');
            Route::get('{client}/edit', 'edit')->name('edit');
            Route::put('{client}/update', 'update')->name('update');
            Route::delete('{client}/delete', 'delete')->name('delete');
        });
    });

    Route::prefix('projects')->name('projects.')->group(function () {
        Route::controller(ProjectController::class)->group(function () {
            Route::get('/', 'index')->name('index');
            Route::get('create', 'create')->name('create');
            Route::post('store', 'store')->name('store');
            // Route::get('{project}/show', 'show')->name('show');
            // Route::get('{project}/client-logo', 'showClientLogo')->name('client-logo');
            Route::get('{project}/edit', 'edit')->name('edit');
            Route::put('{project}/update', 'update')->name('update');
            Route::delete('{project}/delete', 'delete')->name('delete');
        });
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/update-signature-photo', [ProfileController::class, 'updateSignaturePhoto'])->name('profile.update-signature-photo');
    Route::post('/profile/create-company', [ProfileController::class, 'storeCompany'])->name('profile.create-company');
    Route::put('/profile/{company}/update-company', [ProfileController::class, 'updateCompany'])->name('profile.update-company');
    Route::delete('/profile/{company}/delete-company', [ProfileController::class, 'destroyCompany'])->name('profile.destroy-company');
    Route::delete('/profile/delete-photo', [ProfileController::class, 'destroyProfilePhoto'])->name('profile.destroy-profile-photo');
    Route::delete('/profile/delete-signature-photo', [ProfileController::class, 'destroySignaturePhoto'])->name('profile.destroy-signature-photo');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

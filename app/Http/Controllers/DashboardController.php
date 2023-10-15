<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\DailyReport;
use App\Models\MonthlyReport;
use App\Models\Project;
use App\Models\WeeklyReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $clients_count = Client::count();
        $projects_count = Project::count();
        $daily_reports_count = DailyReport::count();
        
        $weekly_reports_count = WeeklyReport::count();
        $monthly_reports_count = MonthlyReport::count();
        
        return Inertia::render('Dashboard', [
            "clientsCount" => $clients_count,
            "projectsCount" => $projects_count,
            "dailyReportsCount" => $daily_reports_count,
            "weeklyReportsCount" => $weekly_reports_count,
            "monthlyReportsCount" => $monthly_reports_count,
        ]);
    }
}

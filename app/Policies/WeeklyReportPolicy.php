<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;
use App\Models\WeeklyReport;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class WeeklyReportPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->role_id == Role::IS_HSE_OFFICER || $user->role_id == Role::IS_HSE_SUPERVISOR;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WeeklyReport  $weeklyReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, WeeklyReport $weeklyReport)
    {
        return $user->role_id == Role::IS_HSE_OFFICER || $user->role_id == Role::IS_HSE_SUPERVISOR;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->role_id == Role::IS_HSE_OFFICER;
        // return $user->role_id == Role::IS_HSE_OFFICER && Carbon::now()->isWeekend() ? Response::allow() : Response::deny("Hanya bisa di akses pada Hari Minggu");
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WeeklyReport  $weeklyReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, WeeklyReport $weeklyReport)
    {
        return $user->role_id == Role::IS_HSE_OFFICER && $weeklyReport->approved_by == NULL;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WeeklyReport  $weeklyReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, WeeklyReport $weeklyReport)
    {
        return $user->role_id == Role::IS_HSE_OFFICER;
    }

    public function request_for_approval(User $user, WeeklyReport $weeklyReport)
    {
        return $user->role_id == Role::IS_HSE_OFFICER && $weeklyReport->approved_by == NULL;
    }

    public function approve_request(User $user, WeeklyReport $weeklyReport)
    {
        return $user->role_id == Role::IS_HSE_SUPERVISOR && $weeklyReport->approved_by == NULL;
    }

    public function deny_approval(User $user, WeeklyReport $weeklyReport)
    {
        return $user->role_id == Role::IS_HSE_SUPERVISOR && $weeklyReport->approved_by == NULL;
    }

    public function export(User $user, WeeklyReport $weekly_report)
    {
        return $weekly_report->approved_by;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WeeklyReport  $weeklyReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, WeeklyReport $weeklyReport)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\WeeklyReport  $weeklyReport
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, WeeklyReport $weeklyReport)
    {
        //
    }
}

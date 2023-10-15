<?php

namespace App\Policies;

use App\Models\DailyReport;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class DailyReportPolicy
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
        // return true;
        return $user->role_id == Role::IS_HSE_OFFICER || $user->role_id == Role::IS_HSE_COORDINATOR;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\DailyReport  $daily_report
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_OFFICER || $user->role_id == Role::IS_HSE_COORDINATOR;
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
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\DailyReport  $daily_report
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_OFFICER && $daily_report->approved_by == NULL;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\DailyReport  $daily_report
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_OFFICER;
    }

    public function manage_personels(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_OFFICER && $daily_report->approved_by == NULL ? Response::allow() : Response::deny("Daily Report Sudah Di Setujui !");
    }

    public function manage_hse_statistics(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_OFFICER && $daily_report->approved_by == NULL ? Response::allow() : Response::deny("Daily Report Sudah Di Setujui !");
    }

    public function manage_equipment(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_OFFICER && $daily_report->approved_by == NULL ? Response::allow() : Response::deny("Daily Report Sudah Di Setujui !");
    }

    public function manage_activities(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_OFFICER && $daily_report->approved_by == NULL ? Response::allow() : Response::deny("Daily Report Sudah Di Setujui !");
    }

    public function request_for_approval(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_OFFICER && $daily_report->approved_by == NULL;
    }

    public function approve_request(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_COORDINATOR && $daily_report->approved_by == NULL;
    }

    public function deny_approval(User $user, DailyReport $daily_report)
    {
        return $user->role_id == Role::IS_HSE_COORDINATOR && $daily_report->approved_by == NULL;
    }

    public function export(User $user, DailyReport $daily_report)
    {
        return $daily_report->approved_by ? Response::allow() : Response::deny("Daily Report Belum Di Setujui !");
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\DailyReport  $daily_report
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, DailyReport $daily_report)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\DailyReport  $daily_report
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, DailyReport $daily_report)
    {
        //
    }
}

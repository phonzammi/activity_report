<?php

namespace App\Notifications;

use App\Models\DailyReport;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DenyApprovalRequestNotification extends Notification
{
    use Queueable;

    private $report;
    private $user;
    private $message;
    private $report_type;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($report, User $user, $report_type, $message)
    {
        $this->report = $report;
        $this->user = $user;
        $this->report_type = $report_type;
        $this->message = $message;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'type' => 'Request Denied',
            'report' => $this->report,
            'user' => $this->user->only('id', 'name', 'role_id'),
            'report_type' => $this->report_type,
            'route' => str($this->report_type)->lower()->append("-reports.show"),
            'message' =>  'Permintaan Persetujuan Ditolak! ' . $this->message,
            'alert' => 'error'
        ];
    }
}

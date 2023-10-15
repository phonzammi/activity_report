<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'auth.user' => fn () => $request->user()
                ? new UserResource($request->user())
                : null,
            'flash' => function () use ($request) {
                return [
                    'success' => $request->session()->get('success'),
                    'info' => $request->session()->get('info'),
                    'error' => $request->session()->get('error'),
                ];
            },
            'notifications' => [
                'unreadNotifications' => auth()->check() ? $request->user()->unreadNotifications : null,
                'unrepliedNotifications' => auth()->check() ? $request->user()->notifications()->whereNotNull('read_at')->whereNull('replied_at')->get() : null,
                'unreadNotificationsCount' => auth()->check() ? $request->user()->unreadNotifications()->count() : 0,
                'unrepliedNotificationsCount' => auth()->check() ? $request->user()->notifications()->whereNotNull('read_at')->whereNull('replied_at')->count() : 0,
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}

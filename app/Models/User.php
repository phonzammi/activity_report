<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Foundation\Auth\User as Authenticatable;
// use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'role_id',
        'company_id',
        'profile_photo_path',
        'signature_photo_path'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'profile_photo_url',
        'signature_photo_url'
    ];

    public function profilePhotoUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->profile_photo_path
                ? Storage::disk("public")->url($this->profile_photo_path)
                : $this->defaultProfilePhotoUrl();
        });
    }

    protected function defaultProfilePhotoUrl()
    {
        $name = trim(collect(explode(' ', $this->name))->map(function ($segment) {
            return mb_substr($segment, 0, 1);
        })->join(' '));

        return 'https://ui-avatars.com/api/?name=' . urlencode($name) . '&color=7F9CF5&background=EBF4FF';
    }

    public function updateProfilePhoto(UploadedFile $photo, $storagePath = 'profile-photos')
    {
        tap($this->profile_photo_path, function ($previous) use ($photo, $storagePath) {
            $this->forceFill([
                'profile_photo_path' => $photo->storePublicly(
                    $storagePath,
                    ['disk' => "public"]
                ),
            ])->save();

            if ($previous) {
                Storage::disk("public")->delete($previous);
            }
        });
    }

    public function deleteProfilePhoto()
    {
        if (is_null($this->profile_photo_path)) {
            return;
        }

        Storage::disk("public")->delete($this->profile_photo_path);

        $this->forceFill([
            'profile_photo_path' => null,
        ])->save();
    }

    public function signaturePhotoUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->signature_photo_path
                ? Storage::disk("public")->url($this->signature_photo_path)
                : $this->defaultSignaturePhotoUrl();
        });
    }

    protected function defaultSignaturePhotoUrl()
    {
        return Storage::disk("public")->url("signature-photos/default.png");
    }

    public function updateSignaturePhoto(UploadedFile $photo, $storagePath = 'signature-photos')
    {
        tap($this->signature_photo_path, function ($previous) use ($photo, $storagePath) {
            $this->forceFill([
                'signature_photo_path' => $photo->storePublicly(
                    $storagePath,
                    ['disk' => "public"]
                ),
            ])->save();

            if ($previous) {
                Storage::disk("public")->delete($previous);
            }
        });
    }

    public function deleteSignaturePhoto()
    {
        if (is_null($this->signature_photo_path)) {
            return;
        }

        Storage::disk("public")->delete($this->signature_photo_path);

        $this->forceFill([
            'signature_photo_path' => null,
        ])->save();
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($user) {
            $user->deleteProfilePhoto();
        });
    }
}

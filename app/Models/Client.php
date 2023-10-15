<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'logo_path'
    ];

    protected $appends = [
        'client_logo_url',
    ];

    public function clientLogoUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->logo_path
                ? Storage::disk("public")->url($this->logo_path)
                : $this->defaultClientLogoUrl();
        });
    }

    protected function defaultClientLogoUrl()
    {
        return 'https://ui-avatars.com/api/?name=Logo&length=4&font-size=0.33&uppercase=false&7F9CF5&background=EBF4FF';
    }

    public function updateClientLogo(UploadedFile $logo, $storagePath = 'client-logos')
    {
        tap($this->logo_path, function ($previous) use ($logo, $storagePath) {
            $this->forceFill([
                'logo_path' => $logo->storePublicly(
                    $storagePath,
                    ['disk' => "public"]
                ),
            ])->save();

            if ($previous) {
                Storage::disk("public")->delete($previous);
            }
        });
    }

    public function deleteClientLogo()
    {
        if (is_null($this->logo_path)) {
            return;
        }

        Storage::disk("public")->delete($this->logo_path);

        $this->forceFill([
            'logo_path' => null,
        ])->save();
    }

    public function projects(){
        return $this->hasMany(Project::class);
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($client) {
            $client->deleteClientLogo();
        });
    }
}

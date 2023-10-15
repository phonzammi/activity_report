<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'logo_path',
    ];

    protected $appends = [
        'company_logo_url',
    ];

    public function companyLogoUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->logo_path
                ? Storage::disk("public")->url($this->logo_path)
                : $this->defaultCompanyLogoUrl();
        });
    }

    protected function defaultCompanyLogoUrl()
    {
        return 'https://ui-avatars.com/api/?name=Logo&length=4&font-size=0.33&uppercase=false&7F9CF5&background=EBF4FF';
    }

    public function updateCompanyLogo(UploadedFile $logo, $storagePath = 'company-logos')
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

    public function deleteCompanyLogo()
    {
        if (is_null($this->logo_path)) {
            return;
        }

        Storage::disk("public")->delete($this->logo_path);

        $this->forceFill([
            'logo_path' => null,
        ])->save();
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($company) {
            $company->deleteCompanyLogo();
        });
    }
}

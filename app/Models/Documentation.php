<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Documentation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'activity_id',
        'title',
        'path',
    ];

    protected $appends = [
        'document_image_url',
    ];

    public function documentImageUrl(): Attribute
    {
        return Attribute::get(function () {
            return $this->path
                ? Storage::disk("public")->url($this->path)
                : $this->defaultDocumenImagetUrl();
        });
    }

    public function defaultDocumenImagetUrl()
    {
        return Storage::disk("public")->url('documentations/not-found.png');
    }

    public function updateDocumentImage(UploadedFile $image, $storagePath = "document-images")
    {
        $document_image_name = 'document-' . $this->activity->id . "-" . uniqid() . '-' . Carbon::now()->isoFormat("D_MMMM_Y") . ".{$image->extension()}";

        tap($this->path, function ($previous) use ($image, $storagePath, $document_image_name) {
            $this->forceFill([
                'name' => $document_image_name,
                'path' => $image->storePubliclyAs($storagePath, $document_image_name, ["disk" => "public"])
            ])->save();

            if ($previous) {
                Storage::disk("public")->delete($previous);
            }
        });
    }

    public function deleteDocumentImage(){
        Storage::disk("public")->delete($this->path);
    }

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public static function boot()
    {
        parent::boot();

        static::deleting(function ($documentation) {
            $documentation->deleteDocumentImage();
        });
    }
}

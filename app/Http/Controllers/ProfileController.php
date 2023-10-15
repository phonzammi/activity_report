<?php

namespace App\Http\Controllers;

use App\Http\Requests\Company\StoreCompanyRequest;
use App\Http\Requests\Company\UpdateCompanyRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Company;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $posts = $request->validated();

        if (isset($posts['photo'])) {
            $request->user()->updateProfilePhoto($posts['photo']);
        }

        $request->user()->fill([
            'name' => $posts['name'],
            'email' => $posts['email']
        ]);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function storeCompany(StoreCompanyRequest $request): RedirectResponse
    {
        $this->authorize('create', Company::class);

        $posts = $request->validated();

        $new_company = new Company();

        $new_company->name = $posts['company_name'];
        $new_company->address = $posts['company_address'];

        if (isset($posts['logo'])) {
            $new_company->logo_path = $request->file('logo')->storePublicly("company-logos", ['disk' => 'public']);
        }

        if ($new_company->save()) {
            $request->user()->company()->associate($new_company)->save();
        }

        return Redirect::route('profile.edit')->with('success', 'Berhasil Membuat Company');
    }

    public function updateCompany(UpdateCompanyRequest $request, Company $company)
    {
        $this->authorize('update', $company);
        $posts = $request->validated();

        if (isset($posts['logo'])) {
            $company->updateCompanyLogo($posts['logo']);
        }

        $company->fill([
            'name' => $posts['company_name'],
            'address' => $posts['company_address']
        ]);

        $company->save();
        return Redirect::route('profile.edit');
    }

    public function updateSignaturePhoto(Request $request)
    {
        $post = $request->validate([
            'signature' => 'nullable|image|mimes:png'
        ]);

        if (isset($post['signature'])) {
            $request->user()->updateSignaturePhoto($post['signature']);
        }

        return Redirect::route('profile.edit')->with("success", "Berhasil Menyimpan Signature");
    }


    public function destroyCompany(Company $company): RedirectResponse
    {
        $this->authorize('delete', $company);

        $company->delete();

        return Redirect::route('profile.edit')->with("success", "Berhasil Menghapus Company");
    }

    public function destroyProfilePhoto(Request $request): RedirectResponse
    {
        $request->user()->deleteProfilePhoto();

        return Redirect::route('profile.edit');
    }

    public function destroySignaturePhoto(Request $request): RedirectResponse
    {
        $request->user()->deleteSignaturePhoto();

        return Redirect::route('profile.edit')->with("success", "Berhasil Menghapus Signature");
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}

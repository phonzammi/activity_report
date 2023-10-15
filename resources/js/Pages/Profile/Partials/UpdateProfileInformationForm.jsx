import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FaTrash } from "react-icons/fa";
import SecondaryButton from "@/Components/SecondaryButton";
import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className,
}) {
    const user = usePage().props.auth.user;
    const fileInput = useRef(null);

    const {
        data,
        setData,
        post,
        errors,
        clearErrors,
        processing,
        recentlySuccessful,
        setDefaults,
        setError,
        reset,
        isDirty,
    } = useForm({
        name: user.name,
        email: user.email,
        photo: null,

        _method: "PATCH",
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef(null);

    const submit = (e) => {
        e.preventDefault();

        post(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => {
                clearPhotoFileInput();
            },
        });
    };

    const selectNewPhoto = (event) => {
        event.preventDefault();
        photoInput.current.click();
    };

    const updatePhotoPreview = () => {
        const photo = photoInput.current.files[0];

        if (!photo) {
            return;
        }

        setData("photo", photoInput.current.files[0]);

        const reader = new FileReader();

        reader.onload = (e) => {
            setPhotoPreview(e.target.result);
        };

        reader.readAsDataURL(photo);
    };

    const clearPhotoFileInput = () => {
        if (photoInput.current?.value) {
            photoInput.current.value = null;
        }
    };

    const deletePhoto = (e) => {
        e.preventDefault();
        router.delete(route("profile.destroy-profile-photo"), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        className="mb-1"
                        htmlFor="photo"
                        value="Photo"
                    />

                    <input
                        ref={photoInput}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={updatePhotoPreview}
                    />

                    {!photoPreview ? (
                        <img
                            src={user.profilePhotoUrl}
                            alt={user.name}
                            className="rounded-full h-20 w-20 object-cover"
                        />
                    ) : (
                        <span
                            className="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center"
                            style={{
                                backgroundImage: `url("${photoPreview}")`,
                            }}
                        />
                    )}

                    <InputError className="mt-2" message={errors.photo} />
                </div>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(event) =>
                            setData("name", event.target.value)
                        }
                        required
                        isInvalid={errors.name}
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(event) =>
                            setData("email", event.target.value)
                        }
                        required
                        isInvalid={errors.email}
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <SecondaryButton
                        onClick={selectNewPhoto}
                        disabled={processing}
                    >
                        Select a New Photo
                    </SecondaryButton>

                    {user.profilePhotoPath && (
                        <DangerButton onClick={deletePhoto}>
                            Remove Photo
                        </DangerButton>
                    )}

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

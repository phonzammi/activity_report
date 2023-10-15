import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useRef, useState } from "react";
import SecondaryButton from "@/Components/SecondaryButton";

export default function CreateCompanyInformationForm({ className }) {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        post,
        errors,
        clearErrors,
        processing,
        recentlySuccessful,
    } = useForm({
        company_name: "",
        company_address: "",
        logo: null,
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const logoInput = useRef(null);

    const handleOnChange = (event) => {
        clearErrors(event.target.name);
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (user.can.createCompany) {
            post(route("profile.create-company"), {
                preserveScroll: true,
                onSuccess: () => {
                    clearLogoFileInput();
                    router.reload();
                },
            });
        }
    };

    const selectNewLogo = (event) => {
        event.preventDefault();
        logoInput.current.click();
    };

    const updateLogoPreview = () => {
        const logo = logoInput.current.files[0];

        if (!logo) {
            return;
        }

        setData("logo", logoInput.current.files[0]);

        const reader = new FileReader();

        reader.onload = (e) => {
            setLogoPreview(e.target.result);
        };

        reader.readAsDataURL(logo);
    };

    const clearLogoFileInput = () => {
        if (logoInput.current?.value) {
            logoInput.current.value = null;
            setLogoPreview(null);
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Company Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    You don't have any company. Create a Company.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        className="mb-1"
                        htmlFor="logo"
                        value="Company Logo"
                    />

                    <input
                        ref={logoInput}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={updateLogoPreview}
                    />

                    {!logoPreview ? (
                        <img
                            src="https://ui-avatars.com/api/?name=Logo&length=4&font-size=0.33&uppercase=false&7F9CF5&background=EBF4FF"
                            alt="company logo"
                            className={`rounded-xl object-cover w-full md:w-1/3`}
                        />
                    ) : (
                        <img
                            src={logoPreview}
                            alt="company logo"
                            className={`rounded-xl object-cover w-full md:w-2/3`}
                        />
                    )}

                    <InputError className="mt-2" message={errors.logo} />
                </div>
                <div>
                    <InputLabel htmlFor="company_name" value="Company Name" />

                    <TextInput
                        id="company_name"
                        name="company_name"
                        className="mt-1 block w-full uppercase"
                        value={data.company_name}
                        onChange={handleOnChange}
                        placeholder="Company Name ..."
                        isInvalid={errors.company_name}
                        required
                        autoComplete="company_name"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.company_name}
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="company_address"
                        value="Company Address"
                    />

                    <TextInput
                        id="company_address"
                        name="company_address"
                        className="mt-1 block w-full capitalize"
                        value={data.company_address}
                        onChange={handleOnChange}
                        placeholder="Company Address ..."
                        isInvalid={errors.company_address}
                        autoComplete="company_address"
                    />

                    <InputError
                        className="mt-2"
                        message={errors.company_address}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <SecondaryButton
                        onClick={selectNewLogo}
                        disabled={processing}
                    >
                        Select a New Logo
                    </SecondaryButton>

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

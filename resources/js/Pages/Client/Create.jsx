import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import InputText from "@/Components/InputText";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLink from "@/Components/PrimaryLink";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import { FaArrowCircleLeft, FaChevronRight } from "react-icons/fa";

const Create = () => {
    const { redirectTo } = usePage().props;

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        setError,
        clearErrors,
    } = useForm({
        client_name: "",
        client_logo: null,
        logo: null,
        redirect: redirectTo || "",
    });

    const [logoPreview, setLogoPreview] = useState(null);
    const logoInput = useRef(null);

    const submit = (e) => {
        e.preventDefault();

        post(route("clients.store"), {
            onSuccess: () => {
                reset();
                clearLogoFileInput();
            },
        });
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
        clearErrors("logo");

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
        <>
            <Head title="Tambah Client Baru" />
            {/* Breadcrumb */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Tambah Client Baru
                </h2>

                <nav
                    className="flex xs:flex-row-reverse"
                    aria-label="Breadcrumb"
                >
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link
                                href={route("dashboard")}
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <FaChevronRight
                                    aria-hidden="true"
                                    className="text-gray-400"
                                    fill="currentColor"
                                />

                                <Link
                                    href={route("clients.index")}
                                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Clients
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <FaChevronRight
                                    aria-hidden="true"
                                    className="text-gray-400"
                                    fill="currentColor"
                                />

                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                    Tambah Client Baru
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 md:py-4 md:px-8">
                <form onSubmit={submit}>
                    <div className="grid md:grid-cols-2 gap-1 md:gap-6">
                        <div className="relative w-full group">
                            <InputLabel
                                className="!font-bold !text-base"
                                htmlFor="client_name"
                                value="Client Name"
                            />

                            <InputText
                                id="client_name"
                                name="client_name"
                                value={data.client_name}
                                className="mt-1 w-full block uppercase"
                                placeholder="Client Name ..."
                                onChange={(event) =>
                                    setData("client_name", event.target.value)
                                }
                                isInvalid={errors.client_name}
                                // required
                            />

                            <InputError
                                message={errors.client_name}
                                className="mt-1"
                            />
                        </div>
                        <div className="relative w-full group">
                            <InputLabel
                                className="!font-bold !text-base"
                                htmlFor="logo"
                                value="Client Logo"
                            />

                            <input
                                id="logo"
                                ref={logoInput}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={updateLogoPreview}
                            />

                            <div className="grid grid-cols-2 mt-1">
                                <div className="relative w-full">
                                    <SecondaryButton
                                        className="mt-1"
                                        onClick={selectNewLogo}
                                        disabled={processing}
                                    >
                                        Select a New Logo
                                    </SecondaryButton>
                                    <InputError
                                        message={errors.logo}
                                        className="mt-1"
                                    />
                                </div>

                                {logoPreview && (
                                    <div className="relative w-full">
                                        <img
                                            src={logoPreview}
                                            alt="client logo"
                                            className={`mx-auto rounded-xl h-28`}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <PrimaryLink
                            href={
                                redirectTo
                                    ? route(redirectTo)
                                    : route("clients.index")
                            }
                        >
                            <FaArrowCircleLeft className="h-3 w-3 mr-1" />
                            Kembali
                        </PrimaryLink>

                        <PrimaryButton className="ml-4" disabled={processing}>
                            Tambah & Lanjutkan
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
};

Create.layout = (page) => <AuthenticatedLayout children={page} />;
export default Create;

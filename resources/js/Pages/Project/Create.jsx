import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import InputText from "@/Components/InputText";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLink from "@/Components/PrimaryLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import { FaArrowCircleLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import clientLogoPng from "@/Images/logo/client_logo.png";

const Create = () => {
    const { clients, redirectTo } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        location: "",
        client_id: "",
        scope_of_work: "",
        redirect: redirectTo || "",
    });

    const [clientLogo, setClientLogo] = useState();

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("projects.store"), {
            onSuccess: () => reset(),
        });
    };
    return (
        <>
            <Head title="Tambah Project Baru" />
            {/* Breadcrumb */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Tambah Project Baru
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
                                    href={route("projects.index")}
                                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Projects
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
                                    Tambah Project Baru
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 md:py-4 md:px-8">
                <form onSubmit={submit}>

                    <div className="border-b grid md:grid-cols-2 md:gap-6">
                        <div className="relative w-full mb-2 group">
                            <InputLabel
                                className="!font-bold !text-base"
                                htmlFor="name"
                                value="Project Name"
                            />

                            <InputText
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 w-full block uppercase"
                                autoComplete="name"
                                isFocused={true}
                                placeholder="Project Name ..."
                                onChange={handleOnChange}
                                isInvalid={errors.name}
                                // required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-1"
                            />
                        </div>
                        <div className="relative w-full mb-2 group">
                            <div className="flex justify-between items-center">
                                <InputLabel
                                    className="!font-bold !text-base"
                                    htmlFor="client_id"
                                    value="Client"
                                />

                                <Link
                                    href={route("clients.create")}
                                    preserveState
                                    data={{ from: "projects.create" }}
                                    className="inline-flex items-center px-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 dark:bg-primary-800 dark:hover:bg-primary-700 dark:focus:bg-primary-700 dark:active:bg-primary-900 dark:focus:ring-primary-500"
                                >
                                    New Client
                                </Link>
                            </div>
                            <div className="flex flex-col items-start">
                                <select
                                    id="client_id"
                                    name="client_id"
                                    onChange={handleOnChange}
                                    className={`mt-1 block w-full uppercase border border-gray-300 text-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 ${
                                        errors.client_id &&
                                        "!bg-red-50 !border-red-500 !focus:border-red-500 !focus:ring-red-500 !text-red-900 !placeholder-red-700"
                                    }`}
                                >
                                    <option value="">Pilih Client ...</option>
                                    {clients.length > 0 &&
                                        clients.map((client, index) => (
                                            <option
                                                key={index}
                                                value={client.id}
                                            >
                                                {client.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <InputError
                                message={errors.client_id}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative w-full mb-2 group">
                            <InputLabel
                                className="!font-bold !text-base"
                                htmlFor="scope_of_work"
                                value="Scope Of Work"
                            />

                            <InputText
                                id="scope_of_work"
                                name="scope_of_work"
                                value={data.scope_of_work}
                                className="mt-1 w-full block uppercase"
                                placeholder="Scope Of Work ..."
                                onChange={handleOnChange}
                                isInvalid={errors.scope_of_work}
                                // required
                            />

                            <InputError
                                message={errors.scope_of_work}
                                className="mt-1"
                            />
                        </div>
                        <div className="relative w-full mb-2 group">
                            <InputLabel
                                className="!font-bold !text-base"
                                htmlFor="location"
                                value="Location"
                            />

                            <InputText
                                id="location"
                                name="location"
                                value={data.location}
                                className="mt-1 w-full block uppercase"
                                placeholder="Location ..."
                                onChange={handleOnChange}
                                isInvalid={errors.location}
                                // required
                            />

                            <InputError
                                message={errors.location}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <PrimaryLink
                            href={
                                redirectTo
                                    ? route(redirectTo)
                                    : route("projects.index")
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

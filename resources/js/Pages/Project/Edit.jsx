import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import InputText from "@/Components/InputText";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLink from "@/Components/PrimaryLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { FaArrowCircleLeft, FaChevronRight } from "react-icons/fa";

const Edit = () => {
    const { project, clients } = usePage().props;

    const { data, setData, post, processing, errors, isDirty, reset, setDefaults } =
        useForm({
            name: project.name || "",
            location: project.location || "",
            client_id: project.client.id || "",
            scope_of_work: project.scopeOfWork || "",

            _method: "PUT",
        });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("projects.update", project));
    };
    return (
        <>
            <Head title="Edit Project" />
            {/* Breadcrumb */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Edit Project
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
                                    Edit Project
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
                            <InputLabel
                                className="!font-bold !text-base"
                                htmlFor="client_id"
                                value="Client"
                            />
                            <div className="flex flex-col items-start">
                                <select
                                    id="client_id"
                                    name="client_id"
                                    onChange={handleOnChange}
                                    value={data.client_id}
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
                        <PrimaryLink href={route("projects.index")}>
                            <FaArrowCircleLeft className="h-3 w-3 mr-1" />
                            Kembali
                        </PrimaryLink>

                        <PrimaryButton className="ml-4" disabled={processing || !isDirty}>
                            Simpan Perubahan
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
};

Edit.layout = (page) => <AuthenticatedLayout children={page} />;
export default Edit;

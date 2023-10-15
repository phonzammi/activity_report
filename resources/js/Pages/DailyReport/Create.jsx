import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import InputText from "@/Components/InputText";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLink from "@/Components/PrimaryLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import {
    FaArrowCircleLeft,
    FaChevronRight,
    FaPlusCircle,
} from "react-icons/fa";

const Create = () => {
    const { projects } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        report_number: "",
        project_id: "",
        working_hour_start: "",
        working_hour_end: "",
        overtime_start: "",
        overtime_end: "",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("daily-reports.store"), { onSuccess: () => reset() });
    };
    return (
        <>
            <Head title="Tambah Daily Report" />
            {/* Breadcrumb */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Tambah Daily Report
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
                                    href={route("daily-reports.index")}
                                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Daily Reports
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
                                    Tambah
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 md:py-4 md:px-8">
                <h2 className="text-2xl mb-2 font-extrabold dark:text-white">
                    Inisialisasi Report
                </h2>

                <form onSubmit={submit}>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative w-full mb-2 group">
                            <InputLabel
                                className="!font-bold !text-base"
                                htmlFor="report_number"
                                value="Report No."
                            />

                            <InputText
                                id="report_number"
                                name="report_number"
                                value={data.report_number}
                                className="mt-1 w-full block uppercase"
                                autoComplete="report_number"
                                isFocused={true}
                                placeholder="Report No. ..."
                                onChange={handleOnChange}
                                isInvalid={errors.report_number}
                                // required
                            />

                            <InputError
                                message={errors.report_number}
                                className="mt-1"
                            />
                        </div>
                        <div className="relative w-full mb-2 group">
                            <div className="flex justify-between items-center">
                                <InputLabel
                                    className="!font-bold !text-base"
                                    htmlFor="project_id"
                                    value="Project"
                                />

                                <Link
                                    href={route("projects.create")}
                                    preserveState
                                    data={{ from: "daily-reports.create" }}
                                    className="inline-flex items-center px-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 dark:bg-primary-800 dark:hover:bg-primary-700 dark:focus:bg-primary-700 dark:active:bg-primary-900 dark:focus:ring-primary-500"
                                >
                                    New Project
                                </Link>
                            </div>
                            <div className="flex flex-col items-start">
                                <select
                                    id="project_id"
                                    name="project_id"
                                    onChange={handleOnChange}
                                    className={`mt-1 block w-full uppercase border border-gray-300 text-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 ${
                                        errors.project_id &&
                                        "!bg-red-50 !border-red-500 !focus:border-red-500 !focus:ring-red-500 !text-red-900 !placeholder-red-700"
                                    }`}
                                >
                                    <option value="">Pilih Project ...</option>
                                    {projects.length > 0 &&
                                        projects.map((project, index) => (
                                            <option
                                                key={index}
                                                value={project.id}
                                            >
                                                {project.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <InputError
                                message={errors.project_id}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative w-full mb-2 group">
                            <InputLabel
                                className="!font-bold !text-base"
                                value="Working Hours"
                            />

                            <div
                                id="working_hours"
                                className="grid grid-cols-2 gap-6 mt-1"
                            >
                                <div className="relative ">
                                    <input
                                        type="time"
                                        name="working_hour_start"
                                        id="working_hour_start"
                                        className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 disabled dark:focus:border-indigo-500 peer ${
                                            errors.working_hour_start &&
                                            "!bg-red-50 !border-red-500 !focus:border-red-500 !focus:ring-red-500 !text-red-900 !placeholder-red-700"
                                        }`}
                                        value={data.working_hour_start}
                                        onChange={handleOnChange}
                                    />
                                    <label
                                        htmlFor="working_hour_start"
                                        className="absolute rounded-lg text-sm font-semi-bold text-gray-700 dark:text-white -translate-y-4 scale- top-2 bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-focus:top-2 peer-focus:scale- peer-focus:-translate-y-4 right-1"
                                    >
                                        Start
                                    </label>
                                </div>
                                <div className="relative ">
                                    <input
                                        type="time"
                                        name="working_hour_end"
                                        id="working_hour_end"
                                        className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 disabled dark:focus:border-indigo-500 peer ${
                                            errors.working_hour_end &&
                                            "!bg-red-50 !border-red-500 !focus:border-red-500 !focus:ring-red-500 !text-red-900 !placeholder-red-700"
                                        }`}
                                        value={data.working_hour_end}
                                        onChange={handleOnChange}
                                    />
                                    <label
                                        htmlFor="working_hour_end"
                                        className="absolute rounded-lg text-sm font-semi-bold text-gray-700 dark:text-white -translate-y-4 scale- top-2 bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-500 peer-focus:top-2 peer-focus:scale- peer-focus:-translate-y-4 right-1"
                                    >
                                        End
                                    </label>
                                </div>
                            </div>

                            <InputError
                                message={errors.working_hour_start}
                                className="mt-1"
                            />
                            <InputError
                                message={errors.working_hour_end}
                                className={!errors.working_hour_start && "mt-1"}
                            />
                        </div>
                    </div>

                    {/* <div className="grid md:grid-cols-2 md:gap-6"></div> */}

                    <div className="flex items-center justify-between mt-4">
                        <PrimaryLink href={route("daily-reports.index")}>
                            <FaArrowCircleLeft className="h-3 w-3 mr-1" />
                            Kembali
                        </PrimaryLink>

                        <PrimaryButton className="ml-4" disabled={processing}>
                            <FaPlusCircle className="h-3 w-3 mr-1" />
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

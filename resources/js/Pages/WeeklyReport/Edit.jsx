import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import InputText from "@/Components/InputText";
import PrimaryButton from "@/Components/PrimaryButton";
import PrimaryLink from "@/Components/PrimaryLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import {
    FaArrowCircleLeft,
    FaChevronRight,
    FaPlusCircle,
} from "react-icons/fa";

const Edit = () => {
    const { weeklyReport } = usePage().props;

    const { data, setData, post, processing, errors, reset, isDirty, setDefaults } = useForm({
        report_number: weeklyReport.report_number || "",

        _method: "PUT",
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("weekly-reports.update", weeklyReport), {
            onSuccess: () => {
                setDefaults();
                reset();
            },
        });
    };
    return (
        <>
            <Head title="Edit Weekly Report" />
            {/* Breadcrumb */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Edit Weekly Report
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
                                    href={route("weekly-reports.index")}
                                    className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    Weekly Reports
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
                                    Edit
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* Form */}
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 md:py-4 md:px-8">
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
                            <InputLabel
                                className="!font-bold !text-base"
                                htmlFor="project_id"
                                value="Project (Mempunyai Daily Reports)"
                            />
                            <InputText
                                id="report_number"
                                name="report_number"
                                value={weeklyReport.project.name}
                                className="mt-1 w-full block uppercase bg-gray-100"
                                readOnly
                                // required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <PrimaryLink href={route("weekly-reports.show", weeklyReport)}>
                            <FaArrowCircleLeft className="h-3 w-3 mr-1" />
                            Kembali
                        </PrimaryLink>

                        <PrimaryButton className="ml-4" disabled={!isDirty || processing}>
                            <FaPlusCircle className="h-3 w-3 mr-1" />
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </>
    );
};

Edit.layout = (page) => <AuthenticatedLayout children={page} />;
export default Edit;

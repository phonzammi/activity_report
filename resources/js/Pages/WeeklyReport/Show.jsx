import PrimaryLink from "@/Components/PrimaryLink";
import SecondaryLink from "@/Components/SecondaryLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import Personels from "./Personels/Show";
import HSEStatistic from "./HSEStatistics/Show";
import Equipment from "./Equipment/Show";
import Activities from "./Activities/Show";

import {
    FaCheckCircle,
    FaChevronRight,
    FaEdit,
    FaFilePdf,
    FaRegQuestionCircle,
} from "react-icons/fa";

const Show = () => {
    const { notification, unrepliedNotification, weeklyReport, auth } =
        usePage().props;

    const { project, hseStatistics, equipment, activities, can } = weeklyReport;

    window.Echo.private(`App.Models.User.${auth.user.id}`).notification(() => {
        return router.reload();
    });

    return (
        <>
            <Head title={project.name} />
            {/* Bradcrumbs */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Report No. {weeklyReport.reportNumber}
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
                                    Weekly Report
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

                                <span className="whitespace-nowrap ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                    Report No. {weeklyReport.reportNumber}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 mb-4">
                {can.requestForApproval &&
                    !unrepliedNotification &&
                    !notification && (
                        <div
                            className="flex items-center justify-between gap-2 px-3 py-2 mb-2 text-green-800 rounded-lg bg-green-100 dark:bg-gray-600 dark:text-green-400"
                            role="alert"
                        >
                            <span>
                                Lanjutkan meminta persetujuan dari HSE
                                Supervisor ?
                            </span>
                            <PrimaryLink
                                href={route(
                                    "weekly-reports.request-for-approval",
                                    [weeklyReport]
                                )}
                                className="!px-2 !bg-green-400 !text-green-800 dark:!bg-green-600 dark:!text-green-50 text-center whitespace-nowrap"
                            >
                                <FaRegQuestionCircle className="h-3 w-3 mr-1" />
                                Request for Approval
                            </PrimaryLink>
                        </div>
                    )}

                {unrepliedNotification &&
                    unrepliedNotification.data.type ==
                        "Request For Approval" && (
                        <div
                            className="px-3 py-2 mb-2 text-blue-800 rounded-lg bg-blue-100 dark:bg-gray-600 dark:text-blue-400"
                            role="alert"
                        >
                            <span className="font-semibold">
                                {unrepliedNotification.data.type}
                            </span>{" "}
                            sudah terkirim dan menunggu balasan dari Project
                            Manager.
                        </div>
                    )}

                {can.requestForApproval &&
                    notification &&
                    notification.data.type == "Request Denied" && (
                        <div
                            className="flex items-center justify-between gap-2 px-3 py-2 mb-2 text-red-800 rounded-lg bg-red-100 dark:bg-gray-600 dark:text-red-400"
                            role="alert"
                        >
                            <div>
                                <span className="font-semibold">
                                    {notification.data.type}.
                                </span>{" "}
                                {notification.data.message}.
                            </div>

                            <PrimaryLink
                                href={route(
                                    "weekly-reports.request-for-approval",
                                    [weeklyReport, notification]
                                )}
                                className="!px-2 !bg-green-400 !text-green-800 dark:!bg-green-600 dark:!text-green-50 text-center whitespace-nowrap"
                            >
                                <FaCheckCircle className="h-3 w-3 mr-1" />
                                Done & Request Again
                            </PrimaryLink>
                        </div>
                    )}

                {notification &&
                    notification.data.type == "Request Approved" && (
                        <div
                            className="flex items-center justify-between gap-2 px-3 py-2 mb-2 text-green-800 rounded-lg bg-green-100 dark:bg-gray-600 dark:text-green-400"
                            role="alert"
                        >
                            <div>
                                <span className="font-semibold">
                                    {notification.data.type}.
                                </span>{" "}
                                {notification.data.message}.
                            </div>
                            <button
                                type="button"
                                className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
                                aria-label="Close"
                                onClick={() => router.reload()}
                            >
                                <span className="sr-only">Close</span>
                                <FaCheckCircle className="h-full w-full" />
                            </button>
                        </div>
                    )}

                <div className="flex flex-row items-center flex-nowrap p-1 justify-between bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                    <div className="grow sm:text-right">
                        <h2 className="text-black font-bold uppercase dark:text-white">
                            {project.name}
                        </h2>
                    </div>
                    <div className="grow flex justify-end items-center gap-1">
                        {can.update && (
                            <SecondaryLink
                                href={route(
                                    "weekly-reports.edit",
                                    weeklyReport
                                )}
                            >
                                <FaEdit className="h-3 w-3 mr-1" />
                                Edit
                            </SecondaryLink>
                        )}
                        {can.export && (
                            <a
                                href={route(
                                    "weekly-reports.export-view",
                                    weeklyReport
                                )}
                                target="_blank"
                                className="inline-flex justify-center items-center px-2 py-1 bg-green-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                <FaFilePdf className="h-3 w-3 mr-1" />
                                Print
                            </a>
                        )}
                    </div>
                </div>

                <div className="relative overflow-x-auto border-x border-gray-900 dark:border-gray-300">
                    <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
                        <tbody>
                            <tr className="border-y border-gray-900 dark:border-gray-300">
                                <td className="whitespace-nowrap pl-2">
                                    Location
                                </td>
                                <td className="whitespace-nowrap pr-2">
                                    : {project.location}
                                </td>
                                <td className="whitespace-nowrap pl-2 border-l border-gray-900 sm:md:lg:border-0 dark:border-gray-300">
                                    Report No.
                                </td>
                                <td className="whitespace-nowrap pr-2">
                                    : {weeklyReport.reportNumber}
                                </td>
                            </tr>
                            <tr className="border-y border-gray-900 dark:border-gray-300">
                                <td className="whitespace-nowrap pl-2">
                                    Client Name
                                </td>
                                <td className="whitespace-nowrap pr-2">
                                    : {project.client.name}
                                </td>
                                <td className="whitespace-nowrap pl-2 border-l border-gray-900 sm:md:lg:border-0 dark:border-gray-300">
                                    Scope Of Work
                                </td>
                                <td className="whitespace-nowrap pr-2">
                                    : {project.scopeOfWork}
                                </td>
                            </tr>
                            <tr className="border-y border-gray-900 dark:border-gray-300">
                                <td className="whitespace-nowrap pl-2">Date</td>
                                <td className="whitespace-nowrap pr-2">
                                    : {weeklyReport.date}
                                </td>
                                <td className="whitespace-nowrap pl-2 border-l border-gray-900 sm:md:lg:border-0 dark:border-gray-300">
                                    Working Hours
                                </td>
                                <td className="whitespace-nowrap pr-2">:</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Personels */}
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 mb-4">
                <div className="text-center p-1 bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                    <h2 className="text-black font-bold uppercase dark:text-white">
                        Personels
                    </h2>
                </div>
                <Personels weeklyReport={weeklyReport} />
            </div>

            {/* HSE & Equipment */}
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 mb-4">
                <div className="grid md:grid-cols-2 gap-2">
                    <div className="col-auto">
                        <div className="text-center p-1 bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                            <h2 className="text-black font-bold uppercase dark:text-white">
                                HSE
                            </h2>
                        </div>

                        {/* HSE Statistics Table */}
                        <HSEStatistic hseStatistics={hseStatistics} />
                    </div>
                    <div className="col-auto">
                        <div className="text-center p-1 bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                            <h2 className="text-black font-bold uppercase dark:text-white">
                                Equipment
                            </h2>
                        </div>

                        {/* Equipment Statistics Table */}
                        <Equipment equipment={equipment} />
                    </div>
                </div>
            </div>

            {/* Activities */}
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 mb-4">
                <div className="text-center p-1 bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                    <h2 className="text-black font-bold uppercase dark:text-white">
                        Activities
                    </h2>
                </div>
                {/* Activitys Table */}
                <Activities activities={activities} />
            </div>
        </>
    );
};

Show.layout = (page) => <AuthenticatedLayout children={page} />;
export default Show;

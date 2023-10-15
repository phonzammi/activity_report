import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { FaChevronRight, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import PrimaryLink from "@/Components/PrimaryLink";

import Personels from "@/Pages/DailyReport/Personels/Show";
import HSEStatistic from "@/Pages/DailyReport/HSEStatistics/Show";
import Equipment from "@/Pages/DailyReport/Equipment/Show";
import Activities from "@/Pages/DailyReport/Activities/Show";
import DangerButton from "@/Components/DangerButton";
import Swal from "sweetalert2";

const ShowDailyReport = () => {
    const { dailyReport, notification, auth } = usePage().props;

    const { can } = dailyReport;

    window.Echo.private(`App.Models.User.${auth.user.id}`).notification(() => {
        return router.reload();
    });

    const { project, hseStatistics, equipment, activities } = dailyReport;

    const denyApproval = (e, notification) => {
        e.preventDefault();
        Swal.fire({
            title: `Message`,
            input: "text",
            inputLabel: "Send Message to HSE Officer :",
            inputPlaceholder: "Message (Optional) ...",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonColor: "#d33",
            confirmButtonText: "Deny Approval",
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            inputValidator: (value) => {
                if (!value) {
                    return "Message wajib diisi!";
                }
            },
            inputAttributes: {
                minlength: 6,
                autocapitalize: "off",
                autocorrect: "off",
            },
            preConfirm: (message) => {
                router.post(
                    route("daily-reports.deny-approval", [
                        dailyReport,
                        notification,
                    ]),
                    { message: message }
                );
            },
        });
    };

    const approveRequest = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Anda yakin ingin Approve the Request?",
            showCancelButton: true,
            confirmButtonText: "Approve",
            allowOutsideClick: false,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                router.post(
                    route("daily-reports.approve-request", [
                        dailyReport,
                        notification,
                    ]),
                    null,
                    {
                        onStart: () => {
                            Swal.fire({
                                title: "Approving ...!",
                                timerProgressBar: true,
                                allowOutsideClick: false,

                                didOpen: () => {
                                    Swal.showLoading();
                                },
                            });
                        },
                        onFinish: () => Swal.close(),
                    }
                );
            } else if (result.isDismissed) {
                Swal.fire("Approve dibatalkan", "", "info");
            }
        });
    };

    return (
        <>
            <Head title={project.name} />

            {/* Bradcrumbs */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Report No. {dailyReport.reportNumber}
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
                                    Daily Report
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
                                    Report No. {dailyReport.reportNumber}
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 mb-4">
                {can.approveRequest && notification && (
                    <div
                        className="flex items-center justify-between gap-2 px-3 py-2 mb-2 text-blue-800 rounded-lg bg-blue-100 dark:bg-gray-600 dark:text-blue-400"
                        role="alert"
                    >
                        <p>
                            <span className="font-semibold">
                                {notification.data.type}.
                            </span>{" "}
                            {notification.data.message}
                            <span className="text-xs">
                                {" "}
                                ({notification.created_at})
                            </span>
                        </p>
                        <div className="flex flex-wrap gap-1 justify-center">
                            <PrimaryLink
                                onClick={approveRequest}
                                as="button"
                                className="!px-2 !bg-green-400 !text-green-800 dark:!bg-green-600 dark:!text-green-50"
                            >
                                <FaCheckCircle className="h-3 w-3 mr-1" />
                                Approve
                            </PrimaryLink>

                            <DangerButton
                                onClick={(e) => denyApproval(e, notification)}
                                className="!px-2 !bg-red-500 !text-red-900 dark:!bg-red-700 dark:!text-red-50"
                            >
                                <FaTimesCircle className="h-3 w-3 mr-1" />
                                Deny
                            </DangerButton>
                        </div>
                    </div>
                )}

                <div className="text-center p-1 bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                    <h2 className="text-black font-bold uppercase dark:text-white">
                        {project.name}
                    </h2>
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
                                    : {dailyReport.reportNumber}
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
                                    : {dailyReport.date}
                                </td>
                                <td className="whitespace-nowrap pl-2 border-l border-gray-900 sm:md:lg:border-0 dark:border-gray-300">
                                    Working Hours
                                </td>
                                <td className="whitespace-nowrap pr-2">
                                    : {dailyReport.workingHours}
                                </td>
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
                <Personels dailyReport={dailyReport} />
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
                        <HSEStatistic hseStatistics={hseStatistics} can={can} />
                    </div>
                    <div className="col-auto">
                        <div className="text-center p-1 bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                            <h2 className="text-black font-bold uppercase dark:text-white">
                                Equipment
                            </h2>
                        </div>

                        {/* Equipment Statistics Table */}
                        <Equipment equipment={equipment} can={can} />
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
                <Activities can={can} activities={activities} />
            </div>
        </>
    );
};
ShowDailyReport.layout = (page) => <AuthenticatedLayout children={page} />;
export default ShowDailyReport;

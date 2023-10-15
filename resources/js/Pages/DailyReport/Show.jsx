import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Fragment, useMemo, useState } from "react";
import {
    FaChevronRight,
    FaPlus,
    FaTimesCircle,
    FaEdit,
    FaRegQuestionCircle,
    FaCheckCircle,
    FaFilePdf,
} from "react-icons/fa";
import Personels from "./Personels/Show";
import CreatePersonels from "./Personels/Create";
import EditPersonels from "./Personels/Edit";

import HSEStatistic from "./HSEStatistics/Show";
import CreateHSEStatistic from "./HSEStatistics/Create";
import EditHSEStatistic from "./HSEStatistics/Edit";

import Equipment from "./Equipment/Show";
import CreateEquipment from "./Equipment/Create";
import EditEquipment from "./Equipment/Edit";

import Activities from "./Activities/Show";
import CreateActivity from "./Activities/Create";

import DangerButton from "@/Components/DangerButton";
import TableButton from "@/Components/TableButton";
import TableEditButton from "@/Components/TableEditButton";
import SecondaryLink from "@/Components/SecondaryLink";
import PrimaryLink from "@/Components/PrimaryLink";
import Swal from "sweetalert2";

const Show = () => {
    const { notification, unrepliedNotification, dailyReport, auth } =
        usePage().props;

    const { project, personels, hseStatistics, equipment, activities, can } =
        dailyReport;

    window.Echo.private(`App.Models.User.${auth.user.id}`).notification(() => {
        return router.reload();
    });

    const [createPersonel, setCreatePersonel] = useState(false);
    const [editPersonel, setEditPersonel] = useState(false);

    const [createHSE, setCreateHSE] = useState(false);
    const [editHSE, setEditHSE] = useState(false);

    const [createEquipment, setCreateEquipment] = useState(false);
    const [editEquipment, setEditEquipment] = useState(false);

    const [createActivity, setCreateActivity] = useState(false);
    const [editActivity, setEditActivity] = useState(false);

    const disabled = useMemo(() => {
        return (
            createPersonel ||
            editPersonel ||
            createHSE ||
            editHSE ||
            createEquipment ||
            editEquipment ||
            createActivity ||
            editActivity
        );
    }, [
        createPersonel,
        editPersonel,
        createHSE,
        editHSE,
        createEquipment,
        editEquipment,
        createActivity,
        editActivity,
    ]);

    // const [disabled, setDisabled] = useState(false);

    // useEffect(() => {
    //     setDisabled(
    //         createPersonel ||
    //             editPersonel ||
    //             createHSE ||
    //             editHSE ||
    //             createEquipment ||
    //             editEquipment ||
    //             createActivity ||
    //             editActivity
    //     );
    // }, [
    //     createPersonel,
    //     editPersonel,
    //     createHSE,
    //     editHSE,
    //     createEquipment,
    //     editEquipment,
    //     createActivity,
    //     editActivity,
    // ]);

    const onCancelButton = () => {
        Swal.fire({
            title: "Yakin ingin membatalkan ?",
            footer: '<span class="py-2 text-red-500">Semua inputan/perubahan tidak akan di simpan !</span>',
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: "#b91c1c",
            allowOutsideClick: false,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                router.reload({ only: ["dailyReport"] });
                setCreatePersonel(false);
                setCreateHSE(false);
                setCreateEquipment(false);
                setCreateActivity(false);
                setEditPersonel(false);
                setEditHSE(false);
                setEditEquipment(false);
                setEditActivity(false);
            } else if (result.isDenied) {
                Swal.fire("Aksi dibatalkan", "", "info");
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
                {can.requestForApproval &&
                    !unrepliedNotification &&
                    !notification &&
                    personels.length > 0 &&
                    hseStatistics.length > 0 &&
                    equipment.length > 0 &&
                    activities.length > 0 && (
                        <div
                            className="flex items-center justify-between gap-2 px-3 py-2 mb-2 text-green-800 rounded-lg bg-green-100 dark:bg-gray-600 dark:text-green-400"
                            role="alert"
                        >
                            <span>
                                Lanjutkan meminta persetujuan dari HSE
                                Coordinator ?
                            </span>
                            <PrimaryLink
                                href={route(
                                    "daily-reports.request-for-approval",
                                    [dailyReport]
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
                                {unrepliedNotification.data.type}.
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
                                    "daily-reports.request-for-approval",
                                    [dailyReport, notification]
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
                                href={route("daily-reports.edit", dailyReport)}
                            >
                                <FaEdit className="h-3 w-3 mr-1" />
                                Edit
                            </SecondaryLink>
                        )}
                        {can.export && (
                            <a
                                href={route(
                                    "daily-reports.export-view",
                                    dailyReport
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
                <div className="flex flex-row items-center flex-nowrap p-1 justify-between bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                    <div className="grow text-right">
                        <h2 className="text-black font-bold uppercase dark:text-white">
                            Personels
                        </h2>
                    </div>
                    <div className="grow text-right">
                        {createPersonel || editPersonel ? (
                            <DangerButton
                                onClick={() => onCancelButton()}
                                className="!px-2 !py-1"
                            >
                                <FaTimesCircle className="h-3 w-3 mr-1" />
                                Batal
                            </DangerButton>
                        ) : (
                            <Fragment>
                                {can.managePersonels && (
                                    <TableButton
                                        onClick={() => setCreatePersonel(true)}
                                        disabled={disabled}
                                    >
                                        <FaPlus className="h-3 w-3 mr-1" />
                                        Tambah
                                    </TableButton>
                                )}
                                {can.managePersonels &&
                                    personels.length > 0 && (
                                        <TableEditButton
                                            className="ml-1"
                                            onClick={() =>
                                                setEditPersonel(true)
                                            }
                                            disabled={disabled}
                                        >
                                            <FaEdit className="h-3 w-3 mr-1" />
                                            Edit
                                        </TableEditButton>
                                    )}
                            </Fragment>
                        )}
                    </div>
                </div>

                {/* Create Personel */}
                {can.managePersonels && createPersonel && (
                    <CreatePersonels
                        dailyReport={dailyReport}
                        setCreatePersonel={setCreatePersonel}
                    />
                )}

                {/* Edit Personel */}
                {can.managePersonels && editPersonel && (
                    <EditPersonels
                        dailyReport={dailyReport}
                        setEditPersonel={setEditPersonel}
                    />
                )}

                {/* Personels Table */}
                {!createPersonel && !editPersonel && (
                    <Personels dailyReport={dailyReport} />
                )}
            </div>

            {/* HSE & Equipment */}
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 mb-4">
                <div className="grid md:grid-cols-2 gap-2">
                    <div className="col-auto">
                        <div className="flex justify-between items-center p-1 bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                            <div
                                className={`grow text-left ${
                                    dailyReport.approvedBy && "!text-right"
                                }`}
                            >
                                <h2 className="text-black font-bold uppercase dark:text-white">
                                    HSE
                                </h2>
                            </div>
                            <div className="grow text-right">
                                {createHSE || editHSE ? (
                                    <DangerButton
                                        onClick={() => onCancelButton()}
                                        className="!px-2 !py-1"
                                    >
                                        <FaTimesCircle className="h-3 w-3 mr-1" />
                                        Batal
                                    </DangerButton>
                                ) : (
                                    <Fragment>
                                        {can.manageHseStatistics && (
                                            <TableButton
                                                onClick={() =>
                                                    setCreateHSE(true)
                                                }
                                                disabled={disabled}
                                            >
                                                <FaPlus className="h-3 w-3 mr-1" />
                                                Tambah
                                            </TableButton>
                                        )}

                                        {can.manageHseStatistics &&
                                            hseStatistics.length > 0 && (
                                                <TableEditButton
                                                    className="ml-1"
                                                    onClick={() =>
                                                        setEditHSE(true)
                                                    }
                                                    disabled={disabled}
                                                >
                                                    <FaEdit className="h-3 w-3 mr-1" />
                                                    Edit
                                                </TableEditButton>
                                            )}
                                    </Fragment>
                                )}
                            </div>
                        </div>

                        {/* Create HSE */}
                        {can.manageHseStatistics && createHSE && (
                            <CreateHSEStatistic
                                dailyReportId={dailyReport.id}
                                setCreateHSE={setCreateHSE}
                            />
                        )}

                        {/* Edit HSE */}
                        {can.manageHseStatistics && editHSE && (
                            <EditHSEStatistic
                                dailyReportId={dailyReport.id}
                                hseStatistics={hseStatistics}
                                setEditHSE={setEditHSE}
                            />
                        )}

                        {/* HSE Statistics Table */}
                        {!createHSE && !editHSE && (
                            <HSEStatistic
                                hseStatistics={hseStatistics}
                                can={can}
                            />
                        )}
                    </div>
                    <div className="col-auto">
                        <div className="flex justify-between items-center p-1 bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                            <div
                                className={`grow text-left ${
                                    dailyReport.approvedBy && "!text-right"
                                }`}
                            >
                                <h2 className="text-black font-bold uppercase dark:text-white">
                                    Equipment
                                </h2>
                            </div>
                            <div className="grow text-right">
                                {createEquipment || editEquipment ? (
                                    <DangerButton
                                        onClick={() => onCancelButton()}
                                        className="!px-2 !py-1"
                                    >
                                        <FaTimesCircle className="h-3 w-3 mr-1" />
                                        Batal
                                    </DangerButton>
                                ) : (
                                    <Fragment>
                                        {can.manageEquipment && (
                                            <TableButton
                                                onClick={() =>
                                                    setCreateEquipment(true)
                                                }
                                                disabled={disabled}
                                            >
                                                <FaPlus className="h-3 w-3 mr-1" />
                                                Tambah
                                            </TableButton>
                                        )}
                                        {can.manageEquipment &&
                                            equipment.length > 0 && (
                                                <TableEditButton
                                                    className="ml-1"
                                                    onClick={() =>
                                                        setEditEquipment(true)
                                                    }
                                                    disabled={disabled}
                                                >
                                                    <FaEdit className="h-3 w-3 mr-1" />
                                                    Edit
                                                </TableEditButton>
                                            )}
                                    </Fragment>
                                )}
                            </div>
                        </div>

                        {/* Create Equipment */}
                        {can.manageEquipment && createEquipment && (
                            <CreateEquipment
                                dailyReportId={dailyReport.id}
                                setCreateEquipment={setCreateEquipment}
                            />
                        )}

                        {/* Edit Equipment */}
                        {can.manageEquipment && editEquipment && (
                            <EditEquipment
                                dailyReportId={dailyReport.id}
                                equipment={equipment}
                                setEditEquipment={setEditEquipment}
                            />
                        )}

                        {/* Equipment Statistics Table */}
                        {!createEquipment && !editEquipment && (
                            <Equipment equipment={equipment} can={can} />
                        )}
                    </div>
                </div>
            </div>

            {/* Activities */}
            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 mb-4">
                <div className="flex flex-row items-center flex-nowrap p-1 justify-between bg-blue-300 border border-gray-900 dark:bg-primary1 dark:border-gray-300">
                    <div className="grow text-right">
                        <h2 className="text-black font-bold uppercase dark:text-white">
                            Activities
                        </h2>
                    </div>
                    <div className="grow text-right">
                        {createActivity || editActivity ? (
                            <DangerButton
                                onClick={() => onCancelButton()}
                                className="!px-2 !py-1"
                            >
                                <FaTimesCircle className="h-3 w-3 mr-1" />
                                Batal
                            </DangerButton>
                        ) : (
                            <Fragment>
                                {can.manageEquipment && (
                                    <TableButton
                                        onClick={() => setCreateActivity(true)}
                                        disabled={disabled}
                                    >
                                        <FaPlus className="h-3 w-3 mr-1" />
                                        Tambah
                                    </TableButton>
                                )}
                            </Fragment>
                        )}
                    </div>
                </div>

                {/* Table */}

                {/* Create Activity */}
                {can.manageEquipment && createActivity && (
                    <CreateActivity
                        dailyReportId={dailyReport.id}
                        setCreateActivity={setCreateActivity}
                    />
                )}

                {/* Activitys Table */}
                {!createActivity && (
                    <Activities
                        setEditActivity={setEditActivity}
                        editActivity={editActivity}
                        activities={activities}
                        can={can}
                    />
                )}
            </div>
        </>
    );
};
Show.layout = (page) => <AuthenticatedLayout children={page} />;
export default Show;

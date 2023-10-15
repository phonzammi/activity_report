import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    FaFileContract,
    FaFileInvoice,
    FaListAlt,
    FaUsers,
} from "react-icons/fa";

const Dashboard = () => {
    const {
        auth,
        clientsCount,
        projectsCount,
        dailyReportsCount,
        weeklyReportsCount,
        monthlyReportsCount,
    } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />

            <div className="grid gap-3 md:grid-flow-col">
                <div className="p-6 flex items-center gap-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span>
                        <FaUsers className="h-16 w-16" />
                    </span>
                    <div className="flex-1">
                        <Link href={route("clients.index")}>
                            <h5 className="inline-flex text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                Clients
                            </h5>
                        </Link>
                        <p className=" font-normal text-gray-500 dark:text-gray-400">
                            Total : {clientsCount}
                        </p>
                    </div>
                </div>
                <div className="p-6 flex items-center gap-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <span>
                        <FaListAlt className="h-16 w-16" />
                    </span>
                    <div className="flex-1">
                        <Link href={route("projects.index")}>
                            <h5 className="inline-flex text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                Projects
                            </h5>
                        </Link>
                        <p className=" font-normal text-gray-500 dark:text-gray-400">
                            Total : {projectsCount}
                        </p>
                    </div>
                </div>
                {auth.user.can.viewAnyDailyReport && (
                    <div className="p-6 flex items-center gap-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <span>
                            <FaFileContract className="h-16 w-16" />
                        </span>
                        <div className="flex-1">
                            <Link href={route("daily-reports.index")}>
                                <h5 className="inline-flex text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    Daily Reports
                                </h5>
                            </Link>
                            <p className=" font-normal text-gray-500 dark:text-gray-400">
                                Total : {dailyReportsCount}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {auth.user.can.viewAnyWeeklyReport &&
                auth.user.can.viewAnyMonthlyReport && (
                    <>
                        <h3 className="text-title-sm my-3 text-black dark:text-white">
                            Accumulation Reports :
                        </h3>
                        <div className="grid gap-3 md:grid-flow-col">
                            <div className="p-6 flex items-center gap-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <span>
                                    <FaFileInvoice className="h-16 w-16" />
                                </span>
                                <div className="flex-1">
                                    <Link href={route("weekly-reports.index")}>
                                        <h5 className="inline-flex text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Weekly Reports
                                        </h5>
                                    </Link>
                                    <p className=" font-normal text-gray-500 dark:text-gray-400">
                                        Total : {weeklyReportsCount}
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 flex items-center gap-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <span>
                                    <FaFileInvoice className="h-16 w-16" />
                                </span>
                                <div className="flex-1">
                                    <Link href={route("monthly-reports.index")}>
                                        <h5 className="inline-flex text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                            Monthly Reports
                                        </h5>
                                    </Link>
                                    <p className=" font-normal text-gray-500 dark:text-gray-400">
                                        Total : {monthlyReportsCount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

            {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> */}
            {/* <div className="bg-white overflow-hidden dark:bg-gray-900 shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-white">
                            You're logged in!
                        </div>
                    </div> */}
            {/* </div> */}
            {/* </div> */}
        </>
    );
};
Dashboard.layout = (page) => (
    <AuthenticatedLayout children={page} title="Dashboard" />
);

export default Dashboard;

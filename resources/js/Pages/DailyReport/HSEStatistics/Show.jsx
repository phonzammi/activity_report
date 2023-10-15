import { router } from "@inertiajs/react";
import React from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default (props) => {
    const { hseStatistics, can } = props;

    const remove = (hseStatistic) => {
        Swal.fire({
            title: "Anda yakin ingin Menghapus HSE Statistic ini?",
            text: hseStatistic.description,
            showCancelButton: true,
            confirmButtonText: "Hapus",
            confirmButtonColor: "#b91c1c",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("daily-reports.hse-statistics.delete", [
                        hseStatistic.daily_report_id,
                        hseStatistic,
                    ]),
                    {
                        onStart: () => {
                            Swal.fire({
                                title: "Menghapus ...!",
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
                Swal.fire("Hapus dibatalkan", "", "info");
            }
        });
    };
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead className="h-14 bg-gray-300 text-xs text-gray-700 uppercase border border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
                    <tr>
                        <th
                            className="py-1 text-center align-middle border-b border-gray-900 dark:border-gray-300"
                            colSpan="5"
                            scope="colgroup"
                        >
                            HSE Statistics
                        </th>
                    </tr>

                    <tr>
                        <th
                            className="w-4 px-2 py-1 text-center align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            No.
                        </th>
                        <th
                            className="px-2 py-1 text-center align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Description
                        </th>
                        <th
                            className="px-2 py-1 text-center align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Unit
                        </th>
                        <th
                            className="px-2 py-1 text-center align-middle border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Total
                        </th>
                        <th scope="col">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-center align-top border-x border-gray-900 dark:border-gray-300">
                    {!hseStatistics.length > 0 && (
                        <tr className="font-bold border-b border-gray-900 dark:border-gray-300">
                            <td
                                colSpan="5"
                                className="text-gray-100 bg-red-600 "
                            >
                                Belum ada HSE Statistic. Silahkan Tambah.
                            </td>
                        </tr>
                    )}
                    {hseStatistics.length > 0 &&
                        hseStatistics.map((hseStatistic, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="font-bold border-b border-gray-900 dark:border-gray-300"
                                >
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {index + 1}
                                    </td>
                                    <td className="pl-2 text-left border-r border-gray-900 dark:border-gray-300">
                                        {hseStatistic.description}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {hseStatistic.unit}
                                    </td>
                                    <td>{hseStatistic.total}</td>
                                    <td className="p-1">
                                        {can.manageHseStatistics && (
                                            <div className="flex justify-center items-center">
                                                <FaTrash
                                                    onClick={() =>
                                                        remove(hseStatistic)
                                                    }
                                                    className="text-sm text-red-500 hover:text-gray-800 focus:outline-none dark:text-red-400 dark:hover:text-gray-100"
                                                />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

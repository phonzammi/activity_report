import PrimaryButton from "@/Components/PrimaryButton";
import { router, useForm } from "@inertiajs/react";
import React, { useState } from "react";
import { FaPencilAlt, FaSave, FaTrash, FaTrashAlt } from "react-icons/fa";
import Edit from "./Edit";
import Swal from "sweetalert2";

export default (props) => {
    const { can, activities, editActivity, setEditActivity } = props;

    const [activity, setActivity] = useState(null);

    const editing = (activity) => {
        setEditActivity(true);
        setActivity(activity);
    };

    const remove = (activity) => {
        Swal.fire({
            title: "Anda yakin ingin Menghapus Activity ini?",
            footer: '<span class="py-2 text-red-500">Semua Documentations dari Activity ini akan terhapus !</span>',
            text: activity.description,
            showCancelButton: true,
            confirmButtonText: "Hapus",
            confirmButtonColor: "#b91c1c",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("daily-reports.activities.delete", [
                        activity.dailyReportId,
                        activity,
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
        <div className="relative overflow-x-auto border border-gray-900 dark:border-gray-300">
            <form>
                <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-300 text-xs text-gray-700 uppercase border-b border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
                        <tr>
                            <th
                                className="w-4 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                                scope="col"
                            >
                                No.
                            </th>
                            <th
                                className="w-52 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                                scope="col"
                            >
                                Today activities
                            </th>
                            <th
                                className="w-32 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                                scope="col"
                                colSpan="3"
                            >
                                QTY
                            </th>
                            <th
                                className="w-16 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                                scope="col"
                            >
                                Volume
                            </th>
                            <th
                                className="w-16 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                                scope="col"
                            >
                                Unit
                            </th>
                            <th
                                className="w-96 px-2 py-1 align-middle"
                                scope="col"
                            >
                                <div className="flex items-center">
                                    Documentation
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {editActivity && (
                        <Edit
                            activity={activity}
                            setEditActivity={setEditActivity}
                        />
                    )}
                    <tbody className="text-center font-bold">
                        {!activities.length > 0 && (
                            <tr className="font-bold border-b border-gray-900 dark:border-gray-300">
                                <td
                                    colSpan="8"
                                    className="text-gray-100 bg-red-600 "
                                >
                                    Belum ada Activities. Silahkan Tambah.
                                </td>
                            </tr>
                        )}
                        {!editActivity &&
                            activities.length > 0 &&
                            activities.map((activity, index) => (
                                <tr
                                    key={index}
                                    className="whitespace-nowrap border-b border-gray-900 dark:border-gray-300"
                                >
                                    <th
                                        className="py-2 border-r border-gray-900 dark:border-gray-300"
                                        scope="row"
                                    >
                                        {index + 1}
                                    </th>
                                    <td className="py-2 border-r border-gray-900 dark:border-gray-300">
                                        {activity.description}
                                    </td>
                                    <td className="w-16 py-2 border-r border-gray-900 dark:border-gray-300">
                                        {activity.qty1}
                                    </td>
                                    <td className="w-16 py-2 border-r border-gray-900 dark:border-gray-300">
                                        {activity.qty2}
                                    </td>
                                    <td className="w-16 py-2 border-r border-gray-900 dark:border-gray-300">
                                        {activity.qty3}
                                    </td>
                                    <td className="py-2 border-r border-gray-900 dark:border-gray-300">
                                        {activity.volume}
                                    </td>
                                    <td className="py-2 border-r border-gray-900 dark:border-gray-300">
                                        {activity.unit}
                                    </td>
                                    <td className="py-2 align-middle h-40">
                                        {can.manageActivities && (
                                            <div className="flex items-center justify-end relative gap-1">
                                                <button
                                                    type="button"
                                                    className="w-7 h-7 opacity-65 z-1 text-white border border-gray-400 bg-yellow-400 rounded-full flex justify-center items-center hover:opacity-100 transition-colors"
                                                    onClick={() =>
                                                        editing(activity)
                                                    }
                                                >
                                                    <FaPencilAlt className="h-3 w-3" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="w-7 h-7 opacity-65 z-1 text-white border border-gray-400 bg-red-400 rounded-full flex justify-center items-center hover:opacity-100 transition-colors"
                                                    onClick={() =>
                                                        remove(activity)
                                                    }
                                                >
                                                    <FaTrashAlt className="h-3 w-3" />
                                                </button>
                                            </div>
                                        )}
                                        {activity.documentations.length > 0 ? (
                                            <div
                                                className={`grid grid-cols-1 gap-2 m-1 ${
                                                    activity.documentations
                                                        .length >= 2 &&
                                                    "md:grid-cols-2"
                                                }`}
                                            >
                                                {activity.documentations.map(
                                                    (documentation, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="col-auto relative"
                                                            >
                                                                <img
                                                                    className={`mx-auto shadow-2 shadow-gray-600 rounded-md ${
                                                                        activity
                                                                            .documentations
                                                                            .length >
                                                                        1
                                                                            ? "min-w-full"
                                                                            : "md:w-1/2"
                                                                    }`}
                                                                    src={
                                                                        documentation.document_image_url
                                                                    }
                                                                    alt={
                                                                        documentation.title
                                                                    }
                                                                />
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        ) : (
                                            <span>Tidak ada Dokumentasi</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

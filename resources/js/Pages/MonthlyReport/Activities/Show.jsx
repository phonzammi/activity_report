import React from "react";

export default (props) => {
    const { activities } = props;

    return (
        <div className="relative overflow-x-auto border border-gray-900 dark:border-gray-300">
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
                        <th className="w-96 px-2 py-1 align-middle" scope="col">
                            Documentation
                        </th>
                    </tr>
                </thead>
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
                    {activities.length > 0 &&
                        activities.map((activity, index) => (
                            <tr
                                key={index}
                                className="whitespace-nowrap border-b border-gray-900 dark:border-gray-300"
                            >
                                <th
                                    className="border-r border-gray-900 dark:border-gray-300"
                                    scope="row"
                                >
                                    {index + 1}
                                </th>
                                <td className="border-r border-gray-900 dark:border-gray-300">
                                    {activity.description}
                                </td>
                                <td className="w-16 border-r border-gray-900 dark:border-gray-300">
                                    {activity.qty1}
                                </td>
                                <td className="w-16 border-r border-gray-900 dark:border-gray-300">
                                    {activity.qty2}
                                </td>
                                <td className="w-16 border-r border-gray-900 dark:border-gray-300">
                                    {activity.qty3}
                                </td>
                                <td className="border-r border-gray-900 dark:border-gray-300">
                                    {activity.volume}
                                </td>
                                <td className="border-r border-gray-900 dark:border-gray-300">
                                    {activity.unit}
                                </td>
                                <td className="align-middle h-40">
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
        </div>
    );
};

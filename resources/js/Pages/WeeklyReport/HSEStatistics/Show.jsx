import React from "react";

export default ({ hseStatistics }) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead className="h-14 bg-gray-300 text-xs text-gray-700 uppercase border border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
                    <tr>
                        <th
                            className="py-1 text-center align-middle border-b border-gray-900 dark:border-gray-300"
                            colSpan="4"
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
                    </tr>
                </thead>
                <tbody className="text-center align-top border-x border-gray-900 dark:border-gray-300">
                    {!hseStatistics.length > 0 && (
                        <tr className="font-bold border-b border-gray-900 dark:border-gray-300">
                            <td colSpan="4" className="text-gray-100 bg-red-600 ">
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
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

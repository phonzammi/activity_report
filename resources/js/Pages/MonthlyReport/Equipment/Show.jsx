import React from "react";

export default ({ equipment }) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead className="h-14 bg-gray-300 text-xs text-gray-700 uppercase border border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
                    <tr>
                        <th
                            className="w-4 px-2 text-center align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            No.
                        </th>
                        <th
                            className="px-2 text-center align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Equipment & Tools
                        </th>
                        <th
                            className="px-2 text-center align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Unit
                        </th>
                        <th
                            className="px-2 text-center align-middle border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody className="text-center align-top border-x border-gray-900 dark:border-gray-300">
                    {!equipment.length > 0 && (
                        <tr className="font-bold border-b border-gray-900 dark:border-gray-300">
                            <td
                                colSpan="4"
                                className="text-gray-100 bg-red-600 "
                            >
                                Belum ada Equipment & Tools. Silahkan Tambah.
                            </td>
                        </tr>
                    )}
                    {equipment.length > 0 &&
                        equipment.map((equipment, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="font-bold border-b border-gray-900 dark:border-gray-300"
                                >
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {index + 1}
                                    </td>
                                    <td className="pl-2 text-left border-r border-gray-900 dark:border-gray-300">
                                        {equipment.description}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {equipment.unit}
                                    </td>
                                    <td>{equipment.total}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

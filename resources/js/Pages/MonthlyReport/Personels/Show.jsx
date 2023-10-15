import { useState } from "react";

export default ({ monthlyReport }) => {
    const { personels } = monthlyReport;
    const [indirectPersonels] = useState(() =>
        personels?.filter((personel) => personel.direction_id == 1)
    );
    const [directPersonels] = useState(() =>
        personels?.filter((personel) => personel.direction_id == 2)
    );

    // useEffect(() => {
    //     setIndirectPersonels(
    //         personels.length > 0 &&
    //             personels.filter((personel) => personel.direction_id == 1)
    //     );

    //     setDirectPersonels(
    //         personels.length > 0 &&
    //             personels.filter((personel) => personel.direction_id == 2)
    //     );
    // }, [personels]);

    return (
        <div className="relative overflow-x-auto border border-gray-900 dark:border-gray-300">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead className="h-14 bg-gray-300 text-xs text-gray-700 uppercase border-b border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
                    <tr>
                        <th
                            className="w-4 px-2 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="2"
                            scope="col"
                        >
                            No.
                        </th>
                        <th
                            className="px-2 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="2"
                            scope="col"
                        >
                            Description
                        </th>
                        <th
                            className="px-2 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="2"
                            scope="col"
                        >
                            Unit
                        </th>
                        <th
                            className="px-2 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="2"
                            scope="col"
                        >
                            Today
                        </th>

                        <th
                            className="px-2 py-1 align-middle border-r border-b border-gray-900 dark:border-gray-300"
                            colSpan="4"
                            scope="colgroup"
                        >
                            ManHours
                        </th>
                        <th
                            className="px-2 align-middle"
                            rowSpan="2"
                            scope="col"
                        >
                            Remarks
                        </th>
                    </tr>

                    <tr>
                        <th
                            className="px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Unit
                        </th>
                        <th
                            className="px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Prev.
                        </th>
                        <th
                            className="px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Today
                        </th>
                        <th
                            className="px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Cum
                        </th>
                    </tr>
                </thead>
                <tbody className="text-center font-bold">
                    {/* Indirect Start */}
                    <tr className="whitespace-nowrap border-b border-gray-900 hover:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-600">
                        <th
                            className="border-r border-gray-900 dark:border-gray-300"
                            scope="row"
                        >
                            A
                        </th>
                        <td colSpan="8" className="px-2 text-left">
                            Indirect
                        </td>
                    </tr>

                    {/* Indirect List */}
                    {indirectPersonels.length > 0 &&
                        indirectPersonels.map((personel, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="whitespace-nowrap border-b border-gray-900 hover:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-600"
                                >
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {index + 1}
                                    </td>
                                    <td className="px-2 text-left border-r border-gray-900 dark:border-gray-300">
                                        {personel.personel_name}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.unit}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.today}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_unit}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_prev}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_today}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_cum}
                                    </td>
                                    <td>{personel.remarks}</td>
                                </tr>
                            );
                        })}

                    {/* Total Indirect */}
                    <tr className="whitespace-nowrap bg-blue-300 text-black border-b border-gray-900 hover:bg-gray-100 dark:border-gray-300 dark:hover:bg-gray-600">
                        <td></td>
                        <td className="px-2 text-right border-r border-gray-900 dark:border-gray-900">
                            Total Indirect
                        </td>
                        <td></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.indirectPersonelsTodaySum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900"></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.indirectPersonelsManhoursPrevSum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.indirectPersonelsManhoursTodaySum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.indirectPersonelsManhoursCumSum}
                        </td>
                        <td></td>
                    </tr>

                    {/* Indirect End */}

                    {/* Direct Start */}
                    <tr className="whitespace-nowrap border-b border-gray-900 hover:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-600">
                        <th
                            className="border-r border-gray-900 dark:border-gray-300"
                            scope="row"
                        >
                            B
                        </th>
                        <td colSpan="8" className="px-2 text-left">
                            Direct
                        </td>
                    </tr>

                    {/* Direct List */}
                    {directPersonels.length > 0 &&
                        directPersonels.map((personel, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="whitespace-nowrap border-b border-gray-900 hover:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-600"
                                >
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {index + 1}
                                    </td>
                                    <td className="px-2 text-left border-r border-gray-900 dark:border-gray-300">
                                        {personel.personel_name}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.unit}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.today}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_unit}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_prev}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_today}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_cum}
                                    </td>
                                    <td>{personel.remarks}</td>
                                </tr>
                            );
                        })}

                    {/* Total Direct */}
                    <tr className="whitespace-nowrap bg-blue-300 text-black border-b border-gray-900 hover:bg-gray-100 dark:border-gray-300 dark:hover:bg-gray-600">
                        <td></td>
                        <td className="px-2 text-right border-r border-gray-900 dark:border-gray-900">
                            Total Direct
                        </td>
                        <td></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.directPersonelsTodaySum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900"></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.directPersonelsManhoursPrevSum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.directPersonelsManhoursTodaySum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.directPersonelsManhoursCumSum}
                        </td>
                        <td></td>
                    </tr>

                    {/* Direct End */}

                    {/* Total Manpower */}
                    <tr className="whitespace-nowrap bg-blue-300 text-black border-b border-gray-900 hover:bg-gray-100 dark:border-gray-300 dark:hover:bg-gray-600">
                        <td></td>
                        <td className="text-right pr-2 border-r border-gray-900 dark:border-gray-900">
                            Total Manpower
                        </td>
                        <td></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.personelsTodaySum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900"></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.personelsManhoursPrevSum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.personelsManhoursTodaySum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {monthlyReport.personelsManhoursCumSum}
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

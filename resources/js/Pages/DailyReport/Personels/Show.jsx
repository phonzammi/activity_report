import { router } from "@inertiajs/react";
import { useMemo } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default ({ dailyReport }) => {
    const { personels, can } = dailyReport;
    // const [indirectPersonels, setIndirectPersonels] = useState(() =>
    //     personels?.filter((personel) => personel.direction_id == 1)
    // );
    // const [directPersonels, setDirectPersonels] = useState(() =>
    //     personels?.filter((personel) => personel.direction_id == 2)
    // );

    const indirectPersonels = useMemo(() => personels?.filter((personel) => personel.direction_id == 1, []));
    const directPersonels = useMemo(() => personels?.filter((personel) => personel.direction_id == 2, []));

    // useEffect(() => {
    //     setIndirectPersonels(() =>
    //         personels?.filter((personel) => personel.direction_id == 1)
    //     );

    //     setDirectPersonels(() =>
    //         personels?.filter((personel) => personel.direction_id == 2)
    //     );
    // }, [personels]);

    const remove = (personel) => {
        Swal.fire({
            title: "Anda yakin ingin Menghapus Personel ini?",
            text: personel.personel_name,
            showCancelButton: true,
            confirmButtonText: "Hapus",
            confirmButtonColor: "#b91c1c",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("daily-reports.personels.delete", [
                        dailyReport,
                        personel,
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
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-300 text-xs text-gray-700 uppercase border-b border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
                    <tr>
                        <th
                            className="w-4 px-2 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="3"
                            scope="col"
                        >
                            No.
                        </th>
                        <th
                            className="px-2 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="3"
                            scope="col"
                        >
                            Description
                        </th>
                        <th
                            className="w-20 px-2 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="3"
                            scope="col"
                        >
                            Unit
                        </th>
                        <th
                            className="w-20 px-2 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="3"
                            scope="col"
                        >
                            Today
                        </th>

                        <th
                            className="px-2 py-1 align-middle border-r border-b border-gray-900 dark:border-gray-300"
                            colSpan="6"
                            scope="colgroup"
                        >
                            ManHours
                        </th>
                        <th
                            className="px-2 align-middle"
                            rowSpan="3"
                            scope="col"
                        >
                            Remarks
                        </th>
                        <th scope="col" rowSpan="3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>

                    <tr>
                        <th
                            className="w-20 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                            rowSpan="2"
                        >
                            Unit
                        </th>
                        <th
                            className="w-20 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                            rowSpan="2"
                        >
                            Prev.
                        </th>
                        <th
                            className="px-2 py-1 align-middle border-r border-b border-gray-900 dark:border-gray-300"
                            scope="colgroup"
                            colSpan="2"
                        >
                            Today
                        </th>
                        <th
                            className="w-20 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="2"
                            scope="col"
                        >
                            Daily Total
                        </th>
                        <th
                            className="w-20 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            rowSpan="2"
                            scope="col"
                        >
                            Cum
                        </th>
                    </tr>

                    <tr>
                        <th
                            className="w-16 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Working Hours
                        </th>
                        <th
                            className="w-16 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                            scope="col"
                        >
                            Overtime Hours
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
                        <td colSpan="11" className="px-2 text-left">
                            Indirect
                        </td>
                        {/* <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td> */}
                    </tr>

                    {/* Indirect List */}
                    {!indirectPersonels.length > 0 && (
                        <tr className="font-bold border-b border-gray-900 dark:border-gray-300">
                            <td
                                colSpan="12"
                                className="text-gray-100 bg-red-600 "
                            >
                                Belum ada Indirect Personel. Silahkan Tambah.
                            </td>
                        </tr>
                    )}
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
                                        {personel.manhours_working_hours}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_overtime_hours}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_daily_total}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_cum}
                                    </td>
                                    <td>{personel.remarks}</td>
                                    <td className="p-1">
                                        {can.managePersonels && (
                                            <>
                                                <FaTrash
                                                    onClick={() =>
                                                        remove(personel)
                                                    }
                                                    className="text-sm text-red-500 hover:cursor-pointer hover:text-gray-800 focus:outline-none dark:text-red-400 dark:hover:text-gray-100"
                                                />
                                            </>
                                        )}
                                    </td>
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
                            {dailyReport.indirectPersonelsTodaySum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900"></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {dailyReport.indirectPersonelsManhoursPrevSum}
                        </td>
                        <td></td>
                        <td></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {dailyReport.indirectPersonelsManhoursDailyTotalSum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {dailyReport.indirectPersonelsManhoursCumSum}
                        </td>
                        <td colSpan="2"></td>
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
                        <td colSpan="11" className="px-2 text-left">
                            Direct
                        </td>
                        {/* <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td> */}
                    </tr>

                    {/* Direct List */}
                    {!directPersonels.length > 0 && (
                        <tr className="font-bold border-b border-gray-900 dark:border-gray-300">
                            <td
                                colSpan="12"
                                className="text-gray-100 bg-red-600 "
                            >
                                Belum ada Direct Personel. Silahkan Tambah.
                            </td>
                        </tr>
                    )}
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
                                        {personel.manhours_working_hours}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_overtime_hours}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_daily_total}
                                    </td>
                                    <td className="border-r border-gray-900 dark:border-gray-300">
                                        {personel.manhours_cum}
                                    </td>
                                    <td>{personel.remarks}</td>
                                    <td className="p-1">
                                        {can.managePersonels && (
                                            <>
                                                <FaTrash
                                                    onClick={() =>
                                                        remove(personel)
                                                    }
                                                    className="text-sm text-red-500 hover:cursor-pointer hover:text-gray-800 focus:outline-none dark:text-red-400 dark:hover:text-gray-100"
                                                />
                                            </>
                                        )}
                                    </td>
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
                            {dailyReport.directPersonelsTodaySum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900"></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {dailyReport.directPersonelsManhoursPrevSum}
                        </td>
                        <td></td>
                        <td></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {dailyReport.directPersonelsManhoursDailyTotalSum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {dailyReport.directPersonelsManhoursCumSum}
                        </td>
                        <td colSpan="2"></td>
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
                            {dailyReport.personelsTodaySum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900"></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {dailyReport.personelsManhoursPrevSum}
                        </td>
                        <td></td>
                        <td></td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {dailyReport.personelsManhoursDailyTotalSum}
                        </td>
                        <td className="border-r border-gray-900 dark:border-gray-900">
                            {dailyReport.personelsManhoursCumSum}
                        </td>
                        <td colSpan="2"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

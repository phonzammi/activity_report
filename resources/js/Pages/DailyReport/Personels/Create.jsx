import PrimaryButton from "@/Components/PrimaryButton";
import TableTextInput from "@/Components/TableTextInput";
import { useForm } from "@inertiajs/react";
import {
    FaPlusCircle,
    FaSave,
    FaTrash
} from "react-icons/fa";

export default (props) => {
    const { dailyReport, setCreatePersonel } = props;

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            indirect_personels: [
                {
                    personel_name: "",
                    direction_id: 1,
                    unit: "",
                    today: 0,
                    manhours_unit: "",
                    manhours_prev: 0,
                    manhours_working_hours: 0,
                    manhours_overtime_hours: 0,
                    manhours_daily_total: 0,
                    manhours_cum: 0,
                    remarks: "",
                },
            ],
            direct_personels: [
                {
                    personel_name: "",
                    direction_id: 2,
                    unit: "",
                    today: 0,
                    manhours_unit: "",
                    manhours_prev: 0,
                    manhours_working_hours: 0,
                    manhours_overtime_hours: 0,
                    manhours_daily_total: 0,
                    manhours_cum: 0,
                    remarks: "",
                },
            ],
        });

    const countPersonelManhoursDailyTotal = (personel_data, index) => {
        let manhours_working_hours =
            personel_data[index]["manhours_working_hours"];
        let manhours_overtime_hours =
            personel_data[index]["manhours_overtime_hours"];

        let manhours_daily_total = 0;

        manhours_daily_total = manhours_working_hours + manhours_overtime_hours;

        return manhours_daily_total;
    };

    const countPersonelManhoursCum = (personel_data, index) => {
        let today = personel_data[index]["today"];
        let manhours_prev = personel_data[index]["manhours_prev"];
        let manhours_daily_total = personel_data[index]["manhours_daily_total"];

        let manhours_cum = 0;

        // if (today && manhours_prev && manhours_daily_total) {
        manhours_cum = today * manhours_daily_total + manhours_prev;
        // }

        return manhours_cum;
    };

    const handleOnChangeIndirect = (event, index) => {
        clearErrors("indirect_personels." + index + `.${event.target.name}`);

        let indirectPersonelsData = [...data.indirect_personels];
        indirectPersonelsData[index][event.target.name] =
            event.target.type === "number" && event.target.value
                ? parseInt(event.target.value)
                : event.target.value;
        indirectPersonelsData[index]["manhours_daily_total"] =
            countPersonelManhoursDailyTotal(indirectPersonelsData, index);
        indirectPersonelsData[index]["manhours_cum"] = countPersonelManhoursCum(
            indirectPersonelsData,
            index
        );
        setData("indirect_personels", indirectPersonelsData);
    };

    const handleOnChangeDirect = (event, index) => {
        clearErrors("direct_personels." + index + `.${event.target.name}`);

        let directPersonelsData = [...data.direct_personels];
        directPersonelsData[index][event.target.name] =
            event.target.type === "number" && event.target.value
                ? parseInt(event.target.value)
                : event.target.value;
        directPersonelsData[index]["manhours_daily_total"] =
            countPersonelManhoursDailyTotal(directPersonelsData, index);
        directPersonelsData[index]["manhours_cum"] = countPersonelManhoursCum(
            directPersonelsData,
            index
        );
        setData("direct_personels", directPersonelsData);
    };

    const addIndirectPersonel = () => {
        let object = {
            personel_name: "",
            direction_id: 1,
            unit: "",
            today: 0,
            manhours_unit: "",
            manhours_prev: 0,
            manhours_working_hours: 0,
            manhours_overtime_hours: 0,
            manhours_daily_total: 0,
            manhours_cum: 0,
            remarks: "",
        };
        setData("indirect_personels", [...data.indirect_personels, object]);
    };

    const addDirectPersonel = () => {
        let object = {
            personel_name: "",
            direction_id: 2,
            unit: "",
            today: 0,
            manhours_unit: "",
            manhours_prev: 0,
            manhours_working_hours: 0,
            manhours_overtime_hours: 0,
            manhours_daily_total: 0,
            manhours_cum: 0,
            remarks: "",
        };
        setData("direct_personels", [...data.direct_personels, object]);
    };

    const removeIndirectPersonel = (index) => {
        let indiredctPersonelsData = [...data.indirect_personels];
        indiredctPersonelsData.splice(index, 1);
        setData("indirect_personels", indiredctPersonelsData);
        clearPersonelErrors(index, "indirect_personels");
    };

    const removeDirectPersonel = (index) => {
        let directPersonelsData = [...data.direct_personels];
        directPersonelsData.splice(index, 1);
        setData("direct_personels", directPersonelsData);

        clearPersonelErrors(index, "direct_personels");
    };

    const clearPersonelErrors = (index, direction) => {
        clearErrors(`${direction}.` + index + ".personel_name");
        clearErrors(`${direction}.` + index + ".unit");
        clearErrors(`${direction}.` + index + ".today");
        clearErrors(`${direction}.` + index + ".manhours_unit");
        clearErrors(`${direction}.` + index + ".manhours_prev");
        clearErrors(`${direction}.` + index + ".manhours_working_hours");
        clearErrors(`${direction}.` + index + ".manhours_overtime_hours");
        clearErrors(`${direction}.` + index + ".manhours_daily_total");
        clearErrors(`${direction}.` + index + ".manhours_cum");
        clearErrors(`${direction}.` + index + ".remarks");
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("daily-reports.personels.store", dailyReport), {
            onSuccess: () => setCreatePersonel(false),
        });
    };

    return (
        <div className="relative overflow-x-auto border border-gray-900 dark:border-gray-300">
            <form onSubmit={submit}>
                <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                    <thead className="h-14 bg-gray-300 text-xs text-gray-700 uppercase border-b border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
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
                                className="p-1 align-middle text-right"
                                scope="colgroup"
                                colSpan="2"
                            >
                                <PrimaryButton
                                    type="submit"
                                    className="!px-2 !py-1"
                                    disabled={
                                        processing ||
                                        (!data.indirect_personels.length &&
                                            !data.direct_personels.length)
                                    }
                                >
                                    <FaSave className="h-3 w-3 mr-1" />
                                    Simpan
                                </PrimaryButton>
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
                                className="w-20 px-2 py-1 align-middle border-r border-b border-gray-900 dark:border-gray-300"
                                scope="colgroup"
                                colSpan="2"
                            >
                                Today
                            </th>
                            <th
                                className="w-14 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
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
                            <th
                                className="px-2 py-1 align-middle"
                                rowSpan="2"
                                colSpan="2"
                                scope="col"
                            >
                                Remarks
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
                    <tbody className="font-bold">
                        {/* Indirect Start */}

                        <tr className="border-b border-gray-900 hover:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-600">
                            <th
                                className="border-r border-gray-900 dark:border-gray-300"
                                scope="row"
                            >
                                A
                            </th>
                            <td colSpan="10" className="px-1 text-left">
                                Indirect
                            </td>
                            <td className="p-1">
                                {!data.indirect_personels.length > 0 && (
                                    <div className="flex justify-end">
                                        <FaPlusCircle
                                            className="hover:cursor-pointer fill-gray-800 dark:fill-primary-800"
                                            onClick={addIndirectPersonel}
                                        />
                                    </div>
                                )}
                            </td>
                        </tr>
                        {data.indirect_personels.length > 0 &&
                            data.indirect_personels.map(
                                (personel_data, index) => (
                                    <tr
                                        key={index}
                                        className="text-center font-bold align-top border-b border-gray-900 hover:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <td className="border-r border-gray-900 dark:border-gray-300">
                                            {index + 1}
                                        </td>
                                        <td className="px-1 text-left border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="personel_name"
                                                name="personel_name"
                                                value={
                                                    personel_data.personel_name
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeIndirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".personel_name"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="unit"
                                                name="unit"
                                                value={personel_data.unit}
                                                onChange={(e) =>
                                                    handleOnChangeIndirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".unit"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="today"
                                                name="today"
                                                type="number"
                                                value={personel_data.today}
                                                onChange={(e) =>
                                                    handleOnChangeIndirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".today"
                                                    ]
                                                }
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_unit"
                                                name="manhours_unit"
                                                value={
                                                    personel_data.manhours_unit
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeIndirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".manhours_unit"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_prev"
                                                name="manhours_prev"
                                                type="number"
                                                value={
                                                    personel_data.manhours_prev
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeIndirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".manhours_prev"
                                                    ]
                                                }
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_working_hours"
                                                name="manhours_working_hours"
                                                type="number"
                                                value={
                                                    personel_data.manhours_working_hours
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeIndirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".manhours_working_hours"
                                                    ]
                                                }
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_overtime_hours"
                                                name="manhours_overtime_hours"
                                                type="number"
                                                value={
                                                    personel_data.manhours_overtime_hours
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeIndirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".manhours_overtime_hours"
                                                    ]
                                                }
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_daily_total"
                                                name="manhours_daily_total"
                                                value={
                                                    personel_data.manhours_daily_total
                                                }
                                                readOnly
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".manhours_daily_total"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_cum"
                                                name="manhours_cum"
                                                value={
                                                    personel_data.manhours_cum
                                                }
                                                readOnly
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".manhours_cum"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="remarks"
                                                name="remarks"
                                                value={personel_data.remarks}
                                                onChange={(e) =>
                                                    handleOnChangeIndirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "indirect_personels." +
                                                            index +
                                                            ".remarks"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 align-middle">
                                            <div className="flex flex-row justify-end gap-1">
                                                {data.indirect_personels
                                                    .length ==
                                                    index + 1 && (
                                                    <FaPlusCircle
                                                        className="hover:cursor-pointer fill-gray-800 dark:fill-primary-800"
                                                        onClick={
                                                            addIndirectPersonel
                                                        }
                                                    />
                                                )}
                                                <FaTrash
                                                    className="hover:cursor-pointer fill-red-600 dark:fill-red-500"
                                                    onClick={() =>
                                                        removeIndirectPersonel(
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}

                        {/* Indirect End */}

                        <tr className="border-y border-gray-900 hover:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-600">
                            <td className="py-2" colSpan="11"></td>
                        </tr>

                        {/* Direct Start */}
                        <tr className="border-b border-gray-900 hover:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-600">
                            <th
                                className="border-r border-gray-900 dark:border-gray-300"
                                scope="row"
                            >
                                B
                            </th>
                            <td colSpan="10" className="px-1 text-left">
                                Direct
                            </td>
                            <td className="p-1">
                                {!data.direct_personels.length > 0 && (
                                    <div className="flex justify-end">
                                        <FaPlusCircle
                                            className="hover:cursor-pointer fill-gray-800 dark:fill-primary-800"
                                            onClick={addDirectPersonel}
                                        />
                                    </div>
                                )}
                            </td>
                        </tr>

                        {data.direct_personels.length > 0 &&
                            data.direct_personels.map(
                                (personel_data, index) => (
                                    <tr
                                        key={index}
                                        className="text-center font-bold align-top border-b border-gray-900 hover:bg-gray-300 dark:border-gray-300 dark:hover:bg-gray-600"
                                    >
                                        <td className="border-r border-gray-900 dark:border-gray-300">
                                            {index + 1}
                                        </td>
                                        <td className="px-1 text-left border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="personel_name"
                                                name="personel_name"
                                                value={
                                                    personel_data.personel_name
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeDirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".personel_name"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="unit"
                                                name="unit"
                                                value={personel_data.unit}
                                                onChange={(e) =>
                                                    handleOnChangeDirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".unit"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="today"
                                                name="today"
                                                type="number"
                                                value={personel_data.today}
                                                onChange={(e) =>
                                                    handleOnChangeDirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".today"
                                                    ]
                                                }
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_unit"
                                                name="manhours_unit"
                                                value={
                                                    personel_data.manhours_unit
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeDirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".manhours_unit"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_prev"
                                                name="manhours_prev"
                                                type="number"
                                                value={
                                                    personel_data.manhours_prev
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeDirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".manhours_prev"
                                                    ]
                                                }
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_working_hours"
                                                name="manhours_working_hours"
                                                type="number"
                                                value={
                                                    personel_data.manhours_working_hours
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeDirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".manhours_working_hours"
                                                    ]
                                                }
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_overtime_hours"
                                                name="manhours_overtime_hours"
                                                type="number"
                                                value={
                                                    personel_data.manhours_overtime_hours
                                                }
                                                onChange={(e) =>
                                                    handleOnChangeDirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".manhours_overtime_hours"
                                                    ]
                                                }
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_daily_total"
                                                name="manhours_daily_total"
                                                value={
                                                    personel_data.manhours_daily_total
                                                }
                                                readOnly
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".manhours_daily_total"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="manhours_cum"
                                                name="manhours_cum"
                                                value={
                                                    personel_data.manhours_cum
                                                }
                                                readOnly
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".manhours_cum"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="remarks"
                                                name="remarks"
                                                value={personel_data.remarks}
                                                onChange={(e) =>
                                                    handleOnChangeDirect(
                                                        e,
                                                        index
                                                    )
                                                }
                                                isInvalid={
                                                    errors[
                                                        "direct_personels." +
                                                            index +
                                                            ".remarks"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 align-middle">
                                            <div className="flex flex-row justify-end gap-1">
                                                {data.direct_personels.length ==
                                                    index + 1 && (
                                                    <FaPlusCircle
                                                        className="hover:cursor-pointer fill-gray-800 dark:fill-primary-800"
                                                        onClick={
                                                            addDirectPersonel
                                                        }
                                                    />
                                                )}
                                                <FaTrash
                                                    className="hover:cursor-pointer fill-red-600 dark:fill-red-500"
                                                    onClick={() =>
                                                        removeDirectPersonel(
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                        {/* Direct End */}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

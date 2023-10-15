import PrimaryButton from "@/Components/PrimaryButton";
import TableTextInput from "@/Components/TableTextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import { FaPlusCircle, FaSave, FaTimesCircle, FaTrash } from "react-icons/fa";

export default (props) => {
    const {dailyReportId, setCreateHSE} = props
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            hse_statistics: [
                {
                    description: "",
                    unit: "",
                    total: "",
                },
            ],
        });

    const add = () => {
        let object = {
            description: "",
            unit: "",
            total: "",
        };
        setData("hse_statistics", [...data.hse_statistics, object]);
    };

    const remove = (index) => {
        let hseStatisticsData = [...data.hse_statistics];
        hseStatisticsData.splice(index, 1);
        setData("hse_statistics", hseStatisticsData);
        clearAllErrors(index);
    };

    const clearAllErrors = (index) => {
        clearErrors("hse_statistics." + index + ".description");
        clearErrors("hse_statistics." + index + ".unit");
        clearErrors("hse_statistics." + index + ".total");
    };

    const handleOnChange = (event, index) => {
        // clearErrors("hse_statistics." + index + `.${event.target.name}`);

        let hseStatisticsData = [...data.hse_statistics];
        hseStatisticsData[index][event.target.name] = event.target.value;
        setData("hse_statistics", hseStatisticsData);

    };

    const submit = (e) => {
        e.preventDefault();

        post(route("daily-reports.hse-statistics.store", dailyReportId), {
            onSuccess: () => setCreateHSE(false)
        });
    };

    return (
        <div className="relative overflow-x-auto">
            <form onSubmit={submit}>
                <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                    <thead className="h-14 bg-gray-300 text-xs text-gray-700 uppercase border border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
                        <tr>
                            <th
                                className="py-1 text-center align-middle border-b border-gray-900 dark:border-gray-300"
                                colSpan="4"
                                scope="colgroup"
                            >
                                <div className="flex items-center">
                                    <span className="grow text-right">
                                        HSE Statistics
                                    </span>
                                    <div className="grow text-right">
                                        <PrimaryButton
                                            type="submit"
                                            className="!px-2 !py-1"
                                            disabled={
                                                processing ||
                                                data.hse_statistics.length == 0
                                            }
                                        >
                                            <FaSave className="h-3 w-3 mr-1" />
                                            Simpan
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </th>
                        </tr>

                        <tr>
                            <th
                                className="w-56 px-2 py-1 text-center align-middle border-r border-gray-900 dark:border-gray-300"
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
                                className="px-2 py-1 text-center align-middle border-r border-gray-900 dark:border-gray-300"
                                scope="col"
                            >
                                Total
                            </th>
                            <th
                                className="pt-1 text-center align-middle"
                                scope="col"
                            >
                                {!data.hse_statistics.length && (
                                    <div className="inline-block">
                                        <FaPlusCircle
                                            onClick={add}
                                            className="w-4 h-4 hover:cursor-pointer fill-gray-800 dark:fill-primary-800"
                                        />
                                    </div>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-top border-x border-gray-900 dark:border-gray-300">
                        {data.hse_statistics.length > 0 &&
                            data.hse_statistics.map((hseStatistic, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="font-bold border-b border-gray-900 dark:border-gray-300"
                                    >
                                        <td className="border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="description"
                                                name="description"
                                                value={
                                                    hseStatistic.description
                                                }
                                                autoComplete="description"
                                                onChange={(e) =>
                                                    handleOnChange(e, index)
                                                }
                                                isInvalid={
                                                    errors[
                                                        "hse_statistics." +
                                                            index +
                                                            ".description"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="unit"
                                                name="unit"
                                                value={hseStatistic.unit}
                                                autoComplete="unit"
                                                onChange={(e) =>
                                                    handleOnChange(e, index)
                                                }
                                                isInvalid={
                                                    errors[
                                                        "hse_statistics." +
                                                            index +
                                                            ".unit"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="border-r border-gray-900 dark:border-gray-300">
                                            <TableTextInput
                                                id="total"
                                                name="total"
                                                type="number"
                                                value={hseStatistic.total}
                                                onChange={(e) =>
                                                    handleOnChange(e, index)
                                                }
                                                isInvalid={
                                                    errors[
                                                        "hse_statistics." +
                                                            index +
                                                            ".total"
                                                    ]
                                                }
                                                placeholder="..."
                                                // required
                                            />
                                        </td>
                                        <td className="px-1 align-middle">
                                            <div className="flex flex-row justify-end gap-1">
                                                {data.hse_statistics.length ==
                                                    index + 1 && (
                                                    <FaPlusCircle
                                                        onClick={add}
                                                        className="hover:cursor-pointer fill-gray-800 dark:fill-primary-800"
                                                    />
                                                )}
                                                <FaTrash
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    className="hover:cursor-pointer fill-red-600 dark:fill-red-500"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </form>
        </div>
    );
};

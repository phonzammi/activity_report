import PrimaryButton from "@/Components/PrimaryButton";
import TableTextInput from "@/Components/TableTextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import { FaPlusCircle, FaSave, FaTrash } from "react-icons/fa";

export default (props) => {
    const { dailyReportId, setCreateEquipment } = props;
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            equipment: [
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
        setData("equipment", [...data.equipment, object]);
    };

    const remove = (index) => {
        let equipmentData = [...data.equipment];
        equipmentData.splice(index, 1);
        setData("equipment", equipmentData);
        clearAllErrors(index);
    };

    const clearAllErrors = (index) => {
        clearErrors("equipment." + index + ".description");
        clearErrors("equipment." + index + ".unit");
        clearErrors("equipment." + index + ".total");
    };

    const handleOnChange = (event, index) => {
        clearErrors("equipment." + index + `.${event.target.name}`);

        let equipmentData = [...data.equipment];
        equipmentData[index][event.target.name] = event.target.value;
        setData("equipment", equipmentData);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("daily-reports.equipment.store", dailyReportId), {
            onSuccess: () => setCreateEquipment(false),
        });
    };

    return (
        <div className="relative overflow-x-auto">
            <form onSubmit={submit}>
                <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                    <thead className="h-14 bg-gray-300 text-xs text-gray-700 uppercase border border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
                        <tr>
                            <th
                                className="w-64 px-2 text-center align-middle border-r border-gray-900 dark:border-gray-300"
                                scope="col"
                            >
                                Equipment & Tools
                            </th>
                            <th
                                className="w-20 px-2 text-center align-middle border-r border-gray-900 dark:border-gray-300"
                                scope="col"
                            >
                                Unit
                            </th>
                            <th
                                className="pl-2 pr-1 text-center align-middle border-gray-900 dark:border-gray-300"
                                scope="col"
                                colSpan="2"
                            >
                                <div className="flex items-center">
                                    <span className="grow">
                                        Total
                                    </span>
                                    <div className="grow">
                                        {data.equipment.length > 0 ? (
                                            <PrimaryButton
                                                type="submit"
                                                className="!px-2 !py-1"
                                                disabled={
                                                    processing ||
                                                    !data.equipment.length
                                                }
                                            >
                                                <FaSave className="h-3 w-3 mr-1" />
                                                Simpan
                                            </PrimaryButton>
                                        ) : (
                                                <FaPlusCircle
                                                    onClick={add}
                                                    className="w-4 h-4 hover:cursor-pointer fill-gray-800 dark:fill-primary-800"
                                                />
                                        )}
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-top border-x border-gray-900 dark:border-gray-300">
                        {data.equipment.length > 0 &&
                            data.equipment.map((equipment, index) => {
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
                                                    equipment.description
                                                }
                                                autoComplete="description"
                                                onChange={(e) =>
                                                    handleOnChange(e, index)
                                                }
                                                isInvalid={
                                                    errors[
                                                        "equipment." +
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
                                                value={equipment.unit}
                                                autoComplete="unit"
                                                onChange={(e) =>
                                                    handleOnChange(e, index)
                                                }
                                                isInvalid={
                                                    errors[
                                                        "equipment." +
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
                                                value={equipment.total}
                                                onChange={(e) =>
                                                    handleOnChange(e, index)
                                                }
                                                isInvalid={
                                                    errors[
                                                        "equipment." +
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
                                                {data.equipment.length ==
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

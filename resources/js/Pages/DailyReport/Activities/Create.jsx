import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TableTextInput from "@/Components/TableTextInput";
import { useForm } from "@inertiajs/react";
import React from "react";
import Dropzone from "react-dropzone";
import { FaCloudUploadAlt, FaSave, FaTrash } from "react-icons/fa";

export default (props) => {
    const { dailyReportId, setCreateActivity } = props;

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            description: "",
            qty1: "",
            qty2: "",
            qty3: "",
            volume: "",
            unit: "",
            documentations: [],
        });

    const handleOnChange = (event) => {
        clearErrors(event.target.name);

        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const handleOnDocumentationChange = (acceptedFiles) => {
        clearErrors("documentations");
        let documentationData = [...data.documentations];

        if (acceptedFiles?.length) {
            documentationData.push(
                ...acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            );
        }

        setData("documentations", documentationData);
    };

    const removeDocumentation = (index) => {
        let documentationData = [...data.documentations];
        documentationData.splice(index, 1);
        setData("documentations", documentationData);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("daily-reports.activities.store", dailyReportId), {
            onSuccess: () => setCreateActivity(false),
        });
    };

    return (
        <div className="relative overflow-x-auto border border-gray-900 dark:border-gray-300">
            <form onSubmit={submit}>
                <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-300 text-xs text-gray-700 uppercase border-b border-gray-900 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-300">
                        <tr>
                            <th
                                className="w-52 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
                                scope="col"
                            >
                                Today activities
                            </th>
                            <th
                                className="min-w-32 px-2 py-1 align-middle border-r border-gray-900 dark:border-gray-300"
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
                                className="w-96 px-1 py-1 align-middle"
                                scope="col"
                            >
                                <div className="flex items-center">
                                    <span className="grow text-right">
                                        Documentation
                                    </span>
                                    <div className="grow text-right">
                                        <PrimaryButton
                                            type="submit"
                                            className="!px-2 !py-1"
                                            disabled={processing}
                                        >
                                            <FaSave className="h-3 w-3 mr-1" />
                                            Simpan
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-top font-bold">
                        <tr className="whitespace-nowrap border-b border-gray-900 dark:border-gray-300">
                            <td className="border-r border-gray-900 dark:border-gray-300">
                                <TableTextInput
                                    id="description"
                                    name="description"
                                    value={data.description}
                                    autoComplete="description"
                                    onChange={handleOnChange}
                                    isInvalid={errors.description}
                                    placeholder="Today activity ..."
                                    // required
                                />
                            </td>
                            <td className="min-w-16 border-r border-gray-900 dark:border-gray-300">
                                <TableTextInput
                                    id="qty1"
                                    name="qty1"
                                    value={data.qty1}
                                    autoComplete="qty1"
                                    onChange={handleOnChange}
                                    isInvalid={errors.qty1}
                                    placeholder="..."
                                    // required
                                />
                            </td>
                            <td className="min-w-16 border-r border-gray-900 dark:border-gray-300">
                                <TableTextInput
                                    id="qty2"
                                    name="qty2"
                                    value={data.qty2}
                                    autoComplete="qty2"
                                    onChange={handleOnChange}
                                    isInvalid={errors.qty2}
                                    placeholder="..."
                                    // required
                                />
                            </td>
                            <td className="min-w-16 border-r border-gray-900 dark:border-gray-300">
                                <TableTextInput
                                    id="qty3"
                                    name="qty3"
                                    value={data.qty3}
                                    autoComplete="qty3"
                                    onChange={handleOnChange}
                                    isInvalid={errors.qty3}
                                    placeholder="..."
                                    // required
                                />
                            </td>
                            <td className="border-r border-gray-900 dark:border-gray-300">
                                <TableTextInput
                                    id="volume"
                                    name="volume"
                                    value={data.volume}
                                    autoComplete="volume"
                                    onChange={handleOnChange}
                                    isInvalid={errors.volume}
                                    placeholder="..."
                                    // required
                                />
                            </td>
                            <td className="border-r border-gray-900 dark:border-gray-300">
                                <TableTextInput
                                    id="unit"
                                    name="unit"
                                    value={data.unit}
                                    autoComplete="unit"
                                    onChange={handleOnChange}
                                    isInvalid={errors.unit}
                                    placeholder="..."
                                    // required
                                />
                            </td>
                            <td className="p-1">
                                {data.documentations.length > 0 && (
                                    <div
                                        className={`grid grid-cols-1 gap-2 mb-2 ${
                                            data.documentations.length >= 2 &&
                                            "md:grid-cols-2"
                                        }`}
                                    >
                                        {data.documentations.map(
                                            (documentation, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col-auto relative"
                                                    >
                                                        <img
                                                            className={`mx-auto shadow-2 shadow-gray-600 rounded-md ${
                                                                data
                                                                    .documentations
                                                                    .length > 1
                                                                    ? "min-w-full"
                                                                    : "md:w-1/2"
                                                            }`}
                                                            src={
                                                                documentation.preview
                                                            }
                                                            alt={
                                                                documentation.name
                                                            }
                                                        />
                                                        <button
                                                            type="button"
                                                            className="w-7 h-7 text-white border border-gray-400 bg-red-600 rounded-full flex justify-center items-center absolute top-1.5 right-1.5 hover:bg-red-400 transition-colors"
                                                            onClick={() =>
                                                                removeDocumentation(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            <FaTrash className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                )}

                                <Dropzone
                                    onDrop={(acceptedFiles) =>
                                        handleOnDocumentationChange(
                                            acceptedFiles
                                        )
                                    }
                                    noClick={true}
                                    accept={{ "image/*": [] }}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <div className="flex w-full items-center justify-center">
                                            <label
                                                {...getRootProps({
                                                    className:
                                                        "inline-flex justify-center items-center px-2 py-1 bg-green-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase cursor-pointer tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150",
                                                })}
                                            >
                                                <FaCloudUploadAlt className="w-3 h-3 fill-current mr-1" />
                                                <span className="">
                                                    Pilih File
                                                </span>
                                                <input {...getInputProps()} />
                                            </label>
                                        </div>
                                    )}
                                </Dropzone>
                                <InputError
                                    className="mt-1 text-xs"
                                    message={errors.documentations}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

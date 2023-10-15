import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TableTextInput from "@/Components/TableTextInput";
import { router, useForm } from "@inertiajs/react";
import React from "react";
import Dropzone from "react-dropzone";
import { FaCloudUploadAlt, FaSave, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

export default (props) => {
    const { activity, setEditActivity } = props;

    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            description: activity?.description || "",
            qty1: activity?.qty1 || "",
            qty2: activity?.qty2 || "",
            qty3: activity?.qty3 || "",
            volume: activity?.volume || "",
            unit: activity?.unit || "",
            documentations: [],
            uploadedDocumentations: [...activity.documentations],

            _method: "PUT",
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

    const removeDocumentationActivity = (index) => {
        let documentationData = [...data.uploadedDocumentations];
        // console.log(activity)
        documentationData.splice(index, 1);
        setData("uploadedDocumentations", documentationData);
    };

    const removeUploadedDocumentation = (documentation, index) => {
        // removeDocumentationActivity(index)
        Swal.fire({
            title: "Anda yakin ingin Menghapus Documentation ini?",
            footer: '<span class="text-red-500">Documentation ini juga akan terhapus dari Database & Server !</span>',
            showCancelButton: true,
            confirmButtonText: "Hapus",
            confirmButtonColor: "#b91c1c",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("daily-reports.activities.documentations.delete", [
                        activity.dailyReportId,
                        activity.id,
                        documentation,
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
                        onSuccess: () => removeDocumentationActivity(index),
                        onFinish: () => Swal.close(),
                    }
                );
            } else if (result.isDismissed) {
                Swal.fire("Hapus dibatalkan", "", "info");
            }
        });
    };

    const submit = (e) => {
        e.preventDefault();

        post(
            route("daily-reports.activities.update", [
                activity.dailyReportId,
                activity.id,
            ]),
            {
                onSuccess: () => setEditActivity(false),
            }
        );
    };

    return (
        <tbody className="text-center align-top font-bold">
            <tr className="whitespace-nowrap border-b border-gray-900 dark:border-gray-300">
                <td className="border-r border-gray-900 dark:border-gray-300"></td>
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
                    <div
                        className={`grid gap-2 m-1 ${
                            data.uploadedDocumentations.length > 1 ||
                            data.documentations.length > 1
                                ? "md:grid-cols-2"
                                : "md:grid-cols-1"
                        }`}
                    >
                        {data.uploadedDocumentations.length > 0 &&
                            data.uploadedDocumentations.map(
                                (documentation, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="col-auto relative"
                                        >
                                            <img
                                                className={`mx-auto shadow-2 shadow-gray-600 rounded-md ${
                                                    data.uploadedDocumentations
                                                        .length > 1
                                                        ? "min-w-full"
                                                        : "md:w-1/2"
                                                }`}
                                                src={documentation.document_image_url}
                                                alt={documentation.title}
                                            />
                                            <button
                                                type="button"
                                                className="w-7 h-7 text-white border border-gray-400 bg-red-600 rounded-full flex justify-center items-center absolute top-1.5 right-1.5 hover:bg-red-400 transition-colors"
                                                onClick={() =>
                                                    removeUploadedDocumentation(
                                                        documentation,
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
                        {data.documentations.map((documentation, index) => {
                            return (
                                <div key={index} className="col-auto relative">
                                    <img
                                        className={`mx-auto shadow-2 shadow-gray-600 rounded-md ${
                                            data.documentations.length > 1
                                                ? "min-w-full"
                                                : "md:w-1/2"
                                        }`}
                                        src={documentation.preview}
                                        alt={documentation.name}
                                    />
                                    <button
                                        type="button"
                                        className="w-7 h-7 text-white border border-gray-400 bg-red-600 rounded-full flex justify-center items-center absolute top-1.5 right-1.5 hover:bg-red-400 transition-colors"
                                        onClick={() =>
                                            removeDocumentation(index)
                                        }
                                    >
                                        <FaTrash className="h-3 w-3" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-center gap-1">
                        <Dropzone
                            onDrop={(acceptedFiles) =>
                                handleOnDocumentationChange(acceptedFiles)
                            }
                            noClick={true}
                            accept={{ "image/*": [] }}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div className="flex items-center justify-center">
                                    <label
                                        {...getRootProps({
                                            className:
                                                "inline-flex justify-center items-center px-2 py-1 bg-green-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase cursor-pointer tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150",
                                        })}
                                    >
                                        <FaCloudUploadAlt className="w-3 h-3 fill-current mr-1" />
                                        <span className="">Pilih File</span>
                                        <input {...getInputProps()} />
                                    </label>
                                </div>
                            )}
                        </Dropzone>
                        <PrimaryButton
                            type="submit"
                            className="!px-2 !py-1"
                            disabled={processing}
                            onClick={(e) => submit(e)}
                        >
                            <FaSave className="h-3 w-3 mr-1" />
                            Simpan
                        </PrimaryButton>
                    </div>

                    <InputError
                        className="mt-1 text-xs"
                        message={errors.documentations}
                    />
                </td>
            </tr>
        </tbody>
    );
};

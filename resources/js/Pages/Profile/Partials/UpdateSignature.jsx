import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Transition } from "@headlessui/react";
import { router, useForm, usePage } from "@inertiajs/react";
import dataURLtoBlob from "blueimp-canvas-to-blob";
import { useRef, useState } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

const UpdateSignature = ({ className }) => {
    const user = usePage().props.auth.user;

    const {
        data,
        setData,
        reset,
        post,
        errors,
        clearErrors,
        processing,
        recentlySuccessful,
    } = useForm({
        signature: null,

        _method: "PATCH",
    });

    const [signaturePreview, setSignaturePreview] = useState(null);
    const signatureDraw = useRef(null);
    const signatureInput = useRef(null);

    const [disableClear, setDisableClear] = useState(true);

    const selectNewSignature = (event) => {
        event.preventDefault();
        signatureInput.current.click();
    };

    const updateSignaturePreview = () => {
        setDisableClear(false);
        const signature = signatureInput.current.files[0];

        if (!signature) {
            return;
        }

        setData("signature", signatureInput.current.files[0]);

        const reader = new FileReader();

        reader.onload = (e) => {
            setSignaturePreview(e.target.result);
        };

        reader.readAsDataURL(signature);
    };

    const clearSignatureFileInput = () => {
        if (signatureInput.current?.value) {
            signatureInput.current.value = null;
            setSignaturePreview(null);
        }
    };

    const clearSignatureDraw = () => {
        if (signatureDraw.current && !signatureDraw.current.isEmpty()) {
            signatureDraw.current.clear();
        }
    };

    const clearSignature = (e) => {
        e.preventDefault();
        clearSignatureFileInput();
        clearSignatureDraw();
        reset();
        setDisableClear(true);
    };

    const updateSignatureDrawing = () => {
        const base64String = signatureDraw.current.toDataURL("image/png");
        const signatureBlob = dataURLtoBlob(base64String);

        const signaturePng = new File([signatureBlob], "hand-signature.png", {
            type: "image/png",
        });

        setData("signature", signaturePng);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update-signature-photo"), {
            preserveScroll: true,
            onSuccess: () => {
                clearSignature(e);
                // router.reload();
            },
        });
    };

    const deleteSignature = (e) => {
        e.preventDefault();
        router.delete(route("profile.destroy-signature-photo"), {
            preserveScroll: true,
            // onSuccess: () => {
            //     router.reload()
            // },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Hand Signature ( Tanda Tangan )
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {user.signaturePhotoPath
                        ? "Remove & Draw / Upload a new signature"
                        : "You don't have any signature yet. Draw / Upload a new signature."}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        className="mb-1"
                        htmlFor="signature"
                        value={
                            signaturePreview || user.signaturePhotoPath
                                ? "Uploaded Signature"
                                : "Draw Hand Signature"
                        }
                    />

                    <input
                        id="signature"
                        ref={signatureInput}
                        type="file"
                        accept="image/png"
                        className="hidden"
                        onChange={updateSignaturePreview}
                    />

                    {user.signaturePhotoPath ? (
                        <img
                            src={user.signaturePhotoUrl}
                            alt="hand signature"
                            className={`rounded-xl object-contain w-[500px] h-[200px]`}
                        />
                    ) : !signaturePreview ? (
                        <ReactSignatureCanvas
                            ref={signatureDraw}
                            onBegin={() => setDisableClear(false)}
                            onEnd={updateSignatureDrawing}
                            clearOnResize={false}
                            penColor="black"
                            canvasProps={{
                                className:
                                    "sigCanvas w-[500px] h-[200px] border-2 border-black",
                            }}
                        />
                    ) : (
                        <img
                            src={signaturePreview}
                            alt="hand signature"
                            className={`rounded-xl object-contain w-[500px] h-[200px]`}
                        />
                    )}

                    <InputError className="mt-2" message={errors.signature} />
                </div>
                <div className="flex items-center gap-4">
                    {user.signaturePhotoPath ? (
                        <DangerButton onClick={deleteSignature}>
                            Remove Signature
                        </DangerButton>
                    ) : (
                        <>
                            <PrimaryButton type="submit" disabled={processing}>
                                Save
                            </PrimaryButton>
                            <SecondaryButton
                                disabled={processing}
                                onClick={selectNewSignature}
                            >
                                Upload Signature
                            </SecondaryButton>
                            <DangerButton
                                disabled={disableClear}
                                onClick={clearSignature}
                            >
                                Clear / Reset
                            </DangerButton>
                        </>
                    )}

                    {/* {user.profilePhotoPath && (
                        <DangerButton onClick={deletePhoto}>
                            Remove Photo
                        </DangerButton>
                    )} */}

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
};

export default UpdateSignature;

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import CreateCompanyInformationForm from "./Partials/CreateCompanyInformationForm";
import UpdateCompanyInformationForm from "./Partials/UpdateCompanyInformationForm";
import { Head } from "@inertiajs/react";

import React from "react";
import UpdateSignature from "./Partials/UpdateSignature";

const Edit = ({ auth, mustVerifyEmail, status }) => {
    return (
        <>
            <Head title="Profile" />

            <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-4 md:py-4 md:px-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateSignature className="max-w-xl" />
                    </div>
                    
                    {auth.user.can.createCompany && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <CreateCompanyInformationForm className="max-w-xl" />
                        </div>
                    )}

                    {auth.user.company && auth.user.company.can.update && (
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateCompanyInformationForm className="max-w-xl" />
                        </div>
                    )}

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
};

Edit.layout = (page) => <AuthenticatedLayout children={page} />;
export default Edit;

// export default function Edit({ auth, mustVerifyEmail, status }) {
//     return (
//         <AuthenticatedLayout
//             auth={auth}
//             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
//         >
//             <Head title="Profile" />

//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
//                     <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
//                         <UpdateProfileInformationForm
//                             mustVerifyEmail={mustVerifyEmail}
//                             status={status}
//                             className="max-w-xl"
//                         />
//                     </div>

//                     <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
//                         <UpdatePasswordForm className="max-w-xl" />
//                     </div>

//                     <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
//                         <DeleteUserForm className="max-w-xl" />
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

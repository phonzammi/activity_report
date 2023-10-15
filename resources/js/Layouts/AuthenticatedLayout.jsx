import React, { useEffect, useState } from "react";
import Sidebar from "@/Components/Sidebar";
import Header from "@/Components/Header";
import { ToastContainer, toast } from "react-toastify";
import { router, usePage } from "@inertiajs/react";

const AuthenticatedLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { flash, auth } = usePage().props;

    useEffect(() => {
        window.Echo.private(`App.Models.User.${auth.user.id}`).notification(
            () => {
                router.reload({
                    only: ["notifications"],
                });
                return toast.info("Ada Notifikasi Baru");
            }
        );
    }, []);

    useEffect(() => {
        return router.on("navigate", (event) => {
            return router.reload({
                only: ["notifications"],
            });
        });
    }, []);

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
            return router.reload({ only: ["flash"] });
        }
        if (flash.info) {
            toast.info(flash.info);
            return router.reload({ only: ["flash"] });
        }
        if (flash.error) {
            toast.error(flash.error);
            return router.reload({ only: ["flash"] });
        }
    }, [flash]);

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            <ToastContainer pauseOnFocusLoss={false} />
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {/* <!-- ===== Header Start ===== --> */}
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                    />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6">
                            {children}
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
    );
};

export default AuthenticatedLayout;

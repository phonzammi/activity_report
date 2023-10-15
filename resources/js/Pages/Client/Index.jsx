import PrimaryLink from "@/Components/PrimaryLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { FaChevronRight, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const Index = () => {
    const { clients, auth } = usePage().props;

    const {
        data,
        meta: { links, from, total },
    } = clients;

    router.on("navigate", (event) => {
        if (event.detail.page.component == "Client/Index") {
            return router.reload();
        }
    });

    const visit = (project) => {
        if (!auth.user.can.createClient) {
            return;
        }
        return router.visit(route("clients.edit", project));
    };

    const remove = (client) => {
        Swal.fire({
            title: "Anda yakin ingin Menghapus Client ini?",
            text: `${client.name}`,
            footer: '<span class="text-red-500">Seluruh Project, Daily Report, Weekly & Monthly Report dari Client ini juga akan terhapus !</span>',
            showCancelButton: true,
            confirmButtonText: "Hapus",
            confirmButtonColor: "#b91c1c",
            allowOutsideClick: false,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("clients.delete", client), {
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
                });
            } else if (result.isDismissed) {
                Swal.fire("Hapus dibatalkan", "", "info");
            }
        });
    };

    return (
        <>
            <Head title="Clients" />
            {/* Breadcrumb */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Clients
                </h2>

                <nav
                    className="flex xs:flex-row-reverse"
                    aria-label="Breadcrumb"
                >
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link
                                href={route("dashboard")}
                                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <FaChevronRight
                                    aria-hidden="true"
                                    className="text-gray-400"
                                    fill="currentColor"
                                />

                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                    Clients
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                {auth.user.can.createClient && (
                    <div className="flex flex-row items-center justify-end gap-4 p-2">
                        {/* <div className="w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaSearch
                                        aria-hidden="true"
                                        className="text-gray-400"
                                        fill="currentColor"
                                    />
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Search"
                                    required
                                />
                            </div>
                        </form>
                    </div> */}

                        <div>
                            <Link
                                href={route("clients.create")}
                                className="inline-flex justify-center items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150
                        dark:bg-primary-800
                        dark:hover:bg-primary-700
                        dark:focus:bg-primary-700
                        dark:active:bg-primary-900
                        dark:focus:ring-primary-500"
                            >
                                <FaPlus className="h-3 w-3 mr-1" />
                                Tambah
                            </Link>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-2 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Logo
                                </th>
                                <th scope="col" className="px-4 py-3">
                                    Projects Count
                                </th>
                                <th scope="col" className="px-2 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!data.length > 0 && (
                                <tr className="text-center font-bold border-b border-gray-800 dark:border-gray-300">
                                    <td
                                        colSpan="6"
                                        className="p-2 text-gray-100 bg-red-600 "
                                    >
                                        Belum Ada Client. Silahkan ditambah.
                                    </td>
                                </tr>
                            )}
                            {/* body content */}
                            {data.map((client, index) => (
                                <tr
                                    key={index}
                                    className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    <th scope="row" className="px-2 py-3">
                                        {from + index}
                                    </th>
                                    <td
                                        onClick={() => visit(client)}
                                        className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {client.name}
                                    </td>
                                    <td
                                        onClick={() => visit(client)}
                                        className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <img
                                            src={client.clientLogoUrl}
                                            className="w-32"
                                            alt="Client Logo"
                                        />
                                    </td>
                                    <td
                                        onClick={() => visit(client)}
                                        className="px-4 py-3"
                                    >
                                        {client.projectsCount > 0
                                            ? client.projectsCount
                                            : "Project Kosong"}
                                    </td>
                                    <td className="px-2 py-3 align-middle">
                                        {auth.user.can.createClient && (
                                            <FaTrash
                                                onClick={() => remove(client)}
                                                className="text-sm mx-auto text-red-500 hover:text-gray-800 focus:outline-none dark:text-red-400 dark:hover:text-gray-100"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav
                        className="px-2 py-1 flex items-center justify-between"
                        aria-label="Clients Pagination"
                    >
                        <span className="font-semibold">Total : {total}</span>
                        <ul className="inline-flex -space-x-px text-sm">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.url}
                                        as={
                                            !link.url || link.active
                                                ? "button"
                                                : "a"
                                        }
                                        disabled={!link.url || link.active}
                                        className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 dark:border-gray-600
                                        ${
                                            link.active &&
                                            "!leading-normal text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white"
                                        }
                                        ${
                                            link.url &&
                                            !link.active &&
                                            "bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                                        }
                                        ${
                                            !link.url &&
                                            !link.active &&
                                            "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                                        }
                                        ${index == 0 && "rounded-l-lg"}
                                        ${
                                            index == links.length - 1 &&
                                            "rounded-r-lg"
                                        } `}
                                        aria-current={link.active ? "page" : ""}
                                    >
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        ></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

Index.layout = (page) => <AuthenticatedLayout children={page} />;
export default Index;

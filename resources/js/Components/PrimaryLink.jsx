import { Link } from "@inertiajs/react";

export default function PrimaryLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 dark:bg-primary-800 dark:hover:bg-primary-700 dark:focus:bg-primary-700 dark:active:bg-primary-900 dark:focus:ring-primary-500 " +
                className
            }
        >
            {children}
        </Link>
    );
}

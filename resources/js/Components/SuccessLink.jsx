import { Link } from "@inertiajs/react";

export default function SuccessLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex justify-center items-center px-2 py-1 bg-green-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 " +
                className
            }
        >
            {children}
        </Link>
    );
}

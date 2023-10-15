import { Link } from "@inertiajs/react";

export default function SecondaryLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                "inline-flex justify-center items-center px-2 py-1 bg-amber-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 focus:bg-amber-700 active:bg-amber-900 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:ring-offset-2 transition ease-in-out duration-150 " +
                className
            }
        >
            {children}
        </Link>
    );
}

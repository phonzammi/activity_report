import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TableTextInput(
    { type = "text", className = "", isFocused = false, isInvalid, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                className={
                    `block w-full text-xs border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${
                        isInvalid &&
                        "bg-red-50 border-red-500 focus:border-red-500 focus:ring-red-500 text-red-900 placeholder-red-700"
                    }` + className
                }
                ref={input}
            />
            {isInvalid && (
                <p className={"text-xs text-red-600 dark:text-red-500 "}>
                    {isInvalid}
                </p>
            )}
        </div>
    );
});

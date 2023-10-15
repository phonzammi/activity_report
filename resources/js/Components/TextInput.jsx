import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, isInvalid = false, ...props }, ref) {
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
                    ` border border-gray-300 text-gray-900 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-indigo-500 dark:focus:border-indigo-500 ${
                        isInvalid &&
                        "!bg-red-50 !border-red-500 !focus:border-red-500 !focus:ring-red-500 !text-red-900 !placeholder-red-700"
                    } ` +
                    className
                }
                ref={input}
            />
        </div>
    );
});

import { useEffect, useState } from "react";

const useNotificationType = (initialValue) => {
    const [notification, setNotification] = useState(initialValue);

    const [notificationType, setNotificationType] = useState(null);

    useEffect(() => {
        if (notification) {
            let typeArr = notification.type.split("\\");
            setNotificationType(
                typeArr[typeArr.length - 1]
                    .match(/[A-Z][a-z]+|[0-9]+/g)
                    .join(" ")
            );
        }
    }, [notification]);

    return [notificationType, setNotificationType];
};

export default useNotificationType;

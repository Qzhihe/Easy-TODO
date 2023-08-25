import { useEffect } from "react";

function useDebounceEffect(fn, waitTime, deps) {
    useEffect(() => {
        const timer = setTimeout(fn, waitTime);

        return () => {
            clearTimeout(timer);
        };
    }, [fn, waitTime, deps]);
}

export default useDebounceEffect;

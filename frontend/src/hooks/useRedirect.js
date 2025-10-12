import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// /**
//  * Redirects the user to a given path after a delay or based on a condition.
//  * @param {string} path - The route to redirect to.
//  * @param {boolean} condition - (Optional) If true, the redirect will happen.
//  * @param {number} delay - (Optional) Delay before redirecting in ms.
//  */
const useRedirect = (path, condition = true, delay = 0) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!condition) return;

        const timer = setTimeout(() => {
            navigate(path);
        }, delay);

        return () => clearTimeout(timer);
    }, [navigate, path, condition, delay]);
};

export default useRedirect;

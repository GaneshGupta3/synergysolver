import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authSliceActions } from "../store/authSlice";
import { Navigate } from "react-router-dom";

const AuthInitializer = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.authProvider.isLoggedIn);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/check-auth`, {
                    withCredentials: true,
                });
                if (res.status === 200 && res.data) {
                    dispatch(authSliceActions.login(res.data));
                }
            } catch (err) {
                console.log("No valid session.");
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthInitializer;

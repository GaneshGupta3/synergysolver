import React, { useEffect } from "react";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { authSliceActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";
const Dashboard = () => {
    const dispatch = useDispatch();
    const checkUserSession = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/user/check-auth`,
                {
                    withCredentials: true,
                }
            );
            dispatch(authSliceActions.login(response.data));
        } catch (error) {
            console.log("User not logged in or invalid session.", error);
        }
    };

    useEffect(() => {
        checkUserSession();
    }, []);

    return (
        <div className={styles.mainBody}>
            <div className="bg-red-500">sidebar</div>
            <div className={`${styles.content} ${styles.problemDisplay}`}>
                main content(problem suggestions or problem display)
            </div>
            <div className={`${styles.content} ${styles.tagsDisplay}`}>
                tags
            </div>
        </div>
    );
};

export default Dashboard;

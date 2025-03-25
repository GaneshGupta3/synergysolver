import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../../store/authSlice";
import styles from "./ProfilePage.module.css";
import LogoutButton from "../Logout/LogoutButton";
import { Camera, User, Mail } from "lucide-react";
import { logoutAsync } from "../../store/authSlice";
import "../../index.css";
import avatar from "./avatar.png";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.authProvider);
    const { isUpdatingProfile } = useSelector((store) => store.profileProvider);
    const [selectedImg, setSelectedImg] = useState(null);

    const handleLogout = async () => {
        await dispatch(logoutAsync()); // Calls API & updates Redux state
        navigate("/login");
    };

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const response = await axios.get("https://synergysolver-backend.vercel.app/api/profile", {
                    withCredentials: true,
                });                
                if (response.status === 200) {
                    dispatch(authSliceActions.login(response.data.user));
                }
            } catch (error) {
                console.error("Session expired or unauthorized", error);
                dispatch(authSliceActions.logout());
                navigate("/login");
            }
        };

        checkUserSession();
    }, [dispatch, navigate]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    if (!user) {
        return <div className={styles.loader}>Loading...</div>; // Use loader class
    }

    return (
        <div className={styles.profileBody}>
            <h1 class="text-3xl font-bold underline">Hello, {user.username}!</h1>
            <div style={{ cursor: "pointer" }} onClick={handleLogout}>
                <LogoutButton />
            </div>
        </div>
    );
};

export default ProfilePage;

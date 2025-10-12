import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { logoutAsync } from "../../store/authSlice";
import LogoutButton from "../Logout/LogoutButton";
import styles from "./ProfilePage.module.css";
import { useUser } from "../../hooks/useUser";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useUser();

    const handleLogout = async () => {
        await dispatch(logoutAsync());
        navigate("/login");
    };

    return (
        <div className={styles.profileBody}>
            <h1 className="text-3xl font-bold underline">
                Hello, {user.username}!
            </h1>
            <div style={{ cursor: "pointer" }} onClick={handleLogout}>
                <LogoutButton />
            </div>
        </div>
    );
};

export default ProfilePage;

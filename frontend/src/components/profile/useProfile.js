import { useEffect, useState } from "react";
import axios from "axios";

export default function useProfile(userId, sliceUser) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (sliceUser._id === userId) {
                    setUser(sliceUser);
                } else {
                    const res = await axios.get(
                        `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`,
                        { withCredentials: true }
                    );
                    setUser(res.data);
                }
            } catch (err) {
                console.error("Profile fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, sliceUser]);

    return { user, setUser, loading };
}

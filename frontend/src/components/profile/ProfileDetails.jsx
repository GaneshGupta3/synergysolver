import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../../store/authSlice.js";
import useProfile from "./useProfile";

import ProfileHeader from "./ProfileHeader";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ProblemsTabs from "./ProblemsTabs";

export default function ProfileDetails() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: sliceUser } = useSelector((s) => s.authProvider);

    const { user, setUser, loading } = useProfile(userId, sliceUser);

    if (loading) return <div>Loading...</div>;

    const isOwner = user._id === sliceUser._id;

    return (
        <div className="min-h-screen bg-slate-800 pt-24 text-white">
            <ProfileHeader
                user={user}
                sliceUser={sliceUser}
                onLogout={() => dispatch(logoutAsync())}
            />

            <div className="grid md:grid-cols-3 gap-6 p-6">
                <SkillsSection
                    user={user}
                    isOwner={isOwner}
                />

                <ProjectsSection
                    user={user}
                    isOwner={isOwner}
                />

                <ProblemsTabs user={user} navigate={navigate} />
            </div>
        </div>
    );
}

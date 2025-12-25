import { Mail } from "lucide-react";
import LogoutButton from "../Logout/LogoutButton";

export default function ProfileHeader({ user, sliceUser, onLogout }) {
    return (
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src={user.profilePic}
                    className="w-32 h-32 rounded-full border-4 border-white/40"
                />

                <div className="flex-1">
                    <h1 className="text-4xl font-bold">{user.username}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <Mail size={16} />
                        {user.email}
                    </div>
                </div>

                {user._id === sliceUser._id && (
                    <div onClick={onLogout}>
                        <LogoutButton />
                    </div>
                )}
            </div>
        </div>
    );
}

import { useState, useEffect, useRef } from "react";
import {
    ChevronDown,
    ChevronUp,
    Mail,
    Award,
    Briefcase,
    Code,
    Users,
} from "lucide-react";
import { FaCamera } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { authSliceActions, logoutAsync } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import LogoutButton from "./Logout/LogoutButton";
import { RxCross2 } from "react-icons/rx";

export default function ProfileDetails() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("problems");
    const dispatch = useDispatch();
    const { user: sliceUser } = useSelector((store) => store.authProvider);
    const inputSkill = useRef(null);
    const title = useRef(null);
    const description = useRef(null);
    const url = useRef(null);
    const achievements = useRef(null);
    const inputProjectLink = useRef(null);
    const [dummyLink, setDummyLink] = useState("");
    const [expandedSections, setExpandedSections] = useState({
        skills: true,
        projects: false,
        achievements: false,
        contacts: false,
    });
    const [showProjectForm, setShowProjectForm] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (sliceUser._id.toString() !== userId) {
                try {
                    const response = await axios.get(
                        `${
                            import.meta.env.VITE_API_BASE_URL
                        }/api/user/${userId}`,
                        {
                            withCredentials: true,
                        }
                    );
                    const userData = response.data;
                    console.log("Fetched user data:", userData);
                    console.log(userData);
                    setUser(userData);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setUser(sliceUser);
                setLoading(false); // <- Don't forget to stop loading in this case too
            }
        };

        fetchUserData();
    }, [sliceUser, userId]);

    const handleLogout = async () => {
        dispatch(logoutAsync()); // Calls API & updates Redux state
        navigate("/login");
    };

    const handleEditSkills = async () => {
        const skills = sliceUser.skills;
        try {
            if (skills === sliceUser.skills) {
                console.log("No changes made to skills.");
                return;
            }
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/user/editSkills`,
                { skills },
                { withCredentials: true }
            );
            console.log("Skills added successfully:", response.data);
        } catch (error) {
            console.error("Error adding skills:", error);
        }
    };

    const addProjects = async (event) => {
        event.preventDefault();
        try {
            const newProject = {
                title: title.current.value.trim(),
                description: description.current.value.trim(),
                link: url.current.value.trim(),
            };

            // Update state optimistically, but don't use it right away
            setUser((prevState) => ({
                ...prevState,
                pastProjects: [...prevState.pastProjects, newProject],
            }));

            // Send the updated projects to the backend
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/user/editPastProjects`,
                { pastProjects: [...user.pastProjects, newProject] }, // send updated projects
                { withCredentials: true }
            );

            // Update the state with the response data (backend's confirmation)
            setUser(response.data.data);

            // Dispatch login action
            dispatch(authSliceActions.login(response.data.data)); // Login with the updated user data
            console.log(response);
            if (response.status == 200) {
                title.current.value = "";
                description.current.value = "";
                url.current.value = "";
                setShowProjectForm(false);
            }
        } catch (error) {
            console.log("Error in adding project: ", error);
        }
    };

    const removeProjects = async (project) => {
        const updatedProjects = user.pastProjects.filter((p) => p !== project);
        if (sliceUser.pastProjects === updatedProjects) {
            console.log("No changes made to Past Projects");
            return;
        }
        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/user/editPastProjects`,
                { pastProjects: updatedProjects },
                { withCredentials: true }
            );
            console.log("Project removed successfully:", response.data);
            setUser((prevUser) => ({
                ...prevUser,
                pastProjects: updatedProjects,
            }));
        } catch (error) {
            console.error("Error removing project:", error);
        }
    };

    const addSkillsLocally = () => {
        const newSkill = inputSkill.current.value.trim();
        if (newSkill) {
            setUser((prevUser) => ({
                ...prevUser,
                skills: [...prevUser.skills, newSkill],
            }));
            inputSkill.current.value = "";
        }
    };

    const removeSkillLocally = (skill) => {
        setUser((prevUser) => ({
            ...prevUser,
            skills: prevUser.skills.filter((s) => s !== skill),
        }));
    };

    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section],
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold">Loading profile...</div>
            </div>
        );
    }

    // Use mock data for demonstration

    return (
        <div
            className="text-black min-h-screen pt-[90px]"
            style={{
                background:
                    "linear-gradient(to bottom right, #2d3748, #1a202c)",
            }}
        >
            {showProjectForm && (
                <div className="fixed inset-0 z-10 w-screen h-screen flex items-center justify-center">
                    {/* Background overlay with improved blur */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"></div>

                    {/* Modal with light theme styling */}
                    <div className="relative bg-white w-11/12 sm:w-3/5 md:w-1/2 max-w-2xl h-auto max-h-4/5 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300">
                        {/* Decorative top bar */}
                        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 w-full"></div>

                        <div className="p-8 flex flex-col gap-6">
                            {/* Close button with improved hover effect */}
                            <button
                                onClick={() => setShowProjectForm(false)}
                                className="absolute top-4 right-4 size-10 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full p-2 cursor-pointer transition-all duration-300"
                                aria-label="Close"
                            >
                                <RxCross2 size={22} />
                            </button>

                            {/* Header with improved typography */}
                            <div className="text-center mb-2">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                    Add New Project
                                </h2>
                                <p className="text-gray-500 mt-1">
                                    Share your amazing work with the world
                                </p>
                            </div>

                            {/* Form with improved input styling */}
                            <form className="w-full space-y-6">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Project Title{" "}
                                        <h1 className="text-red-500 size-2 inline">
                                            *
                                        </h1>
                                    </label>
                                    <input
                                        type="text"
                                        ref={title}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 bg-white"
                                        placeholder="Enter project title"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Description{" "}
                                        <h1 className="text-red-500 size-2 inline">
                                            *
                                        </h1>
                                    </label>
                                    <textarea
                                        ref={description}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 resize-none h-24 bg-white"
                                        placeholder="Describe your project"
                                        required
                                    ></textarea>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Project URL{" "}
                                        <h1 className="text-red-500 size-2 inline">
                                            *
                                        </h1>
                                    </label>
                                    <input
                                        type="url"
                                        ref={url}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 bg-white"
                                        placeholder="https://github.com/yourusername/project"
                                        required
                                    />
                                </div>

                                {/* Submit button with blue gradient */}
                                <button
                                    onClick={addProjects}
                                    type="submit"
                                    className="w-full py-3 px-6 text-white font-medium bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                >
                                    Add Project
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="container mx-auto py-8 px-4 md:px-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Profile Header */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 md:p-8 text-white">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                            <div className="relative group flex-shrink-0">
                                {/* Glowing ring effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>

                                <div className="relative">
                                    <img
                                        src={user.profilePic}
                                        alt={`${user.username}'s profile`}
                                        className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/30 object-cover shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-white/50 group-hover:shadow-3xl"
                                    />

                                    {/* Status indicator */}
                                    <div className="absolute top-1 right-1 w-6 h-6 bg-green-400 border-3 border-white rounded-full shadow-lg"></div>
                                </div>

                                {user._id.toString() ===
                                    sliceUser._id.toString() && (
                                    <label className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 cursor-pointer group/btn">
                                        <FaCamera className="text-white w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />

                                        {/* Tooltip */}
                                        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                                            Change Photo
                                        </div>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="environment"
                                            className="hidden"
                                            onChange={async (e) => {
                                                setLoading(true);
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const data = new FormData();
                                                    data.append("file", file);
                                                    data.append(
                                                        "upload_preset",
                                                        `${
                                                            import.meta.env
                                                                .VITE_CLOUDINARY_UPLOAD_PRESET
                                                        }`
                                                    );
                                                    data.append(
                                                        "cloud_name",
                                                        `${
                                                            import.meta.env
                                                                .VITE_CLOUDINARY_CLOUD_NAME
                                                        }`
                                                    );
                                                    const res =
                                                        await axios.post(
                                                            `${
                                                                import.meta.env
                                                                    .VITE_CLOUDINARY_IMAGE_UPLOAD_URL
                                                            }`,
                                                            data
                                                        );
                                                    const uploadedImageUrl =
                                                        res.data.url;
                                                    setDummyLink(
                                                        uploadedImageUrl
                                                    );
                                                    console.log(
                                                        uploadedImageUrl
                                                    );
                                                    if (uploadedImageUrl) {
                                                        try {
                                                            const response =
                                                                await axios.post(
                                                                    `${
                                                                        import.meta
                                                                            .env
                                                                            .VITE_API_BASE_URL
                                                                    }/api/user/uploadProfilePic`,
                                                                    {
                                                                        profilePicURL:
                                                                            uploadedImageUrl,
                                                                    },
                                                                    {
                                                                        withCredentials: true,
                                                                    }
                                                                );
                                                            console.log(
                                                                "Profile picture updated successfully:",
                                                                response.data
                                                                    .savedUser
                                                            );
                                                            dispatch(
                                                                authSliceActions.login(
                                                                    response
                                                                        .data
                                                                        .savedUser
                                                                )
                                                            );
                                                        } catch (error) {
                                                            console.error(
                                                                "Error updating profile picture:",
                                                                error
                                                            );
                                                        }
                                                    }
                                                }
                                                setLoading(false);
                                            }}
                                        />
                                    </label>
                                )}

                                {/* Loading overlay */}
                                {loading && (
                                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                        {user.username}
                                    </h1>
                                    <div className="h-1 w-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto md:mx-0"></div>
                                </div>

                                <div className="flex items-center justify-center md:justify-start space-x-3 text-white/90 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 w-fit mx-auto md:mx-0">
                                    <div className="p-1.5 bg-white/20 rounded-full">
                                        <Mail
                                            size={16}
                                            className="text-white"
                                        />
                                    </div>
                                    <span className="font-medium">
                                        {user.email}
                                    </span>
                                </div>
                            </div>

                            {user &&
                                user._id.toString() ===
                                    sliceUser._id.toString() && (
                                    <div className="flex-shrink-0">
                                        <div
                                            style={{ cursor: "pointer" }}
                                            onClick={handleLogout}
                                            className="group relative"
                                        >
                                            <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
                                            <div className="relative bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm border border-red-400/30 rounded-lg p-3 transition-all duration-300 transform hover:scale-105">
                                                <LogoutButton />
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row bg-slate-800 text-slate-100">
                        {/* Left Column - Skills & Info */}
                        <div className="md:w-1/3 p-4 md:p-6 border-r border-slate-600/50">
                            {/* Skills Section */}
                            <div className="mb-6">
                                <div
                                    className="flex items-center justify-between cursor-pointer group hover:bg-slate-700/30 p-2 rounded-lg transition-all"
                                    onClick={() => {
                                        toggleSection("skills");
                                    }}
                                >
                                    <div className="flex items-center text-lg font-semibold text-slate-200">
                                        <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30 mr-3">
                                            <Code
                                                size={20}
                                                className="text-blue-400"
                                            />
                                        </div>
                                        <h2>Skills</h2>
                                    </div>
                                    <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
                                        {expandedSections.skills ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </div>
                                </div>

                                {expandedSections.skills && (
                                    <>
                                        <div className="mt-4 pl-4">
                                            {user._id.toString() ===
                                                sliceUser._id.toString() && (
                                                <input
                                                    onKeyDown={(event) => {
                                                        if (
                                                            event.key ===
                                                            "Enter"
                                                        ) {
                                                            addSkillsLocally();
                                                        }
                                                    }}
                                                    ref={inputSkill}
                                                    type="text"
                                                    className="w-[80%] mt-2 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all duration-200"
                                                    placeholder="Add skills..."
                                                />
                                            )}
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {user.skills.map(
                                                    (skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-600/20 border border-blue-500/30 flex gap-1 items-center text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium"
                                                        >
                                                            {skill}
                                                            {user._id.toString() ===
                                                                sliceUser._id.toString() && (
                                                                <RxCross2
                                                                    onClick={() =>
                                                                        removeSkillLocally(
                                                                            skill
                                                                        )
                                                                    }
                                                                    className="hover:bg-blue-500/30 rounded-full cursor-pointer p-0.5 transition-colors"
                                                                    size={14}
                                                                />
                                                            )}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                            {user._id.toString() ===
                                                sliceUser._id.toString() && (
                                                <button
                                                    onClick={handleEditSkills}
                                                    className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium cursor-pointer transition-colors"
                                                >
                                                    Save
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Projects Section */}
                            <div className="mb-6">
                                <div
                                    className="flex items-center justify-between cursor-pointer group hover:bg-slate-700/30 p-2 rounded-lg transition-all"
                                    onClick={() => toggleSection("projects")}
                                >
                                    <div className="flex items-center text-lg font-semibold text-slate-200">
                                        <div className="p-2 bg-green-600/20 rounded-lg border border-green-500/30 mr-3">
                                            <Briefcase
                                                size={20}
                                                className="text-green-400"
                                            />
                                        </div>
                                        <h2>Past Projects</h2>
                                    </div>
                                    <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
                                        {expandedSections.projects ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </div>
                                </div>

                                {expandedSections.projects && (
                                    <div className="mt-4 pl-4">
                                        <div className="space-y-3">
                                            {user.pastProjects.map(
                                                (project, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-700/40 border border-slate-600/50 p-3 rounded-lg hover:bg-slate-700/60 transition-all duration-200"
                                                    >
                                                        <a
                                                            target="_blank"
                                                            href={project.link}
                                                            className="text-blue-400 hover:text-blue-300 cursor-pointer break-words text-sm sm:text-base flex-1 font-medium"
                                                        >
                                                            {project.title}
                                                        </a>
                                                        {user._id.toString() ===
                                                            sliceUser._id.toString() && (
                                                            <RxCross2
                                                                onClick={() =>
                                                                    removeProjects(
                                                                        project
                                                                    )
                                                                }
                                                                className="flex-shrink-0 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full p-1 cursor-pointer transition-all duration-200"
                                                                size={20}
                                                                title="Remove Project"
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        {user._id.toString() ===
                                            sliceUser._id.toString() && (
                                            <button
                                                onClick={() =>
                                                    setShowProjectForm(
                                                        !showProjectForm
                                                    )
                                                }
                                                className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium cursor-pointer transition-colors"
                                            >
                                                Add Project
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Achievements Section */}
                            <div className="mb-6">
                                <div
                                    className="flex items-center justify-between cursor-pointer group hover:bg-slate-700/30 p-2 rounded-lg transition-all"
                                    onClick={() =>
                                        toggleSection("achievements")
                                    }
                                >
                                    <div className="flex items-center text-lg font-semibold text-slate-200">
                                        <div className="p-2 bg-yellow-600/20 rounded-lg border border-yellow-500/30 mr-3">
                                            <Award
                                                size={20}
                                                className="text-yellow-400"
                                            />
                                        </div>
                                        <h2>Achievements</h2>
                                    </div>
                                    <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
                                        {expandedSections.achievements ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </div>
                                </div>

                                {expandedSections.achievements && (
                                    <div className="mt-4 pl-4">
                                        {user._id.toString() ===
                                            sliceUser._id.toString() && (
                                            <input
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") {
                                                        addSkillsLocally();
                                                    }
                                                }}
                                                ref={achievements}
                                                type="text"
                                                className="w-[80%] mt-2 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                                                placeholder="Add achievement..."
                                            />
                                        )}
                                        <div className="mt-4">
                                            <div className="space-y-2">
                                                {user.achievements.map(
                                                    (achievement, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-2 text-slate-300 py-1"
                                                        >
                                                            <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                                                            <span className="text-sm">
                                                                {achievement}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        {user._id.toString() ===
                                            sliceUser._id.toString() && (
                                            <button
                                                onClick={handleEditSkills}
                                                className="mt-4 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white text-sm font-medium cursor-pointer transition-colors"
                                            >
                                                Save
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Contacts Section */}
                            <div className="mb-6">
                                <div
                                    className="flex items-center justify-between cursor-pointer group hover:bg-slate-700/30 p-2 rounded-lg transition-all"
                                    onClick={() => toggleSection("contacts")}
                                >
                                    <div className="flex items-center text-lg font-semibold text-slate-200">
                                        <div className="p-2 bg-purple-600/20 rounded-lg border border-purple-500/30 mr-3">
                                            <Users
                                                size={20}
                                                className="text-purple-400"
                                            />
                                        </div>
                                        <h2>Contacts</h2>
                                    </div>
                                    <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
                                        {expandedSections.contacts ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </div>
                                </div>

                                {expandedSections.contacts && (
                                    <div className="mt-4 pl-4">
                                        {user.contact.length > 0 ? (
                                            <div className="space-y-3">
                                                {user.contact.map(
                                                    (contact, index) => (
                                                        <div
                                                            key={index}
                                                            className="bg-slate-700/40 border border-slate-600/50 p-3 rounded-lg"
                                                        >
                                                            <div className="font-medium text-slate-200">
                                                                {
                                                                    contact.username
                                                                }
                                                            </div>
                                                            <div className="text-sm text-slate-400 mt-1">
                                                                {contact.email}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <p className="text-slate-400 italic text-sm">
                                                No contacts added yet
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Problems */}
                        <div className="md:w-2/3 p-4 md:p-6">
                            <div className="mb-6">
                                <div className="flex border-b border-slate-600/50">
                                    <button
                                        className={`px-6 py-3 font-medium cursor-pointer transition-all ${
                                            activeTab === "problems"
                                                ? "text-blue-400 border-b-2 border-blue-400 bg-slate-700/30"
                                                : "text-slate-400 hover:text-slate-300"
                                        }`}
                                        onClick={() => setActiveTab("problems")}
                                    >
                                        Solving Problems
                                    </button>
                                    <button
                                        className={`px-6 py-3 cursor-pointer font-medium transition-all ${
                                            activeTab === "issued"
                                                ? "text-blue-400 border-b-2 border-blue-400 bg-slate-700/30"
                                                : "text-slate-400 hover:text-slate-300"
                                        }`}
                                        onClick={() => setActiveTab("issued")}
                                    >
                                        Issued Problems
                                    </button>
                                </div>
                            </div>

                            {activeTab === "problems" ? (
                                <div>
                                    <h3 className="text-xl font-semibold mb-6 text-slate-200">
                                        Problems I'm Solving
                                    </h3>
                                    {user.solvingProblems.length > 0 ? (
                                        <div className="space-y-4">
                                            {user.solvingProblems.map(
                                                (problem, index) => (
                                                    <div
                                                        onClick={() => {
                                                            navigate(
                                                                "/problemDetails/" +
                                                                    problem
                                                                        .problemId
                                                                        ._id
                                                            );
                                                        }}
                                                        key={index}
                                                        className="bg-slate-700/40 border border-slate-600/50 rounded-xl p-5 hover:bg-slate-700/60 hover:border-slate-500/50 transition-all cursor-pointer group"
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <h4 className="font-medium text-slate-200 group-hover:text-white transition-colors flex-1 pr-4">
                                                                {
                                                                    problem
                                                                        .problemId
                                                                        .problemStatement
                                                                }
                                                            </h4>
                                                            <span
                                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                                                                    problem.solved
                                                                        ? "bg-green-600/20 text-green-300 border border-green-500/30"
                                                                        : "bg-yellow-600/20 text-yellow-300 border border-yellow-500/30"
                                                                }`}
                                                            >
                                                                {problem.solved
                                                                    ? "Solved"
                                                                    : "In Progress"}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-slate-400 mt-3 flex items-center gap-2">
                                                            <span>
                                                                Attempted:
                                                            </span>
                                                            <span className="text-slate-300">
                                                                {new Date(
                                                                    problem.attemptedAt
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="text-slate-400 text-lg mb-2">
                                                No problems currently being
                                                solved
                                            </div>
                                            <div className="text-slate-500 text-sm">
                                                Start solving problems to see
                                                them here
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-xl font-semibold mb-6 text-slate-200">
                                        Problems I've Issued
                                    </h3>
                                    {user.issuedProblems.length > 0 ? (
                                        <div className="space-y-4">
                                            {user.issuedProblems.map(
                                                (problem, index) => (
                                                    <div
                                                        onClick={() => {
                                                            navigate(
                                                                `/problemDetails/${problem.problemId._id}`
                                                            );
                                                        }}
                                                        key={index}
                                                        className="bg-slate-700/40 border border-slate-600/50 rounded-xl p-5 hover:bg-slate-700/60 hover:border-slate-500/50 transition-all cursor-pointer group"
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <h4 className="font-medium text-slate-200 group-hover:text-white transition-colors flex-1 pr-4">
                                                                {
                                                                    problem
                                                                        .problemId
                                                                        .problemStatement
                                                                }
                                                            </h4>
                                                            <span
                                                                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 ${
                                                                    problem.solved
                                                                        ? "bg-green-600/20 text-green-300 border border-green-500/30"
                                                                        : "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                                                                }`}
                                                            >
                                                                {problem.solved
                                                                    ? "Solved"
                                                                    : "Open"}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-slate-400 mt-3 flex items-center gap-2">
                                                            <span>Issued:</span>
                                                            <span className="text-slate-300">
                                                                {new Date(
                                                                    problem.issuedAt
                                                                ).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="text-slate-400 text-lg mb-2">
                                                No problems issued yet
                                            </div>
                                            <div className="text-slate-500 text-sm">
                                                Create your first problem to get
                                                started
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

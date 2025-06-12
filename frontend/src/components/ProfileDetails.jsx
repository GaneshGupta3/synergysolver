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
    const [dummyLink , setDummyLink] = useState("")
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
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 md:p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="relative group">
                                <img
                                    src={user.profilePic}
                                    alt={`${user.username}'s profile`}
                                    className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md transition duration-300 ease-in-out group-hover:opacity-80"
                                />

                                {user._id.toString() ===
                                    sliceUser._id.toString() && (
                                    <label className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-200 transition cursor-pointer">
                                        <FaCamera className="text-gray-600 w-4 h-4" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            capture="environment" // or "user" for front cam
                                            className="hidden"
                                            onChange={async (e) => {
                                                setLoading(true);
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const data = new FormData();
                                                    data.append("file", file);
                                                    data.append(
                                                        "upload_preset",
                                                        `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
                                                    );
                                                    data.append(
                                                        "cloud_name",
                                                        `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`
                                                    );
                                                    const res =
                                                        await axios.post(
                                                            `${import.meta.env.VITE_CLOUDINARY_IMAGE_UPLOAD_URL}`,
                                                            data
                                                        );
                                                    const uploadedImageUrl = res.data.url;
                                                    setDummyLink(uploadedImageUrl);
                                                    console.log(uploadedImageUrl);
                                                    if(uploadedImageUrl) {
                                                        try {
                                                            const response =
                                                                await axios.post(
                                                                    `${
                                                                        import.meta.env.VITE_API_BASE_URL
                                                                    }/api/user/uploadProfilePic`,
                                                                    {
                                                                        profilePicURL: uploadedImageUrl,
                                                                    },
                                                                    {
                                                                        withCredentials: true,
                                                                    }
                                                                );
                                                            console.log(
                                                                "Profile picture updated successfully:",
                                                                response.data.savedUser
                                                            );
                                                            dispatch(
                                                                authSliceActions.login(
                                                                    response.data.savedUser
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
                            </div>

                            <div className="text-center md:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold">
                                    {user.username}
                                </h1>
                                <div className="flex items-center justify-center md:justify-start mt-2">
                                    <Mail size={16} className="mr-2" />
                                    <span>{user.email}</span>
                                </div>
                            </div>
                            {user &&
                                user._id.toString() ===
                                    sliceUser._id.toString() && (
                                    <div
                                        style={{ cursor: "pointer" }}
                                        onClick={handleLogout}
                                    >
                                        <LogoutButton />
                                    </div>
                                )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row">
                        {/* Left Column - Skills & Info */}
                        <div className="md:w-1/3 p-4 md:p-6 border-r border-gray-200">
                            {/* Skills Section */}
                            <div className="mb-6">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => {
                                        toggleSection("skills");
                                    }}
                                >
                                    <div className="flex items-center text-lg font-semibold text-gray-700">
                                        <Code
                                            size={20}
                                            className="mr-2 text-blue-500"
                                        />
                                        <h2>Skills</h2>
                                    </div>
                                    {expandedSections.skills ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </div>

                                {expandedSections.skills && (
                                    <>
                                        <div className="mt-3">
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
                                                    className="w-[80%] mt-2 border-0 border-b-2 border-b-gray-300 focus:border-b-blue-500 focus:text-blue-500 focus:outline-none p-1 transition-all duration-200"
                                                    placeholder="add skills"
                                                />
                                            )}
                                            {/* <br /> */}
                                            <div className="flex flex-wrap gap-2">
                                                {user.skills.map(
                                                    (skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-100 flex gap-0.5 items-center text-blue-800 px-3 py-1 rounded-full text-sm mt-3"
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
                                                                    className="hover:bg-blue-300 rounded-2xl cursor-pointer"
                                                                />
                                                            )}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                            {user._id.toString() ===
                                                sliceUser._id.toString() && (
                                                <div
                                                    onClick={handleEditSkills}
                                                    className="mt-4 p-1 bg-blue-400 w-[60px] rounded-md text-white text-center cursor-pointer hover:bg-blue-500 transition"
                                                >
                                                    save
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Projects Section */}
                            <div className="mb-6">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleSection("projects")}
                                >
                                    <div className="flex items-center text-lg font-semibold text-gray-700">
                                        <Briefcase
                                            size={20}
                                            className="mr-2 text-green-500"
                                        />
                                        <h2>Past Projects</h2>
                                    </div>
                                    {expandedSections.projects ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </div>

                                {expandedSections.projects && (
                                    <div className="mt-3">
                                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                                            {user.pastProjects.map(
                                                (project, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex mt-2 flex-col sm:flex-row sm:items-center w-fit sm:justify-between gap-2 bg-gray-100 p-1 rounded-md hover:bg-blue-100 transition-all duration-200 overflow-hidden"
                                                    >
                                                        <a
                                                            target="_blank"
                                                            href={project.link}
                                                            className="text-blue-400 cursor-pointer break-words overflow-hidden text-ellipsis text-sm sm:text-base w-full"
                                                        >
                                                            {project.title}
                                                        </a>
                                                        <RxCross2
                                                            onClick={() =>
                                                                removeProjects(
                                                                    project
                                                                )
                                                            }
                                                            className="flex-shrink-0 text-red-500 hover:bg-red-200 rounded-full p-1 cursor-pointer transition-all duration-200"
                                                            size={22}
                                                            title="Remove Project"
                                                        />
                                                    </li>
                                                )
                                            )}
                                        </ul>

                                        {user._id.toString() ===
                                            sliceUser._id.toString() && (
                                            <div
                                                onClick={() =>
                                                    setShowProjectForm(
                                                        !showProjectForm
                                                    )
                                                }
                                                className="mt-4 p-1 bg-blue-400 w-[60px] rounded-md text-white text-center cursor-pointer hover:bg-blue-500 transition"
                                            >
                                                add
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Achievements Section */}
                            <div className="mb-6">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() =>
                                        toggleSection("achievements")
                                    }
                                >
                                    <div className="flex items-center text-lg font-semibold text-gray-700">
                                        <Award
                                            size={20}
                                            className="mr-2 text-yellow-500"
                                        />
                                        <h2>Achievements</h2>
                                    </div>
                                    {expandedSections.achievements ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </div>

                                {expandedSections.achievements && (
                                    <>
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
                                                className="w-[80%] mt-2 border-0 border-b-2 border-b-gray-300 focus:border-b-blue-500 focus:text-blue-500 focus:outline-none p-1 transition-all duration-200"
                                                placeholder="add skills"
                                            />
                                        )}
                                        <div className="mt-3">
                                            <ul className="list-disc list-inside text-gray-700">
                                                {user.achievements.map(
                                                    (achievement, index) => (
                                                        <li
                                                            key={index}
                                                            className="py-1"
                                                        >
                                                            {achievement}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                        <div
                                            onClick={handleEditSkills}
                                            className="mt-4 p-1 bg-blue-400 w-[60px] rounded-md text-white text-center cursor-pointer hover:bg-blue-500 transition"
                                        >
                                            save
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Contacts Section */}
                            <div className="mb-6">
                                <div
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleSection("contacts")}
                                >
                                    <div className="flex items-center text-lg font-semibold text-gray-700">
                                        <Users
                                            size={20}
                                            className="mr-2 text-purple-500"
                                        />
                                        <h2>Contacts</h2>
                                    </div>
                                    {expandedSections.contacts ? (
                                        <ChevronUp size={20} />
                                    ) : (
                                        <ChevronDown size={20} />
                                    )}
                                </div>

                                {expandedSections.contacts && (
                                    <div className="mt-3">
                                        {user.contact.length > 0 ? (
                                            <ul className="divide-y divide-gray-100">
                                                {user.contact.map(
                                                    (contact, index) => (
                                                        <li
                                                            key={index}
                                                            className="py-2"
                                                        >
                                                            <div className="font-medium">
                                                                {
                                                                    contact.username
                                                                }
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {contact.email}
                                                            </div>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-500 italic">
                                                No contacts added yet
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Problems */}
                        <div className="md:w-2/3 p-4 md:p-6">
                            <div className="mb-4">
                                <div className="flex border-b border-gray-200">
                                    <button
                                        className={`px-4 py-2 font-medium cursor-pointer ${
                                            activeTab === "problems"
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-gray-500"
                                        }`}
                                        onClick={() => setActiveTab("problems")}
                                    >
                                        Solving Problems
                                    </button>
                                    <button
                                        className={`px-4 py-2 cursor-pointer font-medium ${
                                            activeTab === "issued"
                                                ? "text-blue-600 border-b-2 border-blue-600"
                                                : "text-gray-500"
                                        }`}
                                        onClick={() => setActiveTab("issued")}
                                    >
                                        Issued Problems
                                    </button>
                                </div>
                            </div>

                            {activeTab === "problems" ? (
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
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
                                                        className="border  border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-medium text-black">
                                                                {
                                                                    problem
                                                                        .problemId
                                                                        .problemStatement
                                                                }
                                                            </h4>
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                    problem.solved
                                                                        ? "bg-green-100 text-green-800"
                                                                        : "bg-yellow-100 text-yellow-800"
                                                                }`}
                                                            >
                                                                {problem.solved
                                                                    ? "Solved"
                                                                    : "In Progress"}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-gray-500 mt-2">
                                                            Attempted:{" "}
                                                            {new Date(
                                                                problem.attemptedAt
                                                            ).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">
                                            No problems currently being solved
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
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
                                                            // console.log(problem.problemId._id)
                                                        }}
                                                        key={index}
                                                        className="border cursor-pointer border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <h4 className="font-medium">
                                                                {
                                                                    problem
                                                                        .problemId
                                                                        .problemStatement
                                                                }
                                                            </h4>
                                                            <span
                                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                    problem.solved
                                                                        ? "bg-green-100 text-green-800"
                                                                        : "bg-blue-100 text-blue-800"
                                                                }`}
                                                            >
                                                                {problem.solved
                                                                    ? "Solved"
                                                                    : "Open"}
                                                            </span>
                                                        </div>
                                                        <div className="text-sm text-gray-500 mt-2">
                                                            Issued at:{" "}
                                                            {new Date(
                                                                problem.issuedAt
                                                            ).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 italic">
                                            No problems issued yet
                                        </p>
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

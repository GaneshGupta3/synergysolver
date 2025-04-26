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
    const [expandedSections, setExpandedSections] = useState({
        skills: true,
        projects: false,
        achievements: false,
        contacts: false,
    });
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logoutAsync()); // Calls API & updates Redux state
        navigate("/login");
    };

    const handleEditSkills = async () => {
        const skills = user.skills;
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

    useEffect(() => {
        // Mock data fetching - in a real app, you'd fetch from your API
        const fetchUser = async () => {
            try {
                // Replace with actual API call
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/user/${userId}`,
                    {
                        withCredentials: true,
                    }
                );
                const userData = response.data.data;
                console.log(response.data.data);
                dispatch(authSliceActions.login(userData));
                setUser(userData);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

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
        <div className="bg-gray-50 text-black min-h-screen">
            <div className="container mx-auto py-8 px-4 md:px-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 md:p-8 text-white">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="mb-4 md:mb-0 md:mr-6">
                                <img
                                    src={user.profilePic}
                                    alt={`${user.username}'s profile`}
                                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                                />
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
                            <div
                                style={{ cursor: "pointer" }}
                                onClick={handleLogout}
                            >
                                <LogoutButton />
                            </div>
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
                                            <input
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") {
                                                        addSkillsLocally();
                                                    }
                                                }}
                                                ref={inputSkill}
                                                type="text"
                                                className="w-[80%] mt-2 border-0 border-b-2 border-b-gray-300 focus:border-b-blue-500 focus:text-blue-500 focus:outline-none p-1 transition-all duration-200"
                                                placeholder="add skills"
                                            />
                                            <br />
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {user.skills.map(
                                                    (skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-100 flex gap-0.5 items-center text-blue-800 px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {skill}
                                                            <RxCross2
                                                                onClick={() =>
                                                                    removeSkillLocally(
                                                                        skill
                                                                    )
                                                                }
                                                                className="hover:bg-blue-300 rounded-2xl cursor-pointer"
                                                            />
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                            <div
                                                onClick={handleEditSkills}
                                                className="mt-4 p-1 bg-blue-400 w-[60px] rounded-md text-white text-center cursor-pointer hover:bg-blue-500 transition"
                                            >
                                                save
                                            </div>
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
                                        <ul className="list-disc list-inside text-gray-700">
                                            {user.pastProjects.map(
                                                (project, index) => (
                                                    <li
                                                        key={index}
                                                        className="py-1"
                                                    >
                                                        {project}
                                                    </li>
                                                )
                                            )}
                                        </ul>
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
                                                            <h4 className="font-medium">
                                                                {
                                                                    problem.problemStatement
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

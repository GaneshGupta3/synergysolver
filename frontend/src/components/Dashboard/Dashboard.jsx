import { useState, useEffect } from "react";
import {
    Activity,
    Code,
    Users,
    BarChart2,
    Search,
    PlusCircle,
    CheckCircle,
    Clock,
    Award,
    Briefcase,
    Bell,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../../store/authSlice";
import { useDispatch } from "react-redux";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState("problems");
    const [searchQuery, setSearchQuery] = useState("");
    const [stats, setStats] = useState({
        problemsSolved: 0,
        problemsInProgress: 0,
        problemsIssued: 0,
        connections: 0,
    });

    useEffect(() => {
        // Mock data fetch - replace with actual API call
        const fetchDashboardData = async () => {
            try {
                // Simulate API delay
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/user/check-auth`,
                    { withCredentials: true }
                );
                console.log(response.data);
                dispatch(authSliceActions.login(response.data));

                // const user = response.data;

                // Mock user data
                const user = {
                    username: "techcoder42",
                    email: "techcoder@example.com",
                    profilePic: "/api/placeholder/150/150",
                    skills: [
                        "JavaScript",
                        "React",
                        "Node.js",
                        "MongoDB",
                        "Express",
                    ],
                    solvingProblems: [
                        {
                            problemId: "1",
                            title: "Optimize Database Query",
                            description:
                                "Find a way to optimize the current database query that is causing performance issues.",
                            difficulty: "Medium",
                            tags: ["Database", "Performance"],
                            solved: true,
                            granted: true,
                            attemptedAt: "2025-03-20T10:30:00Z",
                        },
                        {
                            problemId: "2",
                            title: "Fix Authentication Bug",
                            description:
                                "Users are occasionally getting logged out unexpectedly. Debug and fix the authentication system.",
                            difficulty: "Hard",
                            tags: ["Security", "Bug Fix"],
                            solved: false,
                            granted: true,
                            attemptedAt: "2025-04-05T14:20:00Z",
                        },
                        {
                            problemId: "3",
                            title: "Implement Caching Layer",
                            description:
                                "Add a Redis caching layer to improve response times on frequently accessed data.",
                            difficulty: "Medium",
                            tags: ["Performance", "Cache"],
                            solved: false,
                            granted: true,
                            attemptedAt: "2025-04-12T09:15:00Z",
                        },
                    ],
                    issuedProblems: [
                        {
                            problemId: "4",
                            title: "Implement Chat Feature",
                            description:
                                "Add a real-time chat feature using WebSockets for user communication.",
                            difficulty: "Hard",
                            tags: ["WebSockets", "Real-time"],
                            solved: true,
                            solvedBy: "devpro",
                            issuedAt: "2025-02-10T11:45:00Z",
                        },
                        {
                            problemId: "5",
                            title: "Optimize Image Compression",
                            description:
                                "Implement better image compression to reduce bandwidth usage.",
                            difficulty: "Easy",
                            tags: ["Optimization", "Media"],
                            solved: false,
                            issuedAt: "2025-03-25T16:30:00Z",
                        },
                    ],
                    recentActivities: [
                        {
                            type: "problem_solved",
                            description: "You solved 'Optimize Database Query'",
                            timestamp: "2025-04-02T15:20:00Z",
                        },
                        {
                            type: "new_connection",
                            description: "Connected with user 'codemaster'",
                            timestamp: "2025-04-07T09:40:00Z",
                        },
                        {
                            type: "problem_issued",
                            description:
                                "You issued a new problem: 'Optimize Image Compression'",
                            timestamp: "2025-03-25T16:30:00Z",
                        },
                        {
                            type: "achievement_earned",
                            description:
                                "You earned the 'Problem Solver' achievement",
                            timestamp: "2025-04-02T15:25:00Z",
                        },
                    ],
                    contact: [
                        {
                            id: "1",
                            username: "devpro",
                            email: "devpro@example.com",
                            profilePic: "/api/placeholder/50/50",
                        },
                        {
                            id: "2",
                            username: "codemaster",
                            email: "codemaster@example.com",
                            profilePic: "/api/placeholder/50/50",
                        },
                        {
                            id: "3",
                            username: "webwizard",
                            email: "webwizard@example.com",
                            profilePic: "/api/placeholder/50/50",
                        },
                    ],
                    achievements: [
                        {
                            name: "Problem Solver",
                            description: "Solved 10+ problems",
                            earned: true,
                            date: "2025-03-15T00:00:00Z",
                        },
                        {
                            name: "Task Initiator",
                            description: "Issued 5+ problems",
                            earned: true,
                            date: "2025-02-20T00:00:00Z",
                        },
                        {
                            name: "Network Builder",
                            description: "Made 10+ connections",
                            earned: false,
                            progress: 3,
                        },
                    ],
                };

                setUserData(user);

                // Calculate stats
                setStats({
                    problemsSolved: user.solvingProblems.filter((p) => p.solved)
                        .length,
                    problemsInProgress: user.solvingProblems.filter(
                        (p) => !p.solved
                    ).length,
                    problemsIssued: user.issuedProblems.length,
                    connections: user.contact.length,
                });

                // Mock notifications
                setNotifications([
                    {
                        id: 1,
                        message: "Your solution was accepted!",
                        read: false,
                        timestamp: "2025-04-13T10:30:00Z",
                    },
                    {
                        id: 2,
                        message:
                            "New problem available that matches your skills",
                        read: false,
                        timestamp: "2025-04-12T15:45:00Z",
                    },
                    {
                        id: 3,
                        message: "User devpro wants to connect",
                        read: true,
                        timestamp: "2025-04-10T09:20:00Z",
                    },
                ]);

                setLoading(false);
            } catch (error) {
                navigate("/login");
                // console.error("Error fetching dashboard data:", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Format date to relative time (e.g., "2 days ago")
    const formatRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return "just now";
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800)
            return `${Math.floor(diffInSeconds / 86400)} days ago`;

        return date.toLocaleDateString();
    };

    // Filter problems based on search query
    const filteredProblems =
        userData?.solvingProblems.filter(
            (problem) =>
                problem.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                problem.tags.some((tag) =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                )
        ) || [];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold">
                    Loading dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Top Navigation */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto py-4 px-4 md:px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">
                                DevSolve Dashboard
                            </h1>
                        </div>

                        <div className="flex items-center">
                            <div className="relative mr-4">
                                <Bell
                                    size={20}
                                    className="text-gray-600 cursor-pointer"
                                />
                                {notifications.filter((n) => !n.read).length >
                                    0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                        {
                                            notifications.filter((n) => !n.read)
                                                .length
                                        }
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center">
                                <img
                                    src={userData.profilePic}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <span className="font-medium text-gray-700">
                                    {userData.username}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-6 px-4 md:px-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg shadow p-4 flex items-center">
                        <div className="rounded-full bg-green-100 p-3 mr-4">
                            <CheckCircle size={24} className="text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">
                                Problems Solved
                            </h3>
                            <p className="text-2xl text-black font-bold">
                                {stats.problemsSolved}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 flex items-center">
                        <div className="rounded-full bg-yellow-100 p-3 mr-4">
                            <Clock size={24} className="text-yellow-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">
                                In Progress
                            </h3>
                            <p className="text-2xl text-black font-bold">
                                {stats.problemsInProgress}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 flex items-center">
                        <div className="rounded-full bg-blue-100 p-3 mr-4">
                            <PlusCircle size={24} className="text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">
                                Problems Issued
                            </h3>
                            <p className="text-2xl text-black font-bold">
                                {stats.problemsIssued}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-4 flex items-center">
                        <div className="rounded-full bg-purple-100 p-3 mr-4">
                            <Users size={24} className="text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">
                                Connections
                            </h3>
                            <p className="text-2xl text-black font-bold">
                                {stats.connections}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                className={`px-4 py-3 font-medium text-sm ${
                                    activeTab === "problems"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500"
                                }`}
                                onClick={() => setActiveTab("problems")}
                            >
                                <span className="flex items-center">
                                    <Code size={16} className="mr-2" />
                                    Solving Problems
                                </span>
                            </button>

                            <button
                                className={`px-4 py-3 font-medium text-sm ${
                                    activeTab === "network"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500"
                                }`}
                                onClick={() => setActiveTab("network")}
                            >
                                <span className="flex items-center">
                                    <Users size={16} className="mr-2" />
                                    Network
                                </span>
                            </button>

                            <button
                                className={`px-4 py-3 font-medium text-sm ${
                                    activeTab === "achievements"
                                        ? "text-blue-600 border-b-2 border-blue-600"
                                        : "text-gray-500"
                                }`}
                                onClick={() => setActiveTab("achievements")}
                            >
                                <span className="flex items-center">
                                    <Award size={16} className="mr-2" />
                                    Achievements
                                </span>
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-4">
                        {/* Problems Tab */}
                        {activeTab === "problems" && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-medium">
                                        My Problems
                                    </h2>
                                    <div className="relative">
                                        <Search
                                            size={16}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search problems..."
                                            className="pl-10 text-black pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Problem
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Difficulty
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Tags
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Attempted
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredProblems.map(
                                                    (problem) => (
                                                        <tr
                                                            key={
                                                                problem.problemId
                                                            }
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="font-medium text-gray-900">
                                                                    {
                                                                        problem.title
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-gray-500 truncate max-w-md">
                                                                    {
                                                                        problem.description
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span
                                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                                        problem.difficulty ===
                                                                        "Easy"
                                                                            ? "bg-green-100 text-green-800"
                                                                            : problem.difficulty ===
                                                                              "Medium"
                                                                            ? "bg-yellow-100 text-yellow-800"
                                                                            : "bg-red-100 text-red-800"
                                                                    }`}
                                                                >
                                                                    {
                                                                        problem.difficulty
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex flex-wrap gap-1">
                                                                    {problem.tags.map(
                                                                        (
                                                                            tag,
                                                                            idx
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                                                                            >
                                                                                {
                                                                                    tag
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span
                                                                    className={`px-2 py-1 text-xs rounded-full ${
                                                                        problem.solved
                                                                            ? "bg-green-100 text-green-800"
                                                                            : "bg-yellow-100 text-yellow-800"
                                                                    }`}
                                                                >
                                                                    {problem.solved
                                                                        ? "Solved"
                                                                        : "In Progress"}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {formatRelativeTime(
                                                                    problem.attemptedAt
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredProblems.length === 0 && (
                                        <div className="text-center py-6">
                                            <p className="text-gray-500">
                                                No problems found matching your
                                                criteria
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Network Tab */}
                        {activeTab === "network" && (
                            <div>
                                <h2 className="text-lg font-medium mb-4">
                                    My Network
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {userData.contact.map((contact) => (
                                        <div
                                            key={contact.id}
                                            className="bg-white border border-gray-200 rounded-lg p-4 flex items-center"
                                        >
                                            <img
                                                src={contact.profilePic}
                                                alt={contact.username}
                                                className="w-12 h-12 rounded-full mr-4"
                                            />
                                            <div>
                                                <h3 className="font-medium text-gray-900">
                                                    {contact.username}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {contact.email}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-100">
                                        <div className="text-center">
                                            <PlusCircle
                                                size={24}
                                                className="mx-auto mb-2 text-gray-400"
                                            />
                                            <p className="text-sm font-medium text-gray-500">
                                                Find More Connections
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Achievements Tab */}
                        {activeTab === "achievements" && (
                            <div>
                                <h2 className="text-lg font-medium mb-4">
                                    My Achievements
                                </h2>
                                <div className="space-y-4">
                                    {userData.achievements.map(
                                        (achievement, index) => (
                                            <div
                                                key={index}
                                                className="bg-white border border-gray-200 rounded-lg p-4"
                                            >
                                                <div className="flex items-center">
                                                    <div
                                                        className={`rounded-full p-3 mr-4 ${
                                                            achievement.earned
                                                                ? "bg-yellow-100"
                                                                : "bg-gray-100"
                                                        }`}
                                                    >
                                                        <Award
                                                            size={24}
                                                            className={
                                                                achievement.earned
                                                                    ? "text-yellow-600"
                                                                    : "text-gray-400"
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-medium text-gray-900">
                                                            {achievement.name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                achievement.description
                                                            }
                                                        </p>

                                                        {achievement.earned ? (
                                                            <p className="text-xs text-green-600 mt-1">
                                                                Earned on{" "}
                                                                {new Date(
                                                                    achievement.date
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        ) : (
                                                            <div className="mt-2">
                                                                <div className="bg-gray-200 rounded-full h-2 w-full">
                                                                    <div
                                                                        className="bg-blue-600 h-2 rounded-full"
                                                                        style={{
                                                                            width: `${
                                                                                (achievement.progress /
                                                                                    10) *
                                                                                100
                                                                            }%`,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                                <p className="text-xs text-gray-500 mt-1">
                                                                    {
                                                                        achievement.progress
                                                                    }
                                                                    /10
                                                                    completed
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

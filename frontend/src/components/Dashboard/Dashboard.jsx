import axios from "axios";
import {
    Bell,
    CheckCircle,
    Clock,
    Code,
    PlusCircle,
    Search,
    Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSliceActions } from "../../store/authSlice";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
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
                // console.log(response.data);
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
                            problemStatement:
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
                            problemStatement:
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
                            problemStatement:
                                "Add a Redis caching layer to improve response times on frequently accessed data.",
                            difficulty: "Medium",
                            tags: ["Performance", "Cache"],
                            solved: false,
                            granted: true,
                            attemptedAt: "2025-04-12T09:15:00Z",
                        },
                        {
                            problemId: "10",
                            title: "Implement Caching Layer",
                            problemStatement:
                                "Add a Redis caching layer to improve response times on frequently accessed data.",
                            difficulty: "Medium",
                            tags: ["Performance", "Cache"],
                            solved: false,
                            granted: true,
                            attemptedAt: "2025-04-12T09:15:00Z",
                        },
                        {
                            problemId: "11",
                            title: "Implement Caching Layer",
                            problemStatement:
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
                            problemStatement:
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
                            problemStatement:
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
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
                    <div className="text-xl font-semibold text-white">
                        Loading dashboard...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-[90px] bg-slate-900">
            {/* Top Navigation */}
            <div className="bg-slate-800 border-b border-slate-700">
                <div className="container mx-auto py-4 px-4 md:px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-white">
                                DevSolve Dashboard
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-6 px-4 md:px-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-slate-800 rounded-xl shadow-lg p-6 flex items-center border border-slate-700">
                        <div className="rounded-full bg-green-500/20 p-3 mr-4">
                            <CheckCircle size={24} className="text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-400">
                                Problems Solved
                            </h3>
                            <p className="text-2xl text-white font-bold">
                                {stats.problemsSolved}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-xl shadow-lg p-6 flex items-center border border-slate-700">
                        <div className="rounded-full bg-yellow-500/20 p-3 mr-4">
                            <Clock size={24} className="text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-400">
                                In Progress
                            </h3>
                            <p className="text-2xl text-white font-bold">
                                {stats.problemsInProgress}
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-800 rounded-xl shadow-lg p-6 flex items-center border border-slate-700">
                        <div className="rounded-full bg-blue-500/20 p-3 mr-4">
                            <PlusCircle size={24} className="text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-slate-400">
                                Problems Issued
                            </h3>
                            <p className="text-2xl text-white font-bold">
                                {stats.problemsIssued}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-slate-800 rounded-xl shadow-lg mb-6 border border-slate-700">
                    <div className="border-b border-slate-700">
                        <nav className="flex">
                            <button
                                className={`px-6 py-4 font-medium text-sm transition-colors ${
                                    activeTab === "problems"
                                        ? "text-blue-400 border-b-2 border-blue-400"
                                        : "text-slate-400 hover:text-white"
                                }`}
                                onClick={() => setActiveTab("problems")}
                            >
                                <span className="flex items-center">
                                    <Code size={16} className="mr-2" />
                                    Solving Problems
                                </span>
                            </button>

                            

                            
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Problems Tab */}
                        {activeTab === "problems" && (
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-white">
                                        My Problems
                                    </h2>
                                    <div className="relative">
                                        <Search
                                            size={16}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search problems..."
                                            className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="bg-slate-700 border border-slate-600 rounded-xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-slate-600">
                                            <thead className="bg-slate-800">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                                        Problem
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                                        Difficulty
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                                        Tags
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                                        Attempted
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-600">
                                                {filteredProblems.map(
                                                    (problem) => (
                                                        <tr
                                                            key={
                                                                problem.problemId
                                                            }
                                                            className="hover:bg-slate-600 transition-colors"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="font-medium text-white">
                                                                    {
                                                                        problem.title
                                                                    }
                                                                </div>
                                                                <div className="text-sm text-slate-400 truncate max-w-md">
                                                                    {
                                                                        problem.problemStatement
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span
                                                                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                                        problem.difficulty ===
                                                                        "Easy"
                                                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                                            : problem.difficulty ===
                                                                              "Medium"
                                                                            ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                                            : "bg-red-500/20 text-red-400 border border-red-500/30"
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
                                                                                className="bg-slate-600 text-slate-300 px-2 py-1 rounded-md text-xs"
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
                                                                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                                        problem.solved
                                                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                                            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                                    }`}
                                                                >
                                                                    {problem.solved
                                                                        ? "Solved"
                                                                        : "In Progress"}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
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
                                        <div className="text-center py-8">
                                            <p className="text-slate-400">
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
                                <h2 className="text-xl font-semibold text-white mb-6">
                                    My Network
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {userData.contact.map((contact) => (
                                        <div
                                            key={contact.id}
                                            className="bg-slate-700 border border-slate-600 rounded-xl p-4 flex items-center"
                                        >
                                            <div>
                                                <h3 className="font-medium text-white">
                                                    {contact.username}
                                                </h3>
                                                <p className="text-sm text-slate-400">
                                                    {contact.email}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="bg-slate-700/50 border border-dashed border-slate-600 rounded-xl p-4 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition-colors">
                                        <div className="text-center">
                                            <PlusCircle
                                                size={24}
                                                className="mx-auto mb-2 text-slate-400"
                                            />
                                            <p className="text-sm font-medium text-slate-400">
                                                Find More Connections
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Achievements Tab */}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
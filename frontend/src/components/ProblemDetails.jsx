import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
    Clock,
    Github,
    Tag,
    AlertTriangle,
    User,
    Check,
    X,
    Users,
    Calendar,
    Award,
    Share2,
    Eye,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/authSlice";
import { CiLink } from "react-icons/ci";

// Problem Display Component
export default function ProblemDetails() {
    const [timeRemaining, setTimeRemaining] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const [problem, setProblem] = useState({});
    const [copyLink, setCopyLink] = useState("Copy Link");
    const { problemId } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const [expandedSection, setExpandedSection] = useState({
        attempters: false,
        accessPending: false,
    });
    const dispatch = useDispatch();

    const location = useLocation();
    const currentURL = `${window.location.origin}${location.pathname}${location.search}`;

    const toggleExpandedAccessPending = () => {
        setExpandedSection((prev) => ({
            ...prev,
            accessPending: !prev.accessPending,
        }));
    };

    const toggleExpandedAttempters = () => {
        setExpandedSection((prev) => ({
            ...prev,
            attempters: !expandedSection.attempters,
        }));
    };

    const handleAcceptRequest = async (solverId , problemId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/problem/acceptRequest/${problemId}`,
                {attempterId : solverId},
                {withCredentials: true}
            );
            console.log(response.data)
            setProblem(response.data.data.problem);
        } catch (error) {
            console.error("Error accepting request:", error);
            toast.error("Failed to accept request");
        }
    };

    const requestAccess = async () => {
        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/problem/attemptProblem/${problemId}`,
                {},
                { withCredentials: true }
            );
            if (response.data.success) {
                toast.success("Access requested successfully!");
            }
            console.log(response.data);
            setProblem(response.data.data.problem);
            setCurrentUser(response.data.data.user);
        } catch (error) {
            console.error("Error requesting access:", error);
            toast.error("Failed to request access");
        }
    };

    const handleCopy = () => {
        try {
            navigator.clipboard.writeText(window.location.href);
            setCopyLink("Copied!");
            setTimeout(() => {
                setCopyLink("Copy Link");
            }, 2000);
        } catch (error) {
            console.error("Failed to copy the link:", error);
        }
    };

    // Calculate time remaining until deadline
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/problem/getProblem/${problemId}`,
                    { withCredentials: true }
                );

                const problemData = response.data.data.problem;
                setProblem(problemData);

                if (
                    !problemData ||
                    !problemData.deadline ||
                    problemData.deadline === 0
                )
                    return;

                const updateTimeRemaining = () => {
                    const now = new Date();
                    const deadline = new Date(problemData.deadline);
                    const diffTime = deadline - now;

                    if (diffTime <= 0) {
                        setTimeRemaining("Deadline passed");
                        return;
                    }

                    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    const hours = Math.floor(
                        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    const minutes = Math.floor(
                        (diffTime % (1000 * 60 * 60)) / (1000 * 60)
                    );

                    setTimeRemaining(
                        `${days}d ${hours}h ${minutes}m remaining`
                    );
                };

                updateTimeRemaining();
                const interval = setInterval(updateTimeRemaining, 60000);
                dispatch(authSliceActions.login(response.data.data.user));
                setCurrentUser(response.data.data.user);
                return () => clearInterval(interval);
            } catch (error) {
                console.error("Error fetching problem:", error);
                toast.error("Error fetching problem details");
            }
        };

        fetchProblem();
    }, [problemId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getDifficultyConfig = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return {
                    color: "bg-gradient-to-r from-green-400 to-green-500",
                    textColor: "text-green-700",
                    bgColor: "bg-green-50",
                    borderColor: "border-green-200",
                    icon: "🟢",
                };
            case "Medium":
                return {
                    color: "bg-gradient-to-r from-yellow-400 to-orange-400",
                    textColor: "text-orange-700",
                    bgColor: "bg-orange-50",
                    borderColor: "border-orange-200",
                    icon: "🟡",
                };
            case "Hard":
                return {
                    color: "bg-gradient-to-r from-red-400 to-red-500",
                    textColor: "text-red-700",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-200",
                    icon: "🔴",
                };
            default:
                return {
                    color: "bg-gradient-to-r from-gray-400 to-gray-500",
                    textColor: "text-gray-700",
                    bgColor: "bg-gray-50",
                    borderColor: "border-gray-200",
                    icon: "⚪",
                };
        }
    };

    const difficultyConfig = getDifficultyConfig(problem.difficulty);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                    {/* Problem Header */}
                    <div className="relative p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex-1">
                                    <h1 className="text-4xl font-bold mb-3 leading-tight">
                                        {problem.problemStatement}
                                    </h1>
                                    <div className="flex items-center gap-2 text-blue-100">
                                        <Eye size={16} />
                                        <span>Problem Details</span>
                                    </div>
                                </div>

                                <div
                                    className={`${difficultyConfig.bgColor} ${difficultyConfig.textColor} px-4 py-2 rounded-full text-sm font-bold border-2 ${difficultyConfig.borderColor} flex items-center gap-2 shadow-lg`}
                                >
                                    <span>{difficultyConfig.icon}</span>
                                    {problem.difficulty}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                {problem.deadline && problem.deadline !== 0 && (
                                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                                        <Clock size={16} />
                                        <div>
                                            <div className="font-medium">
                                                Deadline
                                            </div>
                                            <div
                                                className={
                                                    timeRemaining ===
                                                    "Deadline passed"
                                                        ? "text-red-300"
                                                        : "text-blue-100"
                                                }
                                            >
                                                {timeRemaining ||
                                                    formatDate(
                                                        problem.deadline
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                                    <User size={16} />
                                    <div>
                                        <div className="font-medium">
                                            Created by
                                        </div>
                                        <Link
                                            to={`/profile/${problem.issuedBy?._id}`}
                                            className="text-blue-200 hover:text-white transition-colors"
                                        >
                                            {problem.issuedBy?.username ||
                                                "User"}
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                                    <Calendar size={16} />
                                    <div>
                                        <div className="font-medium">
                                            Posted
                                        </div>
                                        <div className="text-blue-100">
                                            {formatDate(problem.issuedAt)}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                                    {problem.solved ? (
                                        <>
                                            <Check
                                                size={16}
                                                className="text-green-300"
                                            />
                                            <div>
                                                <div className="font-medium">
                                                    Status
                                                </div>
                                                <div className="text-green-300">
                                                    Solved
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <AlertTriangle
                                                size={16}
                                                className="text-yellow-300"
                                            />
                                            <div>
                                                <div className="font-medium">
                                                    Status
                                                </div>
                                                <div className="text-yellow-300">
                                                    Open
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Problem Content */}
                    <div className="p-8 space-y-8">
                        {/* Tags */}
                        {problem.tags && problem.tags.length > 0 && (
                            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
                                <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-gray-800">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Tag
                                            size={20}
                                            className="text-blue-600"
                                        />
                                    </div>
                                    <span>Technologies & Tags</span>
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {problem.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Github Link */}
                        {problem.githubLink && (
                            <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-6">
                                <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-gray-800">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <Github
                                            size={20}
                                            className="text-gray-600"
                                        />
                                    </div>
                                    <span>GitHub Repository</span>
                                </h3>
                                <a
                                    href={problem.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium hover:underline bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
                                >
                                    <Github size={16} />
                                    View on GitHub
                                </a>
                            </div>
                        )}

                        {/* Goodies */}
                        {problem.goodies && (
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                                <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-orange-800">
                                    <div className="p-2 bg-yellow-100 rounded-lg">
                                        <Award
                                            size={20}
                                            className="text-yellow-600"
                                        />
                                    </div>
                                    <span>Rewards & Incentives</span>
                                </h3>
                                <div className="bg-white/80 p-4 rounded-lg border border-yellow-200 text-orange-800 font-medium">
                                    {problem.goodies}
                                </div>
                            </div>
                        )}

                        {/* Attempters */}
                        {problem.attempters &&
                            problem.attempters.length > 0 && (
                                <div className="bg-purple-50/50 border border-purple-100 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                <Users
                                                    size={20}
                                                    className="text-purple-600"
                                                />
                                            </div>
                                            <span>
                                                Participants (
                                                {problem.attempters.length})
                                            </span>
                                        </h3>
                                        <button
                                            onClick={toggleExpandedAttempters}
                                            className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                                        >
                                            {expandedSection.attempters ? (
                                                <>
                                                    Show Less{" "}
                                                    <ChevronUp size={16} />
                                                </>
                                            ) : (
                                                <>
                                                    Show All{" "}
                                                    <ChevronDown size={16} />
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {(expandedSection.attempters
                                            ? problem.attempters
                                            : problem.attempters.slice(0, 3)
                                        ).map((attempter, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 bg-white border border-purple-100 rounded-lg hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                                        {(
                                                            attempter.userId
                                                                ?.username ||
                                                            `User ${index + 1}`
                                                        )
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-gray-700">
                                                        {attempter.userId
                                                            ?.username ||
                                                            `User ${index + 1}`}
                                                    </span>
                                                </div>
                                                {attempter.solved ? (
                                                    <span className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
                                                        <Check size={16} />
                                                        Solved
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full font-medium">
                                                        <Clock size={16} />
                                                        In Progress
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {!expandedSection.attempters &&
                                        problem.attempters.length > 3 && (
                                            <div className="text-center text-purple-600 text-sm mt-4 font-medium">
                                                +{problem.attempters.length - 3}{" "}
                                                more participants
                                            </div>
                                        )}
                                </div>
                            )}

                        {/* Access Pending */}
                        {problem.accessPending &&
                            problem.accessPending.length > 0 && (
                                <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-6">
                                    <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-gray-800">
                                        <div className="p-2 bg-amber-100 rounded-lg">
                                            <AlertTriangle
                                                size={20}
                                                className="text-amber-600"
                                            />
                                        </div>
                                        <span>Access Requests</span>
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-bold rounded-full">
                                            {problem.accessPending.length}
                                        </span>
                                    </h3>

                                    <div
                                        onClick={toggleExpandedAccessPending}
                                        className="group p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md hover:border-amber-300 mb-4"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                                                <p className="text-gray-700 font-medium">
                                                    <span className="text-amber-600 font-bold">
                                                        {
                                                            problem
                                                                .accessPending
                                                                .length
                                                        }
                                                    </span>{" "}
                                                    user
                                                    {problem.accessPending
                                                        .length !== 1
                                                        ? "s"
                                                        : ""}{" "}
                                                    waiting for access approval
                                                </p>
                                            </div>
                                            <div className="text-amber-500 group-hover:text-amber-600 transition-colors">
                                                {expandedSection.accessPending ? (
                                                    <ChevronUp size={20} />
                                                ) : (
                                                    <ChevronDown size={20} />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {expandedSection.accessPending && (
                                        <div className="space-y-3 border-l-4 border-amber-200 pl-6">
                                            {problem.accessPending.map(
                                                (user, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <Link
                                                                to={`/profile/${user.solverId._id}`}
                                                                className="flex items-center gap-3 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                                            >
                                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                                                    {user.solverId.username
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                </div>
                                                                <span>
                                                                    {
                                                                        user
                                                                            .solverId
                                                                            .username
                                                                    }
                                                                </span>
                                                            </Link>

                                                            {currentUser &&
                                                                currentUser._id.toString() ===
                                                                    problem.issuedBy._id.toString() && (
                                                                    <div className="flex gap-2">
                                                                        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm">
                                                                            Block
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleAcceptRequest(
                                                                                    user
                                                                                        .solverId
                                                                                        ._id , problem._id
                                                                                )
                                                                            }
                                                                            className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm"
                                                                        >
                                                                            Accept
                                                                        </button>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>

                    {/* Problem Actions */}
                    <div className="p-8 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                        <div className="flex items-center flex-wrap gap-4">
                            {currentUser &&
                                problem.issuedBy &&
                                (problem.issuedBy &&
                                currentUser &&
                                currentUser._id.toString() ===
                                    problem.issuedBy._id.toString() ? null : problem.accessPending &&
                                  problem.accessPending.some(
                                      (entry) =>
                                          entry.solverId._id.toString() ===
                                          currentUser._id.toString()
                                  ) ? (
                                    <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200">
                                        <Clock size={16} />
                                        <span className="font-medium">
                                            Request Pending
                                        </span>
                                    </div>
                                ) : problem.attempters &&
                                  problem.attempters.some(
                                      (entry) =>
                                          entry.userId._id.toString() ===
                                          currentUser._id.toString()
                                  ) ? (
                                    <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-md hover:shadow-lg">
                                        Submit Solution
                                    </button>
                                ) : (
                                    <button
                                        onClick={requestAccess}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
                                    >
                                        Request Access
                                    </button>
                                ))}

                            <button
                                onClick={handleCopy}
                                className="flex text-black items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-white hover:border-blue-300 transition-all font-medium shadow-sm hover:shadow-md"
                            >
                                <Share2 size={16} />
                                {copyLink}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

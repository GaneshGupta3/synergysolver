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
    const [copyLink, setCopyLink] = useState("copy link");
    const { problemId } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const dispatch = useDispatch();

    const location = useLocation();
    const currentURL = `${window.location.origin}${location.pathname}${location.search}`;

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
                // Optionally, you can update the UI or state here
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
            navigator.clipboard.writeText(window.location.href); // Or your custom link
            setCopyLink("Copied!");
            setTimeout(() => {
                setCopyLink("Copy Link");
            }, 2000); // Reset message after 2 seconds
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

                console.log(problemData);

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
                console.log(response.data.data.user);
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

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "bg-green-500";
            case "Medium":
                return "bg-yellow-500";
            case "Hard":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };

    return (
        <div className="bg-white text-black rounded-lg shadow-md overflow-hidden border border-gray-200">
            {/* Problem Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {problem.problemStatement}
                    </h1>
                    <div
                        className={`${getDifficultyColor(
                            problem.difficulty
                        )} text-white px-3 py-1 rounded-full text-sm font-medium`}
                    >
                        {problem.difficulty}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600">
                    {problem.deadline && problem.deadline !== 0 && (
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span
                                className={
                                    timeRemaining === "Deadline passed"
                                        ? "text-red-500"
                                        : ""
                                }
                            >
                                {timeRemaining || formatDate(problem.deadline)}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-1">
                        <User size={16} />
                        <Link to={`/profile/${problem.issuedBy?._id}`}>
                            <span>
                                Issued by:{" "}
                                {problem.issuedBy?.username || "User"}
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>Posted: {formatDate(problem.issuedAt)}</span>
                    </div>

                    {problem.solved ? (
                        <div className="flex items-center gap-1 text-green-500">
                            <Check size={16} />
                            <span>Solved</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 text-yellow-500">
                            <AlertTriangle size={16} />
                            <span>Unsolved</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Problem Content */}
            <div className="p-6">
                {/* Tags */}
                {!problem.tags && <div>none</div>}
                {problem.tags && problem.tags.length > 0 && (
                    <div className="mb-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                            <Tag size={18} />
                            <span>Tags</span>
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {problem.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Github Link */}
                {problem.githubLink && (
                    <div className="mb-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                            <Github size={18} />
                            <span>GitHub Repository</span>
                        </h3>
                        <a
                            href={problem.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                            {problem.githubLink}
                        </a>
                    </div>
                )}

                {/* Goodies */}
                {problem.goodies && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Rewards</h3>
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
                            {problem.goodies}
                        </div>
                    </div>
                )}

                {/* Attempters */}
                {problem.attempters && problem.attempters.length > 0 && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                                <Users size={18} />
                                <span>
                                    Attempters ({problem.attempters.length})
                                </span>
                            </h3>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                                {isExpanded ? "Show Less" : "Show All"}
                            </button>
                        </div>

                        <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
                            {(isExpanded
                                ? problem.attempters
                                : problem.attempters.slice(0, 3)
                            ).map((attempter, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-white"
                                >
                                    <span>
                                        {attempter.userId?.username ||
                                            `User ${index + 1}`}
                                    </span>
                                    {attempter.solved ? (
                                        <span className="flex items-center gap-1 text-green-500">
                                            <Check size={16} />
                                            <span>Solved</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-red-500">
                                            <X size={16} />
                                            <span>Not Solved</span>
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {!isExpanded && problem.attempters.length > 3 && (
                            <div className="text-center text-gray-500 text-sm mt-2">
                                +{problem.attempters.length - 3} more attempters
                            </div>
                        )}
                    </div>
                )}

                {/* Access Pending */}
                {problem.accessPending && problem.accessPending.length > 0 && (
                    <div className="mb-6">
                        <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                            <AlertTriangle size={18} />
                            <span>
                                Access Requests ({problem.accessPending.length})
                            </span>
                        </h3>
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                            <p className="text-gray-700">
                                {problem.accessPending.length} user
                                {problem.accessPending.length !== 1
                                    ? "s"
                                    : ""}{" "}
                                waiting for access approval
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Problem Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-3">
                    {currentUser &&
                        (currentUser._id.toString() ===
                        problem.issuedBy._id.toString() ? null : problem.accessPending.some(
                              (entry) =>
                                  entry.solverId.toString() ===
                                  currentUser._id.toString()
                          ) ? (
                            <span className="text-yellow-500">
                                Request Pending
                            </span>
                        ) : problem.attempters.some(
                              (entry) =>
                                  entry.userId.toString() ===
                                  currentUser._id.toString()
                          ) ? (
                            <span className="text-green-600">
                                Submit Solution
                            </span>
                        ) : (
                            <button
                                onClick={requestAccess}
                                className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Request Access
                            </button>
                        ))}

                    <button
                        onClick={handleCopy}
                        className="px-4 py-2 cursor-pointer border border-gray-300 rounded-md flex justify-center items-center gap-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        {copyLink}
                        <CiLink />
                    </button>
                </div>
            </div>
        </div>
    );
}

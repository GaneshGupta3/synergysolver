import axios from "axios";
import {
    AlertTriangle,
    ChevronDown,
    ChevronUp,
    Users
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { authSliceActions } from "../store/authSlice";
import Attempters from "./attempters";
import GithubLink from "./GithubLink";
import Goodies from "./Goodies";
import ProblemActions from "./ProblemActions";
import ProblemDescription from "./ProblemDescription";
import ProblemHeader from "./ProblemHeader";
import RequestCards from "./RequestCards";

// Problem Display Component
export default function ProblemDetails() {
    const [timeRemaining, setTimeRemaining] = useState("");
    const [problem, setProblem] = useState({});
    const [copyLink, setCopyLink] = useState("Copy Link");
    const { problemId } = useParams();
    const [currentUser, setCurrentUser] = useState(null);
    const proposedSolution = useRef(null);
    const [expandedSection, setExpandedSection] = useState({
        attempters: false,
        accessPending: false,
        requestAccess: false,
    });
    const [expandedApproaches, setExpandedApproaches] = useState({});

    const toggleApproachVisibility = (approachId) => {
        setExpandedApproaches((prev) => ({
            ...prev,
            [approachId]: !prev[approachId],
        }));
    };

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

    const toggleExpandedRequestAccess = () => {
        setExpandedSection((prev) => ({
            ...prev,
            requestAccess: !expandedSection.requestAccess,
        }));
    };

    const handleAcceptRequest = async (solverId, problemId) => {
        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/problem/acceptRequest/${problemId}`,
                { attempterId: solverId },
                { withCredentials: true }
            );
            console.log(response.data);
            setProblem(response.data.data.problem);
        } catch (error) {
            console.error("Error accepting request:", error);
            toast.error("Failed to accept request");
        }
    };

    const handleRejectRequest = async (solverId , problemId) => {
        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/problem/rejectRequest/${problemId}`,
                { attempterId: solverId },
                { withCredentials: true }
            );
            console.log(response.data);
            setProblem(response.data.problem);
        } catch (error) {
            console.error("Error rejecting request:", error);
            toast.error("Failed to reject request");
        }
    };

    const requestAccess = async () => {
        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/problem/attemptProblem/${problemId}`,
                { proposedSolution: proposedSolution.current.value },
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

    const calculateSkillsMatched = (requesterSkills) => {
        requesterSkills.filter((skill) => problem.tags.include(skill));
        return requesterSkills.length;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                    {/* Problem Header */}
                    <ProblemHeader
                        formatDate={formatDate}
                        problem={problem}
                        difficultyConfig={difficultyConfig}
                        timeRemaining={timeRemaining}
                    ></ProblemHeader>

                    {/* Problem Content */}
                    <div className="p-8 space-y-8">
                        {/* Tags */}
                        {problem.tags && problem.tags.length > 0 && (
                            <ProblemDescription
                                problem={problem}
                            ></ProblemDescription>
                        )}

                        {/* Github Link */}
                        {problem.githubLink && (
                            <GithubLink
                                githubLink={problem.githubLink}
                            ></GithubLink>
                        )}

                        {/* Goodies */}
                        {problem.goodies && (
                            <Goodies problem={problem}></Goodies>
                        )}

                        {/* Attempters */}
                        {problem.attempters &&
                            problem.attempters.length > 0 && (
                                <div className="bg-purple-50/50 border cursor-pointer border-purple-100 rounded-xl p-6">
                                    <div
                                        onClick={toggleExpandedAttempters}
                                        className="flex items-center justify-between mb-4"
                                    >
                                        <h3 className="flex items-center  gap-3 text-xl font-bold text-gray-800">
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
                                        <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors">
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

                                    <Attempters
                                        problem={problem}
                                        expandedSection={expandedSection}
                                    ></Attempters>
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
                                        <span>
                                            Access Requests (
                                            {problem.accessPending.length})
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
                                        <div className="space-y-4">
                                            {/* Section Header */}
                                            

                                            {/* Request Cards */}
                                            <div className="space-y-4">
                                                {problem.accessPending.map(
                                                    (user, idx) => (
                                                        <RequestCards
                                                            toggleApproachVisibility={
                                                                toggleApproachVisibility
                                                            }
                                                            expandedApproaches={
                                                                expandedApproaches
                                                            }
                                                            handleAcceptRequest={
                                                                handleAcceptRequest
                                                            }
                                                            handleRejectRequest={
                                                                handleRejectRequest
                                                            }
                                                            key={idx}
                                                            user={user}
                                                            idx={idx}
                                                            currentUser={
                                                                currentUser
                                                            }
                                                            problem={problem}
                                                        ></RequestCards>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>

                    {/* Problem Actions */}
                    <ProblemActions
                        requestAccess={requestAccess}
                        proposedSolution={proposedSolution}
                        toggleExpandedRequestAccess={
                            toggleExpandedRequestAccess
                        }
                        problem={problem}
                        copyLink={copyLink}
                        handleCopy={handleCopy}
                        currentUser={currentUser}
                        expandedSection={expandedSection}
                    ></ProblemActions>
                </div>
            </div>
        </div>
    );
}

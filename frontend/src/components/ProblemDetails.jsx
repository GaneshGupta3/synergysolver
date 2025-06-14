import axios from "axios";
import { AlertTriangle, ChevronDown, ChevronUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Attempters from "./Attempters";
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
    const solutionText = useRef(null);
    const [solutionVideoUrl, setSolutionVideoUrl] = useState(null);
    const [expandedSection, setExpandedSection] = useState({
        attempters: false,
        accessPending: false,
        requestAccess: false,
        submitSolution: false,
    });
    const [loading, setLoading] = useState(true);

    const toggleSection = (sectionName) => {
        setExpandedSection((prev) => ({
            ...prev,
            [sectionName]: !prev[sectionName],
        }));
    };

    const toggleApproachVisibility = (approachId) => {
        setExpandedApproaches((prev) => ({
            ...prev,
            [approachId]: !prev[approachId],
        }));
    };

    const [expandedApproaches, setExpandedApproaches] = useState({});

    const location = useLocation();
    const currentURL = `${window.location.origin}${location.pathname}${location.search}`;

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

    const handleRejectRequest = async (solverId, problemId) => {
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

    const handleSubmitSolution = async () => {
        try {
            const response = await axios.post(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/problem/submitSolution/${problemId}`,
                {
                    solutionText: solutionText.current.value,
                    solutionVideoUrl: solutionVideoUrl,
                },
                { withCredentials: true }
            );
            if (response.data.success) {
                toast.success("solution submitted successfully");
            }
            console.log(response);
            setProblem(response.data.problem);
            setCurrentUser(response.data.user);
        } catch (error) {
            toast.error("can't submit solution, try again!");
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
                setCurrentUser(response.data.data.user);
                return () => clearInterval(interval);
            } catch (error) {
                console.error("Error fetching problem:", error);
                toast.error("Error fetching problem details");
            }
        };

        fetchProblem();
        setLoading(false);
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
                    textColor: "text-green-300",
                    bgColor: "bg-green-900/20",
                    borderColor: "border-green-500/30",
                    icon: "🟢",
                };
            case "Medium":
                return {
                    color: "bg-gradient-to-r from-yellow-400 to-orange-400",
                    textColor: "text-orange-300",
                    bgColor: "bg-orange-900/20",
                    borderColor: "border-orange-500/30",
                    icon: "🟡",
                };
            case "Hard":
                return {
                    color: "bg-gradient-to-r from-red-400 to-red-500",
                    textColor: "text-red-300",
                    bgColor: "bg-red-900/20",
                    borderColor: "border-red-500/30",
                    icon: "🔴",
                };
            default:
                return {
                    color: "bg-gradient-to-r from-gray-400 to-gray-500",
                    textColor: "text-gray-300",
                    bgColor: "bg-gray-700/20",
                    borderColor: "border-gray-500/30",
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
        <>
            {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-600 border-t-purple-500 mb-6 shadow-lg"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl animate-pulse"></div>
                    </div>
                    <div className="text-slate-300 text-xl font-medium">
                        Loading amazing problems...
                    </div>
                    <div className="text-slate-400 text-sm mt-2">
                        Preparing your coding adventure ⚡
                    </div>
                </div>
            ) : (
                <div className="min-h-screen bg-slate-800 pt-[120px] p-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-slate-700/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-600/50 overflow-hidden">
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
                                        <div className="bg-slate-600/40 border cursor-pointer border-slate-500/50 rounded-xl p-6 hover:bg-slate-600/50 transition-colors">
                                            <div
                                                onClick={() =>
                                                    toggleSection("attempters")
                                                }
                                                className="flex items-center justify-between mb-4"
                                            >
                                                <h3 className="flex items-center  gap-3 text-xl font-bold text-slate-100">
                                                    <div className="p-2 bg-purple-600/20 rounded-lg border border-purple-500/30">
                                                        <Users
                                                            size={20}
                                                            className="text-purple-300"
                                                        />
                                                    </div>
                                                    <span>
                                                        Participants (
                                                        {
                                                            problem.attempters
                                                                .length
                                                        }
                                                        )
                                                    </span>
                                                </h3>
                                                <button className="flex items-center gap-2 text-purple-300 hover:text-purple-200 font-medium transition-colors">
                                                    {expandedSection.attempters ? (
                                                        <>
                                                            Show Less{" "}
                                                            <ChevronUp
                                                                size={16}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            Show All{" "}
                                                            <ChevronDown
                                                                size={16}
                                                            />
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            <Attempters
                                                problem={problem}
                                                expandedSection={
                                                    expandedSection
                                                }
                                            ></Attempters>
                                        </div>
                                )}

                                {/* Access Pending */}
                                {problem.accessPending &&
                                    problem.accessPending.length > 0 && (
                                        <div className="bg-slate-600/40 border border-slate-500/50 rounded-xl p-6">
                                            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-slate-100">
                                                <div className="p-2 bg-amber-600/20 rounded-lg border border-amber-500/30">
                                                    <AlertTriangle
                                                        size={20}
                                                        className="text-amber-300"
                                                    />
                                                </div>
                                                <span>
                                                    Access Requests (
                                                    {
                                                        problem.accessPending
                                                            .length
                                                    }
                                                    )
                                                </span>
                                            </h3>

                                            <div
                                                onClick={() =>
                                                    toggleSection(
                                                        "accessPending"
                                                    )
                                                }
                                                className="group p-5 bg-slate-700/50 border border-slate-500/50 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-amber-500/50 hover:bg-slate-700/70 mb-4"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                                                        <p className="text-slate-200 font-medium">
                                                            <span className="text-amber-300 font-bold">
                                                                {
                                                                    problem
                                                                        .accessPending
                                                                        .length
                                                                }
                                                            </span>{" "}
                                                            user
                                                            {problem
                                                                .accessPending
                                                                .length !== 1
                                                                ? "s"
                                                                : ""}{" "}
                                                            waiting for access
                                                            approval
                                                        </p>
                                                    </div>
                                                    <div className="text-amber-400 group-hover:text-amber-300 transition-colors">
                                                        {expandedSection.accessPending ? (
                                                            <ChevronUp
                                                                size={20}
                                                            />
                                                        ) : (
                                                            <ChevronDown
                                                                size={20}
                                                            />
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
                                                                    problem={
                                                                        problem
                                                                    }
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
                                toggleSection={toggleSection}
                                problem={problem}
                                copyLink={copyLink}
                                handleCopy={handleCopy}
                                currentUser={currentUser}
                                expandedSection={expandedSection}
                                solutionText={solutionText}
                                setSolutionVideoUrl={setSolutionVideoUrl}
                                handleSubmitSolution={handleSubmitSolution}
                            ></ProblemActions>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

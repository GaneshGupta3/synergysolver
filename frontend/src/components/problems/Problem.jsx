import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { FiClock, FiUser, FiTag } from "react-icons/fi";

const Problem = ({ problem }) => {
    const [timeRemaining, setTimeRemaining] = React.useState("");
    const updateTimeRemaining = () => {
        const now = new Date();
        const deadline = new Date(problem.deadline);
        const diffTime = deadline - now;

        if (diffTime <= 0) {
            setTimeRemaining("Deadline passed");
            return;
        }

        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

        setTimeRemaining(`${days}d ${hours}h ${minutes}m remaining`);
    };

    useEffect(() => {
        updateTimeRemaining();
        const interval = setInterval(updateTimeRemaining, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [problem.deadline]);


    const getDifficultyConfig = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return {
                    color: "bg-gradient-to-r from-green-400 to-green-500",
                    textColor: "text-green-700",
                    bgColor: "bg-green-50",
                    icon: "🟢",
                };
            case "Medium":
                return {
                    color: "bg-gradient-to-r from-yellow-400 to-orange-400",
                    textColor: "text-orange-700",
                    bgColor: "bg-orange-50",
                    icon: "🟡",
                };
            case "Hard":
                return {
                    color: "bg-gradient-to-r from-red-400 to-red-500",
                    textColor: "text-red-700",
                    bgColor: "bg-red-50",
                    icon: "🔴",
                };
            default:
                return {
                    color: "bg-gradient-to-r from-gray-400 to-gray-500",
                    textColor: "text-gray-700",
                    bgColor: "bg-gray-50",
                    icon: "⚪",
                };
        }
    };

    const difficultyConfig = getDifficultyConfig(problem.difficulty);

    return (
        <Link
            to={`/problemDetails/${problem._id}`}
            className="group block cursor-pointer bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border border-gray-200/50 hover:border-blue-200"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {problem.problemStatement}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <FiUser size={14} />
                            <span>
                                By {problem.issuedBy?.username || "Anonymous"}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FiClock size={14} />
                            <span>{timeRemaining}</span>
                        </div>
                    </div>
                </div>

                <div
                    className={`${difficultyConfig.bgColor} ${difficultyConfig.textColor} px-3 py-1.5 rounded-full text-sm font-semibold border border-current/20 flex items-center gap-1`}
                >
                    <span>{difficultyConfig.icon}</span>
                    {problem.difficulty}
                </div>
            </div>

            {/* Tags Section */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <FiTag size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">
                        Technologies
                    </span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag, idx) => (
                        <span
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm hover:shadow-md transition-shadow"
                            key={idx}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>
                        💡 {problem.accessPending.length} Request Pending
                    </span>
                    <span>👥 {problem.attempters.length} solvers</span>
                    <span>⭐ 4.8 rating</span>
                </div>
                <div className="text-blue-600 font-medium text-sm group-hover:text-blue-700">
                    View Details →
                </div>
            </div>
        </Link>
    );
};

export default Problem;

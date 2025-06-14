import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { FiClock, FiUser, FiTag, FiArrowRight } from "react-icons/fi";

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
            className="group block cursor-pointer relative overflow-hidden"
        >
            {/* Background with subtle animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-800/40 backdrop-blur-sm rounded-2xl transition-all duration-500 group-hover:from-slate-700/50 group-hover:via-slate-600/40 group-hover:to-slate-700/50"></div>
            
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border border-gray-700/50 group-hover:border-blue-400/30 transition-all duration-300"></div>
            
            {/* Floating elements */}
            <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative p-6 transform transition-all duration-300 group-hover:scale-[1.02]">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 pr-4">
                        <h2 className="text-2xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors line-clamp-2 leading-tight">
                            {problem.problemStatement}
                        </h2>
                        <div className="flex items-center gap-3 text-sm">
                            <Link
                                to={`/profile/${problem.issuedBy?._id}`}
                                className="flex items-center bg-slate-600/40 hover:bg-slate-600/60 backdrop-blur-sm p-2 rounded-lg gap-2 transition-all duration-300 group/profile"
                            >
                                {problem.issuedBy?.profilePic.length > 0 ? (
                                    <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-white/20 group-hover/profile:ring-blue-400/40 transition-all duration-300">
                                        <img src={problem.issuedBy.profilePic} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                        <FiUser size={12} className="text-white" />
                                    </div>
                                )}
                                <span className="text-white/80 font-medium group-hover/profile:text-white transition-colors">
                                    {problem.issuedBy?.username || "Anonymous"}
                                </span>
                            </Link>
                            
                            <div className="flex bg-slate-600/40 backdrop-blur-sm p-2 rounded-lg items-center gap-2">
                                <div className="p-1 bg-blue-500/20 rounded-full">
                                    <FiClock className="text-blue-400" size={12} />
                                </div>
                                <span className="text-white/80 font-medium">
                                    {timeRemaining}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={`${difficultyConfig.bgColor} ${difficultyConfig.textColor} px-4 py-2 rounded-xl text-sm font-bold border-2 border-current/30 flex items-center gap-2 shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
                        <span className="text-base">{difficultyConfig.icon}</span>
                        <span>{problem.difficulty}</span>
                    </div>
                </div>

                {/* Tags Section */}
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 bg-purple-500/20 rounded-full">
                            <FiTag size={14} className="text-purple-400" />
                        </div>
                        <span className="text-sm font-semibold text-white/80 uppercase tracking-wide">
                            Technologies
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag, idx) => (
                            <span
                                className="relative bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/10"
                                key={idx}
                            >
                                <span className="relative z-10">{tag}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-600/30">
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-white/70 group-hover:text-white/90 transition-colors">
                            <span className="text-yellow-400 text-base">💡</span>
                            <span className="font-medium">{problem.accessPending.length}</span>
                            <span>Pending</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 group-hover:text-white/90 transition-colors">
                            <span className="text-green-400 text-base">👥</span>
                            <span className="font-medium">{problem.attempters.length}</span>
                            <span>Solvers</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white/70 group-hover:text-blue-400 font-semibold text-sm transition-all duration-300 group-hover:gap-3">
                        <span>View Details</span>
                        <FiArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Problem;
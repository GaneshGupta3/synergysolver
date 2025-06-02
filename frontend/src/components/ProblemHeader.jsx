import {
    AlertTriangle,
    Calendar,
    Check,
    Clock,
    Eye,
    User
} from "lucide-react";
import { Link } from "react-router-dom";

const ProblemHeader = ({problem , formatDate , difficultyConfig , timeRemaining , }) => {
    return (
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
                                <div className="font-medium">Deadline</div>
                                <div
                                    className={
                                        timeRemaining === "Deadline passed"
                                            ? "text-red-300"
                                            : "text-blue-100"
                                    }
                                >
                                    {timeRemaining ||
                                        formatDate(problem.deadline)}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <User size={16} />
                        <div>
                            <div className="font-medium">Created by</div>
                            <Link
                                to={`/profile/${problem.issuedBy?._id}`}
                                className="text-blue-200 hover:text-white transition-colors"
                            >
                                {problem.issuedBy?.username || "User"}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        <Calendar size={16} />
                        <div>
                            <div className="font-medium">Posted</div>
                            <div className="text-blue-100">
                                {formatDate(problem.issuedAt)}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                        {problem.solved ? (
                            <>
                                <Check size={16} className="text-green-300" />
                                <div>
                                    <div className="font-medium">Status</div>
                                    <div className="text-green-300">Solved</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <AlertTriangle
                                    size={16}
                                    className="text-yellow-300"
                                />
                                <div>
                                    <div className="font-medium">Status</div>
                                    <div className="text-yellow-300">Open</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemHeader;

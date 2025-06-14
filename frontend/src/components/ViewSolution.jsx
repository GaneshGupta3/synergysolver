import { useState } from "react";
import { ChevronDown, ChevronUp, User, CheckCircle, XCircle, Play } from "lucide-react";

const ViewSolution = ({ problem }) => {
    const [expandedSection, setExpandedSection] = useState({
        viewSolutions: false
    });

    const toggleSection = (section) => {
        setExpandedSection(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    if (!problem.solutions || problem.solutions.length === 0) {
        return null;
    }

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center gap-3 text-xl font-bold text-slate-200">
                    <div className="p-2 bg-green-500/20 rounded-lg border border-green-400/30">
                        <CheckCircle size={20} className="text-green-400" />
                    </div>
                    <span>Solutions ({problem.solutions.length})</span>
                </h3>
                <button
                    onClick={() => toggleSection('viewSolutions')}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 hover:text-slate-200 rounded-lg border border-slate-600/40 hover:border-slate-500/60 transition-all duration-200 font-medium"
                >
                    {expandedSection.viewSolutions ? 'Hide All' : 'View All'}
                    {expandedSection.viewSolutions ? 
                        <ChevronUp size={16} /> : 
                        <ChevronDown size={16} />
                    }
                </button>
            </div>

            {expandedSection.viewSolutions && (
                <div className="space-y-4">
                    {problem.solutions.map((sol, idx) => (
                        <div 
                            key={sol._id || idx} 
                            className="bg-slate-700/30 border border-slate-600/40 rounded-lg p-4 backdrop-blur-sm"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-600/50 rounded-full">
                                        <User size={16} className="text-slate-300" />
                                    </div>
                                    <span className="font-medium text-slate-200">
                                        {sol.solverId.username}
                                    </span>
                                    <span className="text-slate-400 text-sm">
                                        ({sol.solverId.email})
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {sol.accepted ? (
                                        <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                                            <CheckCircle size={14} />
                                            Accepted
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-yellow-400 text-sm font-medium">
                                            <XCircle size={14} />
                                            Pending
                                        </span>
                                    )}
                                </div>
                            </div>

                            {sol.solutionText && (
                                <div className="mb-3">
                                    <h4 className="text-sm font-medium text-slate-300 mb-2">Solution Description:</h4>
                                    <p className="text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-600/30">
                                        {sol.solutionText}
                                    </p>
                                </div>
                            )}

                            {sol.solutionVideoUrl && (
                                <div>
                                    <h4 className="text-sm font-medium text-slate-300 mb-2">Solution Video:</h4>
                                    <a
                                        href={sol.solutionVideoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium hover:underline bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-600/40 hover:border-blue-400/50 transition-all duration-200"
                                    >
                                        <Play size={16} />
                                        Watch Solution Video
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewSolution;
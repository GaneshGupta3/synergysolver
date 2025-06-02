import {
    Clock,
    Send,
    Share2
} from "lucide-react";

const ProblemActions = ({problem,requestAccess, proposedSolution, toggleExpandedRequestAccess , copyLink , handleCopy , currentUser , expandedSection}) => {
    return (
        <div className="p-8 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
            <div className="flex items-start flex-wrap gap-4">
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
                            <span className="font-medium">Request Pending</span>
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
                        <div className="flex flex-col gap-4 w-full max-w-2xl">
                            <button
                                onClick={toggleExpandedRequestAccess}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
                            >
                                Request Access
                            </button>

                            {expandedSection.requestAccess && (
                                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                                        Describe Your Approach
                                    </h4>
                                    <p className="text-gray-600 text-sm mb-4">
                                        Please explain your proposed solution or
                                        approach to solving this problem. This
                                        helps the problem creator understand
                                        your methodology.
                                    </p>

                                    <div className="space-y-4">
                                        <textarea
                                            ref={proposedSolution}
                                            placeholder="Enter your approach, methodology, or proposed solution strategy..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-500 min-h-[120px] bg-gray-50"
                                            rows={5}
                                        />

                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={requestAccess}
                                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-medium shadow-md hover:shadow-lg"
                                            >
                                                <Send size={16} />
                                                Send Request
                                            </button>

                                            <button
                                                onClick={
                                                    toggleExpandedRequestAccess
                                                }
                                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-white hover:border-blue-300 transition-all font-medium shadow-sm hover:shadow-md text-gray-700"
                >
                    <Share2 size={16} />
                    {copyLink}
                </button>
            </div>
        </div>
    );
};

export default ProblemActions;

import { Link } from "react-router-dom";

const RequestCards = ({user, toggleApproachVisibility , problem , expandedApproaches , handleRejectRequest , handleAcceptRequest , currentUser}) => {
    return (
        <div
            
            className="group relative bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 ease-out"
        >
            {/* Gradient accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-t-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>

            {/* Main content */}
            <div className="flex items-start justify-between">
                {/* User info */}
                <Link
                    to={`/profile/${user.solverId._id}`}
                    className="flex items-center gap-4 text-gray-800 hover:text-blue-600 transition-colors group/link"
                >
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover/link:shadow-lg transition-shadow">
                            {user.solverId.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                        <span className="font-semibold text-lg group-hover/link:text-blue-600 transition-colors">
                            {user.solverId.username}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500">
                                Requested access
                            </span>
                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
                                Pending
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Action buttons - only for problem owner */}
                {currentUser &&
                    currentUser._id.toString() ===
                        problem.issuedBy._id.toString() && (
                        <div className="flex items-center gap-3">
                            <button onClick={() => {
                                console.log(user);
                                handleRejectRequest(user.solverId._id , problem._id);
                            }} className="group/btn flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:shadow-md transition-all duration-200 font-medium text-sm border border-red-200 hover:border-red-300">
                                <svg
                                    className="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                reject
                            </button>
                            <button
                                onClick={() =>
                                    handleAcceptRequest(
                                        user.solverId._id,
                                        problem._id
                                    )
                                }
                                className="group/btn flex items-center gap-2 px-5 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 hover:shadow-md transition-all duration-200 font-medium text-sm border border-green-200 hover:border-green-300"
                            >
                                <svg
                                    className="w-4 h-4 group-hover/btn:scale-110 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Accept
                            </button>
                        </div>
                    )}
            </div>

            {/* View approach button */}
            {(currentUser._id.toString() === user.solverId._id.toString() ||
                problem.issuedBy._id.toString() ===
                    currentUser._id.toString()) && (
                <div className="mt-6 border-t border-gray-100 pt-4">
                    <button
                        onClick={() =>
                            toggleApproachVisibility(user.solverId._id)
                        }
                        className="group/toggle flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                                expandedApproaches[user.solverId._id]
                                    ? "rotate-180"
                                    : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                        {expandedApproaches[user.solverId._id]
                            ? "Hide"
                            : "Proposed Solution"}
                    </button>
                </div>
            )}

            {/* Expanded approach */}
            {expandedApproaches[user.solverId._id] && (
                <div className="mt-4 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-800 mb-2">
                                    Proposed Solution
                                </h4>
                                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                    {user.proposedSolution}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestCards;

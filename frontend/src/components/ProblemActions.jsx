import { Clock, Send, Share2, Video, Upload } from "lucide-react";

const ProblemActions = ({
    problem,
    requestAccess,
    proposedSolution,
    copyLink,
    handleCopy,
    currentUser,
    expandedSection,
    toggleSection,
    solutionText,
    setSolutionVideoUrl,
    handleSubmitSolution,
}) => {
    const handleUploadVideo = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`
        ); // from Cloudinary
        formData.append(
            "cloud_name",
            `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`
        );
        formData.append("resource_type", "video");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_CLOUDINARY_VIDEO_UPLOAD_URL}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            console.log("Uploaded video URL:", data.secure_url);
            setSolutionVideoUrl(data.secure_url);

            // Optionally save this URL to state or database
        } catch (err) {
            console.error("Video upload failed", err);
        }
    };

    return (
        <div className="p-8 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 border-t border-gray-700">
            <div className="flex items-start flex-wrap gap-6">
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
                        <div className="flex items-center gap-3 text-amber-300 bg-gradient-to-r from-amber-900/50 to-yellow-900/50 px-6 py-3 rounded-xl border-2 border-amber-600/50 shadow-sm backdrop-blur-sm">
                            <Clock size={18} className="text-amber-400" />
                            <span className="font-semibold text-sm">
                                Request Pending
                            </span>
                        </div>
                    ) : problem.attempters &&
                      problem.attempters.some(
                          (entry) =>
                              entry.userId._id.toString() ===
                              currentUser._id.toString()
                      ) ? (
                        <>
                            {problem.solutions.some(
                                (sol) =>
                                    sol.solverId.toString() ===
                                    currentUser._id.toString()
                            ) ? (
                                <div>wait for confirmation</div>
                            ) : (
                                <>
                                    <button
                                        onClick={() =>
                                            toggleSection("submitSolution")
                                        }
                                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:via-green-600 hover:to-teal-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-emerald-400"
                                    >
                                        Start Submission
                                    </button>
                                    {expandedSection.submitSolution && (
                                        <div className="mt-6 bg-slate-800/90 rounded-2xl border-2 border-slate-600/50 p-8 shadow-xl backdrop-blur-sm w-full max-w-4xl">
                                            <div className="mb-6">
                                                <h4 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                    Submit Your Solution
                                                </h4>
                                                <p className="text-gray-300 text-base leading-relaxed">
                                                    Provide your comprehensive
                                                    solution to help the problem
                                                    creator evaluate your
                                                    approach and methodology.
                                                </p>
                                            </div>

                                            <div className="space-y-6">
                                                <div className="relative">
                                                    <textarea
                                                        ref={solutionText}
                                                        placeholder="Describe your solution in detail, including methodology, implementation steps, and expected outcomes..."
                                                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 resize-none text-gray-800 placeholder-gray-400 min-h-[160px] bg-gradient-to-br from-gray-50 to-white shadow-inner transition-all duration-200"
                                                        rows={6}
                                                    />
                                                </div>

                                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                                                    <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                        <Video
                                                            className="text-indigo-600"
                                                            size={20}
                                                        />
                                                        Video Demonstration
                                                    </h5>
                                                    <p className="text-gray-600 text-sm mb-4">
                                                        Upload a video to
                                                        demonstrate your
                                                        solution or explain your
                                                        approach visually.
                                                    </p>
                                                    <label className="relative cursor-pointer group">
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                            onChange={ async (e) =>await handleUploadVideo( e )}
                                                        />
                                                        <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg group-hover:transform group-hover:-translate-y-0.5">
                                                            <Upload size={18} />
                                                            Choose Video File
                                                        </div>
                                                    </label>
                                                </div>

                                                <div className="flex items-center gap-4 pt-4">
                                                    <button
                                                        onClick={(e) => {
                                                            handleSubmitSolution();
                                                        }}
                                                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-xl hover:from-blue-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-blue-500"
                                                    >
                                                        <Send size={20} />
                                                        Submit Solution
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            toggleSection(
                                                                "submitSolution"
                                                            )
                                                        }
                                                        className="px-8 py-4 border-2 border-gray-300 text-gray-50 rounded-xl hover:border-gray-400 transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col gap-6 w-full max-w-3xl">
                            <button
                                onClick={() => toggleSection("requestAccess")}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-blue-500"
                            >
                                Request Access
                            </button>

                            {expandedSection.requestAccess && (
                                <div className="bg-white rounded-2xl border-2 border-gray-100 p-8 shadow-xl backdrop-blur-sm">
                                    <div className="mb-6">
                                        <h4 className="text-2xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                            Describe Your Approach
                                        </h4>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            Explain your proposed solution
                                            strategy and methodology to help the
                                            problem creator understand your
                                            capabilities and approach.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="relative">
                                            <textarea
                                                ref={proposedSolution}
                                                placeholder="Detail your approach, methodology, tools you'll use, timeline, and expected outcomes..."
                                                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-400 resize-none text-gray-800 placeholder-gray-400 min-h-[160px] bg-gradient-to-br from-gray-50 to-white shadow-inner transition-all duration-200"
                                                rows={6}
                                            />
                                        </div>

                                        <div className="flex items-center gap-4 pt-4">
                                            <button
                                                onClick={requestAccess}
                                                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-emerald-400"
                                            >
                                                <Send size={18} />
                                                Send Request
                                            </button>

                                            <button
                                                onClick={() =>
                                                    toggleSection(
                                                        "requestAccess"
                                                    )
                                                }
                                                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold shadow-sm hover:shadow-md"
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
                    className="flex items-center gap-3 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300 font-medium text-gray-700 bg-white/80 backdrop-blur-sm"
                >
                    <Share2 size={18} />
                    {copyLink}
                </button>
            </div>
        </div>
    );
};

export default ProblemActions;

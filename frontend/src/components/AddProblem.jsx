import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProblem() {
    const [formData, setFormData] = useState({
        problemStatement: "",
        difficulty: "",
        tags: [],
        githubLink: "",
        goodies: "",
        deadline: "2025",
    });
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e) => {
        const tags = e.target.value.split(",").map((tag) => tag.trim());
        setFormData((prev) => ({ ...prev, tags }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!formData.problemStatement || !formData.difficulty || !formData.githubLink || !formData.deadline) {
            alert("Please fill in all required fields.");
            setSubmitting(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            console.log("Form submitted:", formData);
            alert("Problem submitted successfully!");
            setFormData({
                problemStatement: "",
                difficulty: "",
                tags: [],
                githubLink: "",
                goodies: "",
                deadline: "2025-04-15T23:59:00.000Z",
            });
            setSubmitting(false);
        }, 2000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-800 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400"></div>
                    <p className="text-gray-300">Authenticating...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-800 py-12 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-slate-600/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-700/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12 pt-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 mb-6">
                        <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            CREATE NEW CHALLENGE
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
                        Build Your Developer Skills
                    </h1>
                    <p className="text-gray-400 text-lg max-w-lg mx-auto">
                        Create industry-level problems that challenge developers and help build real-world experience
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                    <div className="p-8 sm:p-10">
                        <div className="space-y-8">
                            {/* Problem Statement */}
                            <div className="group">
                                <label
                                    htmlFor="problemStatement"
                                    className="block text-sm font-semibold text-gray-200 mb-3 group-focus-within:text-purple-400 transition-colors"
                                >
                                    Problem Statement *
                                </label>
                                <textarea
                                    id="problemStatement"
                                    name="problemStatement"
                                    rows="4"
                                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 resize-none"
                                    placeholder="Describe the coding challenge in detail..."
                                    value={formData.problemStatement}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Two column layout for medium+ screens */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Difficulty */}
                                <div className="group">
                                    <label
                                        htmlFor="difficulty"
                                        className="block text-sm font-semibold text-gray-200 mb-3 group-focus-within:text-purple-400 transition-colors"
                                    >
                                        Difficulty Level *
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="difficulty"
                                            name="difficulty"
                                            className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 appearance-none cursor-pointer"
                                            onChange={handleInputChange}
                                            value={formData.difficulty}
                                            required
                                        >
                                            <option value="" disabled className="bg-slate-800">
                                                Select difficulty
                                            </option>
                                            <option value="Easy" className="bg-slate-800">Easy</option>
                                            <option value="Medium" className="bg-slate-800">Medium</option>
                                            <option value="Hard" className="bg-slate-800">Hard</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Goodies */}
                                <div className="group">
                                    <label
                                        htmlFor="goodies"
                                        className="block text-sm font-semibold text-gray-200 mb-3 group-focus-within:text-purple-400 transition-colors"
                                    >
                                        Rewards & Goodies
                                    </label>
                                    <input
                                        type="text"
                                        id="goodies"
                                        name="goodies"
                                        className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                                        placeholder="Certificates, prizes, etc."
                                        value={formData.goodies}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="group">
                                <label
                                    htmlFor="tags"
                                    className="block text-sm font-semibold text-gray-200 mb-3 group-focus-within:text-purple-400 transition-colors"
                                >
                                    Technology Tags *
                                </label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                                    placeholder="React, Node.js, Python, Machine Learning..."
                                    onChange={handleTagsChange}
                                    required
                                />
                                <p className="text-gray-500 text-xs mt-2">Separate multiple tags with commas</p>
                            </div>

                            {/* GitHub Link */}
                            <div className="group">
                                <label
                                    htmlFor="githubLink"
                                    className="block text-sm font-semibold text-gray-200 mb-3 group-focus-within:text-purple-400 transition-colors"
                                >
                                    GitHub Repository *
                                </label>
                                <input
                                    type="url"
                                    id="githubLink"
                                    name="githubLink"
                                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                                    placeholder="https://github.com/username/repository"
                                    value={formData.githubLink}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Deadline */}
                            <div className="group">
                                <label
                                    htmlFor="deadline"
                                    className="block text-sm font-semibold text-gray-200 mb-3 group-focus-within:text-purple-400 transition-colors"
                                >
                                    Submission Deadline *
                                </label>
                                <input
                                    type="datetime-local"
                                    id="deadline"
                                    name="deadline"
                                    className="w-full rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                                    value={formData.deadline}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="button"
                                    className="flex-1 px-6 py-3 text-sm font-semibold text-gray-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-200"
                                    onClick={() => navigate("/problems")}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    onClick={handleSubmit}
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Create Problem
                                            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom decoration */}
                <div className="text-center mt-8">
                    <p className="text-gray-500 text-sm">
                        Help developers grow by creating meaningful challenges
                    </p>
                </div>
            </div>
        </div>
    );
}
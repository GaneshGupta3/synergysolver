import React, { useEffect, useState } from "react";
import axios from "axios";
import Problem from "./Problem";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../store/authSlice";
import DropDown from "./DropDown";
import { FaPlus, FaSearch, FaFilter, FaBrain } from "react-icons/fa";
import { Link } from "react-router-dom";

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const difficultyOptions = ["All", "Easy", "Medium", "Hard"];
    const topicOptions = [
        "All",
        "React",
        "JavaScript",
        "Python",
        "Algorithm",
        "Database",
    ];
    const statusOptions = ["All", "Solved", "Attempted", "Not Started"];
    const sortOptions = ["Newest", "Oldest", "Difficulty", "Most Popular"];

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_BASE_URL
                    }/api/problem/getAllProblems`,
                    { withCredentials: true }
                );
                console.log(response.data.data.problems);
                setProblems(response.data.data.problems);
            } catch (error) {
                console.error("Failed to fetch problems:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
    }, []);

    const filteredProblems = problems.filter(
        (problem) =>
            problem.problemStatement
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            problem.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

    return (
        <div className="min-h-screen bg-slate-800 pt-[120px] text-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            {/* Header */}
            <div className="sticky top-0 z-40 bg-slate-800 backdrop-blur-xl border-b border-slate-600/50 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                        {/* Title */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg">
                                    <FaBrain className="text-2xl text-white" />
                                </div>
                                <h1 className="text-5xl font-black text-white">
                                    Growth Arena
                                </h1>+
                            </div>
                            <p className="text-slate-300 text-lg font-medium ml-16">
                                Discover, solve, and master challenging problems ✨
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md group">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-purple-400 transition-colors duration-200" />
                            <input
                                type="text"
                                placeholder="Search problems or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-slate-600/80 border border-slate-500/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-lg backdrop-blur-sm hover:bg-slate-600/90"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-4 mt-8 p-6 bg-slate-700/60 rounded-2xl backdrop-blur-sm border border-slate-600/30">
                        <div className="flex items-center gap-3 text-slate-300">
                            <div className="p-2 bg-slate-600/50 rounded-lg">
                                <FaFilter className="text-slate-400" />
                            </div>
                            <span className="font-semibold text-lg">Filters:</span>
                        </div>
                        <DropDown text="Difficulty" options={difficultyOptions} />
                        <DropDown text="Topic" options={topicOptions} />
                        <DropDown text="Status" options={statusOptions} />
                        <DropDown className="bg-amber-50" text="Sort By" options={sortOptions} />

                        {/* Results count */}
                        <div className="ml-auto text-sm text-slate-300 bg-slate-600/60 px-4 py-3 rounded-xl border border-slate-500/30 backdrop-blur-sm">
                            <span className="font-semibold text-purple-400">{filteredProblems.length}</span> problems found
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
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
                ) : filteredProblems.length > 0 ? (
                    <div className="grid gap-8">
                        {filteredProblems.map((problem, index) => (
                            <div 
                                key={problem._id} 
                                className="animate-fade-in-up"
                                style={{animationDelay: `${index * 100}ms`}}
                            >
                                <Problem problem={problem}   />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32">
                        <div className="relative inline-block mb-8">
                            <div className="text-8xl opacity-20">🔍</div>
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-2xl rounded-full"></div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-200 mb-4">
                            No problems found
                        </h3>
                        <p className="text-slate-400 text-lg">
                            Try adjusting your search or filters to discover more challenges
                        </p>
                    </div>
                )}
            </div>

            {/* Floating Add Button */}
            <Link
                to="/addproblem"
                className="fixed bottom-8 right-8 group cursor-pointer"
                title="Add new problem"
            >
                <div className="relative p-5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 ease-in-out transform hover:scale-110 hover:-translate-y-1">
                    <FaPlus className="text-xl group-hover:rotate-90 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                </div>
            </Link>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default Problems;
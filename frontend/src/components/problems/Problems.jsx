import React, { useEffect, useState } from "react";
import axios from "axios";
import Problem from "./Problem";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../store/authSlice";
import DropDown from "./DropDown";
import { FaPlus, FaSearch, FaFilter } from "react-icons/fa";
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
                await dispatch(authSliceActions.login(response.data.data.user));
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Title */}
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                🧠 Problem Arena
                            </h1>
                            <p className="text-gray-600">
                                Discover and solve challenging problems
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search problems or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 text-black bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-4 mt-6">
                        <div className="flex items-center gap-2 text-gray-700">
                            <FaFilter className="text-gray-500" />
                            <span className="font-medium">Filters:</span>
                        </div>
                        <DropDown
                            text="Difficulty"
                            options={difficultyOptions}
                        />
                        <DropDown text="Topic" options={topicOptions} />
                        <DropDown text="Status" options={statusOptions} />
                        <DropDown text="Sort By" options={sortOptions} />

                        {/* Results count */}
                        <div className="ml-auto text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                            {filteredProblems.length} problems found
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <div className="text-gray-600 text-lg">
                            Loading amazing problems...
                        </div>
                    </div>
                ) : filteredProblems.length > 0 ? (
                    <div className="grid gap-6">
                        {filteredProblems.map((problem) => (
                            <Problem key={problem._id} problem={problem} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No problems found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filters
                        </p>
                    </div>
                )}
            </div>

            {/* Floating Add Button */}
            <Link
                to="/addproblem"
                className="fixed bottom-8 right-8 group cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 z-50"
                title="Add new problem"
            >
                <FaPlus className="text-lg group-hover:rotate-90 transition-transform duration-300" />
            </Link>
        </div>
    );
};

export default Problems;

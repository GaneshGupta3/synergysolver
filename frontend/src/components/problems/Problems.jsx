import React, { useEffect, useState } from "react";
import axios from "axios";
import Problem from "./Problem";
import DropDown from "./DropDown.jsx";
import { FaPlus, FaSearch, FaBrain } from "react-icons/fa";
import { Link } from "react-router-dom";

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [difficulty, setDifficulty] = useState("All");
    const [tag, setTag] = useState("All");
    const [sort, setSort] = useState("Newest");

    const difficultyOptions = ["All", "Easy", "Medium", "Hard"];
    const topicOptions = ["All", "React", "JavaScript", "Python", "Algorithm", "Database"];
    const sortOptions = ["Newest", "Oldest", "Difficulty"];

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/problem/getAllProblems`,
                    {
                        params: {
                            page,
                            limit: 10,
                            search: searchTerm,
                            difficulty,
                            tag,
                            sort
                        },
                        withCredentials: true
                    }
                );

                setProblems(res.data.data.problems);
                setTotalPages(res.data.data.pagination.totalPages);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchProblems, 400);
        return () => clearTimeout(debounce);
    }, [page, searchTerm, difficulty, tag, sort]);

    useEffect(() => {
        setPage(1);
    }, [searchTerm, difficulty, tag, sort]);

    return (
        <div className="min-h-screen bg-slate-800 pt-[120px] text-white">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-800 border-b border-slate-600/50">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl">
                            <FaBrain className="text-2xl" />
                        </div>
                        <h1 className="text-5xl font-black">Growth Arena</h1>
                    </div>

                    {/* Search */}
                    <div className="relative w-full max-w-md">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input
                            type="text"
                            placeholder="Search problems or tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-600 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="max-w-7xl mx-auto px-6 pb-6 flex flex-wrap gap-4">
                    <DropDown text={`Difficulty: ${difficulty}`} options={difficultyOptions} onSelect={setDifficulty} />
                    <DropDown text={`Topic: ${tag}`} options={topicOptions} onSelect={setTag} />
                    <DropDown text={`Sort: ${sort}`} options={sortOptions} onSelect={setSort} />
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                {loading ? (
                    <div className="text-center py-32 text-slate-300">Loading problems...</div>
                ) : problems.length > 0 ? (
                    <>
                        <div className="grid gap-8">
                            {problems.map((problem) => (
                                <Problem key={problem._id} problem={problem} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-6 mt-12">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="px-4 py-2 bg-slate-600 rounded-lg disabled:opacity-40"
                            >
                                Prev
                            </button>

                            <span className="text-slate-300">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 bg-slate-600 rounded-lg disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-32 text-slate-400">No problems found</div>
                )}
            </div>

            {/* Floating Add Button */}
            <Link
                to="/addproblem"
                className="fixed bottom-8 right-8 p-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-xl hover:scale-110 transition"
            >
                <FaPlus className="text-xl" />
            </Link>
        </div>
    );
};

export default Problems;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Problem from "./Problem";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../../store/authSlice";
import DropDown from "./DropDown";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/problem/getAllProblems`,
                    { withCredentials: true }
                );
                await dispatch(authSliceActions.login(response.data.data.user));
                setProblems(response.data.data.problems);
                console.log(response.data.data.problem);
                console.log(response.data.data.user);
            } catch (error) {
                console.error("Failed to fetch problems:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
    }, []);

    return (
        <div className="flex flex-col items-center justify-start p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen overflow-y-auto scrollbar-hide max-h-[80vh]">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-sm tracking-wide">
                🧠 Problem List
            </h1>

            {/* The entire content area will be scrollable */}
            <div className="w-full bg-white/60 backdrop-blur-md shadow-xl rounded-2xl">
                <div className="p-6">
                    {/* Dropdown Filters - Now included in scrollable area */}
                    <div className="flex flex-wrap justify-center gap-4 border-b border-gray-300 pb-4 mb-6">
                        <DropDown text="Difficulty" />
                        <DropDown text="Topic" />
                        <DropDown text="Status" />
                        <DropDown text="Sort By" />
                    </div>

                    {/* Problems List */}
                    {loading ? (
                        <div className="text-center text-gray-600 text-lg animate-pulse">
                            Loading problems...
                        </div>
                    ) : problems.length > 0 ? (
                        <div className="px-5 space-y-6">
                            {problems.map((problem) => (
                                <div key={problem._id} className="mb-6">
                                    <Problem problem={problem} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 text-md">
                            No problems available.
                        </div>
                    )}
                </div>
            </div>

            {/* Floating Add Button - Outside the scrollable area */}
            <Link
                to="/addproblem"
                className="fixed bottom-6 right-6 cursor-pointer bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 z-10"
                title="Add new problem"
            >
                <FaPlus className="text-lg" />
            </Link>
        </div>
    );
};

/* Add this to your CSS or create a new style component */
const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = scrollbarHideStyles;
  document.head.appendChild(styleElement);
}

export default Problems;
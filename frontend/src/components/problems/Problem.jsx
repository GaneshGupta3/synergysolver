import { Link } from "react-router-dom";
import React from "react";

const Problem = ({ problem }) => {
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case "Easy":
                return "bg-green-500";
            case "Medium":
                return "bg-yellow-500";
            case "Hard":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };
    return (
        <Link
            to={`/problemDetails/${problem._id}`}
            className="text-black cursor-pointer flex flex-col items-start justify-center bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl p-6 mb-6 transition-transform hover:scale-[1.01] hover:shadow-3xl border border-gray-300"
        >
            <div className="flex items-center justify-between w-full mb-4">
                <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                    {problem.problemStatement}
                </h2>
                <div
                    className={`${getDifficultyColor(
                        problem.difficulty
                    )} py-1 px-3 text-white rounded-full text-sm font-medium`}
                >
                    {problem.difficulty}
                </div>
            </div>
            <p className="text-gray-800 font-medium mb-2">
                Problem Requirements:
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                {problem.tags.map((tag, idx) => (
                    <span
                        className="bg-gradient-to-r from-gray-600 to-gray-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                        key={idx}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    );
};

export default Problem;

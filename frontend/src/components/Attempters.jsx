import {
    Clock,
    Check,
} from "lucide-react";
import { Link } from "react-router-dom";

const Attempters = ({expandedSection , problem}) => {
    return (
        <>
            {expandedSection.attempters ? (
                <div className="space-y-3">
                    {(expandedSection.attempters
                        ? problem.attempters
                        : problem.attempters.slice(0, 3)
                    ).map((attempter, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white border border-purple-100 rounded-lg hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    {(
                                        attempter.userId?.username ||
                                        `User ${index + 1}`
                                    )
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                                <Link to={`/profile/${attempter.userId._id}`} className="font-medium text-gray-700">
                                    {attempter.userId?.username ||
                                        `User ${index + 1}`}
                                </Link>
                            </div>
                            {attempter.solved ? (
                                <span className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium">
                                    <Check size={16} />
                                    Solved
                                </span>
                            ) : (
                                <span className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full font-medium">
                                    <Clock size={16} />
                                    In Progress
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            ) : null}

            {!expandedSection.attempters && problem.attempters.length > 3 && (
                <div className="text-center text-purple-600 text-sm mt-4 font-medium">
                    +{problem.attempters.length - 3} more participants
                </div>
            )}
        </>
    );
};

export default Attempters;

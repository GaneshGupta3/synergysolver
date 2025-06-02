import {
    Tag,
} from "lucide-react";

const ProblemDescription = ({problem}) => {
    return (
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-gray-800">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Tag size={20} className="text-blue-600" />
                </div>
                <span>Technologies & Tags</span>
            </h3>
            <div className="flex flex-wrap gap-3">
                {problem.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProblemDescription;

import { Tag } from "lucide-react";

const ProblemDescription = ({problem}) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-slate-200">
                <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-400/30">
                    <Tag size={20} className="text-blue-400" />
                </div>
                <span>Technologies & Tags</span>
            </h3>
            <div className="flex flex-wrap gap-3">
                {problem.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-gradient-to-r from-blue-500/80 to-purple-600/80 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-purple-600 transition-all duration-200 backdrop-blur-sm border border-blue-400/20"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProblemDescription;
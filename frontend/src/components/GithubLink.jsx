import {
    Github,
} from "lucide-react";

const GithubLink = ({githubLink}) => {
    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-slate-200">
                <div className="p-2 bg-slate-700/50 rounded-lg border border-slate-600/30">
                    <Github size={20} className="text-slate-300" />
                </div>
                <span>Base Repository</span>
            </h3>
            <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium hover:underline bg-slate-700/30 hover:bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600/40 hover:border-blue-400/50 transition-all duration-200 backdrop-blur-sm"
            >
                <Github size={16} />
                View on GitHub
            </a>
        </div>
    );
};

export default GithubLink;
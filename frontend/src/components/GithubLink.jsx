import {
    Github,
} from "lucide-react";

const GithubLink = ({githubLink}) => {
    return (
        <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-6">
            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-gray-800">
                <div className="p-2 bg-gray-100 rounded-lg">
                    <Github size={20} className="text-gray-600" />
                </div>
                <span>Base Repository</span>
            </h3>
            <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium hover:underline bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-blue-300 transition-all"
            >
                <Github size={16} />
                View on GitHub
            </a>
        </div>
    );
};

export default GithubLink;

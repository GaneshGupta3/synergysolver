import { Briefcase } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

export default function ProjectsSection({ user, isOwner, removeProject, openModal }) {
    return (
        <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Briefcase /> Projects
            </h2>

            <div className="space-y-3 mt-4">
                {user.pastProjects.map((p, i) => (
                    <div key={i} className="bg-slate-700 p-3 rounded flex justify-between">
                        <a href={p.link} target="_blank" className="text-blue-400">
                            {p.title}
                        </a>
                        {isOwner && (
                            <RxCross2
                                onClick={() => removeProject(p)}
                                className="cursor-pointer text-red-400"
                            />
                        )}
                    </div>
                ))}
            </div>

            {isOwner && (
                <button
                    onClick={openModal}
                    className="mt-4 bg-green-600 px-4 py-2 rounded"
                >
                    Add Project
                </button>
            )}
        </section>
    );
}

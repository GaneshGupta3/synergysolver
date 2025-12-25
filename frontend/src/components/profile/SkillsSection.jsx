import { Code } from "lucide-react";
import { RxCross2 } from "react-icons/rx";

export default function SkillsSection({
    user,
    isOwner,
    addSkill,
    removeSkill,
    saveSkills,
    inputRef,
}) {
    return (
        <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Code /> Skills
            </h2>

            {isOwner && (
                <input
                    ref={inputRef}
                    placeholder="Add skill and press Enter"
                    className="w-full mt-2 bg-slate-700 px-3 py-2 rounded"
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                />
            )}

            <div className="flex flex-wrap gap-2 mt-3">
                {user.skills.map((skill) => (
                    <span
                        key={skill}
                        className="bg-blue-600/20 px-3 py-1 rounded-full flex items-center gap-1"
                    >
                        {skill}
                        {isOwner && (
                            <RxCross2
                                size={14}
                                onClick={() => removeSkill(skill)}
                                className="cursor-pointer"
                            />
                        )}
                    </span>
                ))}
            </div>

            {isOwner && (
                <button
                    onClick={saveSkills}
                    className="mt-3 bg-blue-600 px-4 py-2 rounded"
                >
                    Save
                </button>
            )}
        </section>
    );
}

export default function ProblemsTabs({ user, navigate }) {
    return (
        <>
            <h3 className="text-xl font-semibold mb-4">Solving Problems</h3>

            {user.solvingProblems.map((p) => (
                <div
                    key={p.problemId._id}
                    onClick={() => navigate(`/problemDetails/${p.problemId._id}`)}
                    className="bg-slate-700 p-4 rounded mb-3 cursor-pointer"
                >
                    {p.problemId.problemStatement}
                </div>
            ))}
        </>
    );
}

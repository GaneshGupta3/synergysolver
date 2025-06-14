import { Award } from "lucide-react";

const Goodies = ({problem}) => {
    return (
        <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-600/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-amber-200">
                <div className="p-2 bg-amber-500/20 rounded-lg border border-amber-400/30">
                    <Award size={20} className="text-amber-400" />
                </div>
                <span>Rewards & Incentives</span>
            </h3>
            <div className="bg-slate-800/60 p-4 rounded-lg border border-amber-500/30 text-amber-100 font-medium backdrop-blur-sm shadow-inner">
                {problem.goodies}
            </div>
        </div>
    );
};

export default Goodies;
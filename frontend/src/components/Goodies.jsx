import {
    Award
} from "lucide-react";

const Goodies = ({problem}) => {
    return (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="flex items-center gap-3 text-xl font-bold mb-4 text-orange-800">
                <div className="p-2 bg-yellow-100 rounded-lg">
                    <Award size={20} className="text-yellow-600" />
                </div>
                <span>Rewards & Incentives</span>
            </h3>
            <div className="bg-white/80 p-4 rounded-lg border border-yellow-200 text-orange-800 font-medium">
                {problem.goodies}
            </div>
        </div>
    );
};

export default Goodies;

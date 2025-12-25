import React from "react";
import { FaTrophy, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const users = [
    { username: "ganesh", solved: 42, score: 980, badge: "Gold" , id: '694812bfb79f73da9597a4ed' },
    { username: "abhinav", solved: 38, score: 910, badge: "Silver" , id : '69481312b79f73da9597a50c' },
    { username: "rohit", solved: 35, score: 880, badge: "Silver", id : "69482057774658a47d84abc8" },
    { username: "ananya", solved: 34, score: 860, badge: "Silver", id : "69482064774658a47d84abcc" },
    { username: "sneha", solved: 33, score: 845, badge: "Bronze", id : "6948206d774658a47d84abd0" },
    { username: "vikram", solved: 31, score: 820, badge: "Bronze", id : "69482073774658a47d84abd4" },
    { username: "harsh", solved: 30, score: 805, badge: "Bronze", id : "6948207d774658a47d84abd8" },
    { username: "mehul", solved: 29, score: 790, badge: "Bronze", id : "69482085774658a47d84abdc" },
    { username: "kavya", solved: 28, score: 770, badge: "Bronze", id : "6948208c774658a47d84abe0" },
    { username: "aditya", solved: 27, score: 755, badge: "Bronze", id : "6948209b774658a47d84abe5" },
    { username: "nidhi", solved: 26, score: 740, badge: "Bronze", id : "694820a2774658a47d84abe9" },
    { username: "arjun", solved: 25, score: 720, badge: "Bronze", id : "694820aa774658a47d84abed" },
    { username: "pooja", solved: 24, score: 705, badge: "Bronze", id : "694820b2774658a47d84abf1" },
    { username: "rahul", solved: 23, score: 690, badge: "Bronze", id : "694820d5774658a47d84abf5" },
    { username: "ishita", solved: 22, score: 675, badge: "Bronze", id : "694820db774658a47d84abf9" },
    { username: "mohit", solved: 21, score: 660, badge: "Bronze", id : "694820e5774658a47d84abfd" },
    { username: "deepak", solved: 20, score: 645, badge: "Bronze", id : "694820ec774658a47d84ac01" },
    { username: "neha", solved: 19, score: 630, badge: "Bronze", id : "694820f3774658a47d84ac05" },
    { username: "aman", solved: 18, score: 615, badge: "Bronze", id : "69482103774658a47d84ac09" },
    { username: "priya", solved: 17, score: 600, badge: "Bronze", id : "6948210d774658a47d84ac0d" }
];

// Sort users by score (descending)
const rankedUsers = [...users].sort((a, b) => b.score - a.score);

const badgeStyles = {
    Gold: "bg-yellow-500/20 text-yellow-400",
    Silver: "bg-slate-300/20 text-slate-200",
    Bronze: "bg-orange-500/20 text-orange-400"
};

const Rankings = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-slate-800 pt-[120px] text-white">
            {/* Header */}
            <div className="border-b border-slate-600/50">
                <div className="max-w-7xl mx-auto px-6 py-8 flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl">
                        <FaTrophy className="text-2xl" />
                    </div>
                    <h1 className="text-5xl font-black">Global Rankings(All Time)</h1>
                </div>
            </div>

            {/* Table */}
            <div className="max-w-5xl mx-auto px-6 py-16">
                <div className="bg-slate-700/60 border border-slate-600/50 rounded-3xl shadow-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-700 text-slate-300">
                                <th className="px-6 py-4 text-left">Rank</th>
                                <th className="px-6 py-4 text-left">User</th>
                                <th className="px-6 py-4 text-center">Solved</th>
                                <th className="px-6 py-4 text-center">Score</th>
                                <th className="px-6 py-4 text-center">Badge</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankedUsers.map((user, index) => (
                                <tr
                                    key={user.username}
                                    className="border-t border-slate-600/40 hover:bg-slate-600/40 transition"
                                    onClick={() => navigate(`/profile/${user.id}`)}
                                >
                                    {/* Rank */}
                                    <td className="px-6 py-5 font-bold text-lg">
                                        #{index + 1}
                                    </td>

                                    {/* Username */}
                                    <td className="px-6 py-5 flex items-center gap-3">
                                        <FaUserCircle className="text-2xl text-slate-400" />
                                        <span className="font-semibold">
                                            @{user.username}
                                        </span>
                                    </td>

                                    {/* Solved */}
                                    <td className="px-6 py-5 text-center">
                                        {user.solved}
                                    </td>

                                    {/* Score */}
                                    <td className="px-6 py-5 text-center font-bold text-purple-400">
                                        {user.score}
                                    </td>

                                    {/* Badge */}
                                    <td className="px-6 py-5 text-center">
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeStyles[user.badge]}`}
                                        >
                                            {user.badge}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="text-center mt-10 text-slate-400">
                    Rankings are calculated based on total score.
                </p>
            </div>
        </div>
    );
};

export default Rankings;

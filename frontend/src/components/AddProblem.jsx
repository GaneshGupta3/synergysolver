import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authSliceActions } from "../store/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProblem() {
    const [formData, setFormData] = useState({
        problemStatement: "",
        difficulty: "",
        tags: [],
        githubLink: "",
        goodies: "",
        deadline: "2025",
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const authenticateUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/user/check-auth`,
                    { withCredentials: true }
                );
                dispatch(authSliceActions.login(response.data));
                console.log(response.data);
            } catch (error) {
                console.error(
                    "You are not authorized to access this page",
                    error
                );
                toast.error("You are not authorized to access this page.");
            } finally {
                setLoading(false);
            }
        };
        authenticateUser();
    }, []);

    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e) => {
        const tags = e.target.value.split(",").map((tag) => tag.trim());
        setFormData((prev) => ({ ...prev, tags }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!formData.problemStatement || !formData.difficulty || !formData.githubLink || !formData.deadline) {
            toast.error("Please fill in all required fields.");
            setSubmitting(false);
            return;
        }

        // Ensure deadline is properly formatted
        const formattedData = {
            ...formData,
            deadline: new Date(formData.deadline).toISOString(), // <-- Fix here
        };

        console.log("Form submitted:", formattedData);

        await axios
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/api/problem/issueProblem`,
                formattedData,
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                console.log("Problem submitted successfully:", response.data);
                toast.success("Problem submitted successfully!");
                navigate("/problems");
                setFormData({
                    problemStatement: "",
                    difficulty: "",
                    tags: [],
                    githubLink: "",
                    goodies: "",
                    deadline: "2025-04-15T23:59:00.000Z",
                });
            })
            .catch((error) => {
                console.error("Error submitting problem:", error);
                toast.error("Error submitting problem. Please try again.");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="text-black min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8 w-full">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
                            New Problem
                        </div>
                        <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
                            Coding Problem Details
                        </h1>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="problemStatement"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Problem Statement
                                </label>
                                <textarea
                                    id="problemStatement"
                                    name="problemStatement"
                                    rows="3"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    placeholder={"Check for cycle in a graph"}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="difficulty"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Difficulty
                                </label>
                                <select
                                    id="difficulty"
                                    name="difficulty"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    onChange={handleInputChange}
                                    value={formData.difficulty}
                                    required
                                >
                                    <option value="" disabled>
                                        Select difficulty
                                    </option>
                                    <option value="Easy">Easy</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Hard">Hard</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="tags"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tags (comma separated)
                                </label>
                                <input
                                    type="text"
                                    id="tags"
                                    name="tags"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    placeholder={"Graph," + "DFS"}
                                    onChange={handleTagsChange}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="githubLink"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    GitHub Link
                                </label>
                                <input
                                    type="url"
                                    id="githubLink"
                                    name="githubLink"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    placeholder={
                                        "https://github.com/example/graph-cycle"
                                    }
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="goodies"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Goodies
                                </label>
                                <input
                                    type="text"
                                    id="goodies"
                                    name="goodies"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    placeholder={"Certificate"}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="deadline"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Deadline
                                </label>
                                <input
                                    type="datetime-local"
                                    id="deadline"
                                    name="deadline"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                                    placeholder={formData.deadline.slice(0, 16)}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <button
                                    type="button"
                                    className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {submitting
                                        ? "submiting..."
                                        : "Submit Problem"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

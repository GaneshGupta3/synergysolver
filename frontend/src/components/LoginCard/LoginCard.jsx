import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authSliceActions } from "../../store/authSlice";
import StyledButton from "../StyledButton/StyledButton";
import { toast } from "react-toastify";
import { IoEye, IoEyeOff } from "react-icons/io5";

function LoginCard() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);

    // 🔹 Function to check if user has valid cookies
    const checkUserSession = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/user/check-auth`,
                {
                    withCredentials: true, // Ensure cookies are sent
                }
            );

            if (response.status === 200) {
                toast.success("already logged in"); // Notify user
                console.log(response.data)
                dispatch(authSliceActions.login(response.data)); // Save user data in Redux
                navigate("/dashboard"); // Redirect to dashboard page
            }
        } catch (error) {
            console.log("User not logged in or invalid session.");
        }
    };

    useEffect(() => {
        checkUserSession(); // Check if user is already authenticated
    }, []);

    // 🔹 Function to handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = {
                email: email.current.value,
                password: password.current.value,
            };

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
                user,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                dispatch(authSliceActions.login(response.data.user)); // Save user in Redux
                toast.success("Login successful"); // Notify user
                navigate("/dashboard"); // Redirect after login
            }
            else{
                toast.error("Login failed"); // Notify user of failure
                console.error("Login failed:", response.data.error); // Log error
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.error || "Something went wrong"; // Access the error message directly
            toast.error(errorMessage);
            console.error("Login failed:", errorMessage);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(to bottom right, #2d3748, #1a202c)'}}>
            <div className="w-full max-w-md px-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
                    <div className="text-center mb-8">
                        <p className="text-3xl font-bold text-white mb-2">Login</p>
                        <p className="text-white/70">Welcome back! Please sign in to continue</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                            <input
                                type="text"
                                placeholder="Email"
                                ref={email}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    ref={password}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white/60 hover:text-white transition-colors">
                                    {!showPassword ? (
                                        <IoEye
                                            size={20}
                                            onClick={() => setShowPassword(true)}
                                        />
                                    ) : (
                                        <IoEyeOff
                                            size={20}
                                            onClick={() => setShowPassword(false)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <StyledButton
                            displayText="Login"
                            executeFunction={handleLogin}
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-white/70">
                            Don't have an account?{" "}
                            <Link
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                                to="/signup"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginCard;
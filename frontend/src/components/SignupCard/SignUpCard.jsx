import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authSliceActions } from "../../store/authSlice.js";
import StyledButton from "../StyledButton/StyledButton.jsx";

const SignUpCard = () => {
    const username = useRef();
    const email = useRef();
    const role = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const checkUserSession = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/user/check-auth`,
                {
                    withCredentials: true, // Ensure cookies are sent
                }
            );

            if (response.status === 200) {
                console.log("User already logged in:", response.data);
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

    const validateGmail = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log("signup button clicked");
        setIsSigningUp(true);
        // Validate input fields
        if (
            !username.current.value ||
            !email.current.value ||
            !password.current.value
        ) {
            toast.error("Enter all details", {
                position: "top-right",
                autoClose: 3000,
            });
            setIsSigningUp(false);
            return; // Prevent further execution
        }

        if (!validateGmail(email.current.value)) {
            toast.error("enter validate gmail");
            setIsSigningUp(false);
            return;
        }

        const registrationDetails = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
                registrationDetails,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.status === 200) {
                toast.success("Registration successful!", {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate("/login");
            } else {
                toast.error(res.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(
                error.response?.data?.message || "Something went wrong!",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
        } finally {
            setIsSigningUp(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #2d3748, #1a202c)' }}>
            <div className="w-full max-w-md px-6">
                <div className="bg-white/10 mt-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
                    <div className="text-center mb-8">
                        <p className="text-3xl font-bold text-white mb-2">Register</p>
                        <p className="text-white/70">Join us today and get started</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                ref={username}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                ref={email}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                Role
                            </label>
                            <select
                                ref={role}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                            >
                                <option value="" className="text-black">
                                    Select Role
                                </option>
                                <option value="user" className="text-black">
                                    Student
                                </option>
                                <option value="industry-expert" className="text-black">
                                    Industry expert
                                </option>
                            </select>
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
                            displayText={isSigningUp ? "loading" : "Sign up"}
                            executeFunction={handleSignUp}
                            disabled={isSigningUp}
                        />
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-white/70">
                            Already have an account?{" "}
                            <Link
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpCard;
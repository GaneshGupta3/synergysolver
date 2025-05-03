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
        <div className="w-screen h-[600px] flex justify-center items-center">
            <div className="bg-black/5 backdrop-blur-lg p-8 rounded-xl w-[400px] h-[400px] shadow-md text-black flex flex-col justify-evenly items-center">
                <p className="text-2xl font-bold mb-2">Login</p>

                <input
                    type="text"
                    placeholder="Email"
                    ref={email}
                    required
                    className="w-full p-3 text-base border-b-2 border-black rounded-md bg-white/20 text-black placeholder-black focus:outline-0 focus:border-b-2"
                />

                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        ref={password}
                        required
                        className="w-full p-3 text-base border-b-2 border-black rounded-md bg-white/20 text-black placeholder-black focus:outline-0 focus:border-b-2"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black hover:text-black">
                        {!showPassword ? (
                            <IoEye
                                size={18}
                                onClick={() => setShowPassword(true)}
                            />
                        ) : (
                            <IoEyeOff
                                size={18}
                                onClick={() => setShowPassword(false)}
                            />
                        )}
                    </div>
                </div>

                <StyledButton
                    displayText="Login"
                    executeFunction={handleLogin}
                />

                <p className="text-black text-xl mt-2">
                    Dont have an account?{" "}
                    <Link
                        className="text-purple-500 cursor-pointer hover:underline text-xl"
                        to="/signup"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginCard;

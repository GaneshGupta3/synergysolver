import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authSliceActions } from "../../store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "../StyledButton/StyledButton.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUpCard = () => {
    const username = useRef();
    const email = useRef();
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
                dispatch(authSliceActions.login(response.data.user)); // Save user data in Redux
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
        <div className="w-screen h-[600px] flex justify-center items-center">
            <div className="bg-black/5 backdrop-blur-lg p-8 rounded-xl w-[400px] h-[400px] shadow-md text-black flex flex-col justify-evenly items-center">
                <p className="text-2xl font-bold mb-2">Register</p>

                <input
                    type="text"
                    placeholder="Username"
                    ref={username}
                    required
                    className="w-full p-3 text-base rounded-md border-b-2 border-black bg-white/20 text-black placeholder-black"
                />

                <input
                    type="email"
                    placeholder="Email"
                    ref={email}
                    required
                    className="w-full p-3 text-base border-b-2 border-black rounded-md bg-white/20 text-black placeholder-black"
                />

                <div className="relative w-full">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        ref={password}
                        required
                        className="w-full p-3 text-base border-b-2 border-black rounded-md bg-white/20 text-black placeholder-black "
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black hover:text-black">
                        {!showPassword ? (
                            <IoEye
                                size={15}
                                onClick={() => setShowPassword(true)}
                            />
                        ) : (
                            <IoEyeOff
                                size={15}
                                onClick={() => setShowPassword(false)}
                            />
                        )}
                    </div>
                </div>

                <StyledButton
                    displayText={isSigningUp ? "loading" : "Sign up"}
                    executeFunction={handleSignUp}
                    disabled={isSigningUp}
                />

                <p className="text-black text-xl mt-2">
                    Already have an account?{" "}
                    <Link
                        className="text-purple-500 hover:underline text-xl"
                        to="/login"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpCard;

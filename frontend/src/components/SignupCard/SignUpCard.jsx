import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUpCard.module.css";
import axios from "axios";
import { authSliceActions } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "../StyledButton/StyledButton.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUpCard = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSigningUp , setIsSigningUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const checkUserSession = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/user/check-auth`, {
                withCredentials: true, // Ensure cookies are sent
            });

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
        
        if(!validateGmail(email.current.value)){
            toast.error("enter validate gmail");
            setIsSigningUp(false);
            return ;
        }

        const registrationDetails = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
        };

        try {
            const res = await axios.post(
                `${API_BASE_URL}/auth/register`,
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
        }
        finally{
            setIsSigningUp(false);
        }
    };

    return (
        <div className={styles.mainBody}>
            <div className={styles.card}>
                <p>Sign up</p>
                <div className={styles.usernameDiv}>
                    
                    <input
                        ref={username}
                        type="username"
                        placeholder="Username"
                    />
                </div>
                <div className={styles.emailDiv}>
                    
                    <input ref={email} type="email" placeholder="Email" />
                </div>
                <div className={styles.passwordDiv}>
                    
                    <input
                        ref={password}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                    />
                    {!showPassword && (
                        <IoEye
                            className={styles.eyeButton}
                            size={25}
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                    {showPassword && (
                        <IoEyeOff
                            className={styles.eyeButton}
                            size={25}
                            onClick={() => setShowPassword(false)}
                        />
                    )}
                </div>
                <StyledButton
                    executeFunction={handleSignUp}
                    displayText={isSigningUp ? "loading" : "signup" }
                    disabled={isSigningUp}
                >
                </StyledButton>
                <p className={styles.signupText}>
                    Already have an account?{" "}
                    <Link style={{ color: "#ccc" }} to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpCard;

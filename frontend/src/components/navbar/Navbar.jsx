import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "../StyledButton/StyledButton";
import { logoutAsync } from "../../store/authSlice";
import logoImg from "../../assets/blacklogo.png";
import NavLink from "../navlink/NavLink";
import { CgProfile } from "react-icons/cg";

const Navbar = ({ transparent }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user,isLoggedIn } = useSelector((store) => store.authProvider);

    const loginRedirect = () => navigate("/login");
    const signupRedirect = () => navigate("/signup");

    return (
        <nav
            className={`fixed text-black top-0 left-0 w-full z-50 h-20 px-6 flex items-center justify-around transition-all duration-300 bg-gradient-to-br from-gray-100 to-gray-300/80 backdrop-blur-sm shadow-lg rounded-b-2xl
            `}
        >
            {/* Logo */}
            <div
                className="w-[70px] h-[70px] bg-contain bg-center bg-no-repeat cursor-pointer transition-transform duration-300 hover:rotate-360"
                style={{ backgroundImage: `url(${logoImg})` }}
                onClick={() => navigate("/dashboard")}
            ></div>

            {/* Nav Links */}
            {isLoggedIn && <NavLink text={"DashBoard"} navigateTo={"dashboard"}></NavLink>}

            {isLoggedIn && (
                <NavLink text={"discussion"} navigateTo={"chatpage"}></NavLink>
            )}

            <NavLink text={"About us"} navigateTo={"aboutus"}></NavLink>

            <NavLink text={"problems"} navigateTo={"problems"}></NavLink>

            <NavLink text={"rankings"} navigateTo={"rankings"}></NavLink>

            <NavLink text={"Contact Us"} navigateTo={"contactus"}></NavLink>

            {/* Auth Buttons */}
            {!isLoggedIn ? (
                <div className="flex gap-2">
                    <StyledButton
                        executeFunction={loginRedirect}
                        displayText="Login"
                    />
                    <StyledButton
                        executeFunction={signupRedirect}
                        displayText="Signup"
                    />
                </div>
            ) : (
                <Link
                    to={`/profile/${user._id}`}
                    // className="w-[70px] h-[70px] rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 transition-all"
                >
                    <CgProfile size={50} />
                </Link>
            )}
        </nav>
    );
};

export default Navbar;

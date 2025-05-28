import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StyledButton from "../StyledButton/StyledButton";
import { logoutAsync } from "../../store/authSlice";
import logoImg from "../../assets/blacklogo.png";
import NavLink from "../navlink/NavLink";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = ({ transparent }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector((store) => store.authProvider);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const loginRedirect = () => navigate("/login");
    const signupRedirect = () => navigate("/signup");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
                    isScrolled 
                        ? 'h-16 bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200/50' 
                        : 'h-20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex items-center justify-between h-full">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-4">
                            <div
                                className={`relative cursor-pointer group transition-all duration-500 ${
                                    isScrolled ? 'w-12 h-12' : 'w-16 h-16'
                                }`}
                                onClick={() => navigate("/dashboard")}
                            >
                                <div 
                                    className="w-full h-full bg-contain bg-center bg-no-repeat transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                                    style={{ backgroundImage: `url(${logoImg})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                            </div>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {isLoggedIn && (
                                <NavLinkStyled text="Dashboard" navigateTo="dashboard" />
                            )}
                            {isLoggedIn && (
                                <NavLinkStyled text="Discussion" navigateTo="chatpage" />
                            )}
                            <NavLinkStyled text="About Us" navigateTo="aboutus" />
                            <NavLinkStyled text="Problems" navigateTo="problems" />
                            <NavLinkStyled text="Rankings" navigateTo="rankings" />
                            <NavLinkStyled text="Contact" navigateTo="contactus" />
                        </div>

                        {/* Auth Section */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {!isLoggedIn ? (
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={loginRedirect}
                                        className="px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 relative group"
                                    >
                                        Login
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                                    </button>
                                    <button
                                        onClick={signupRedirect}
                                        className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">Sign Up</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to={`/profile/${user._id}`}
                                    className="relative group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5 group-hover:scale-110 transition-all duration-300">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                            <CgProfile size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                                        </div>
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-20 blur-md transition-all duration-300"></div>
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <HiX size={24} className="text-gray-700" />
                            ) : (
                                <HiMenuAlt3 size={24} className="text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Animated border */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-30"></div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
                    isMobileMenuOpen 
                        ? 'opacity-100 visible' 
                        : 'opacity-0 invisible'
                }`}
            >
                <div 
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
                
                <div className={`absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden transition-all duration-500 ${
                    isMobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
                }`}>
                    <div className="p-6 space-y-4">
                        {isLoggedIn && (
                            <MobileNavLink text="Dashboard" navigateTo="dashboard" onClick={() => setIsMobileMenuOpen(false)} />
                        )}
                        {isLoggedIn && (
                            <MobileNavLink text="Discussion" navigateTo="chatpage" onClick={() => setIsMobileMenuOpen(false)} />
                        )}
                        <MobileNavLink text="About Us" navigateTo="aboutus" onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink text="Problems" navigateTo="problems" onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink text="Rankings" navigateTo="rankings" onClick={() => setIsMobileMenuOpen(false)} />
                        <MobileNavLink text="Contact" navigateTo="contactus" onClick={() => setIsMobileMenuOpen(false)} />
                        
                        <div className="pt-4 border-t border-gray-200">
                            {!isLoggedIn ? (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => {
                                            loginRedirect();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full px-6 py-3 text-gray-700 hover:bg-gray-50 rounded-xl font-medium transition-all duration-300"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            signupRedirect();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to={`/profile/${user._id}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5">
                                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                            <CgProfile size={20} className="text-gray-700" />
                                        </div>
                                    </div>
                                    <span className="font-medium text-gray-700">Profile</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// Enhanced NavLink Component for Desktop
const NavLinkStyled = ({ text, navigateTo }) => {
    const navigate = useNavigate();
    
    return (
        <button
            onClick={() => navigate(`/${navigateTo}`)}
            className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 group rounded-lg hover:bg-gray-50/50"
        >
            {text}
            <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
        </button>
    );
};

// Mobile NavLink Component
const MobileNavLink = ({ text, navigateTo, onClick }) => {
    const navigate = useNavigate();
    
    return (
        <button
            onClick={() => {
                navigate(`/${navigateTo}`);
                onClick();
            }}
            className="w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-xl font-medium transition-all duration-300"
        >
            {text}
        </button>
    );
};

export default Navbar;
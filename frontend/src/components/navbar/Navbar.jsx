import axios from "axios";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImg from "../../assets/blacklogo.png";
import { useLocation } from "react-router-dom";
import { Code } from "lucide-react";

const Navbar = ({ transparent }) => {
    const Location = useLocation();
    const isLoginPage = Location.pathname === "/login";
    const isSignupPage = Location.pathname === "/signup";
    const navigate = useNavigate();
    const { user, isLoggedIn } = useSelector((store) => store.authProvider);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const loginRedirect = () => navigate("/login");
    const signupRedirect = () => navigate("/signup");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchQuery.trim() !== "") {
                handleSearchUser(searchQuery);
            } else {
                setSearchResult([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    const handleSearchUser = (query) => {
        axios
            .post(
                `${import.meta.env.VITE_API_BASE_URL}/api/user/searchUsers`,
                { searchQuery: query },
                { withCredentials: true }
            )
            .then((response) => {
                setSearchResult(response.data.users);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
                    isScrolled
                        ? "bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl"
                        : "bg-transparent"
                }`}
            >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-gray-900/50 to-blue-900/10 backdrop-blur-sm"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-4">
                            <div
                                className="relative cursor-pointer group transition-all duration-500 hover:scale-110"
                                onClick={() => navigate("/")}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                        <Code className="text-white w-6 h-6" />
                                    </div>
                                    <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                        Synergy Solver
                                    </span>
                                </div>
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
                            </div>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-1">
                            <NavLinkStyled text="Home" navigateTo="" />
                            {isLoggedIn && (
                                <NavLinkStyled
                                    text="Dashboard"
                                    navigateTo="dashboard"
                                />
                            )}
                            {isLoggedIn && (
                                <NavLinkStyled
                                    text="Discussion"
                                    navigateTo="chatpage"
                                />
                            )}
                            <NavLinkStyled
                                text="Problems"
                                navigateTo="problems"
                            />
                            <NavLinkStyled
                                text="Rankings"
                                navigateTo="rankings"
                            />
                            <NavLinkStyled
                                text="Contact Us"
                                navigateTo="contactus"
                            />
                        </div>

                        {/* Auth Section */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {!isLoggedIn ? (
                                <div className="flex items-center space-x-3">
                                    {isLoginPage ? (
                                        <div className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg">
                                            Login
                                        </div>
                                    ) : (
                                        <NavLinkStyled
                                            text="Login"
                                            navigateTo="login"
                                        />
                                    )}

                                    {isSignupPage ? (
                                        <div className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg">
                                            Register
                                        </div>
                                    ) : (
                                        <NavLinkStyled
                                            text={"Register"}
                                            navigateTo={"signup"}
                                        />
                                    )}
                                </div>
                            ) : (
                                <>
                                    {/* Search Bar */}
                                    <div className="relative">
                                        <div className="flex-col items-center relative">
                                            <input
                                                type="text"
                                                placeholder="Search Users..."
                                                value={searchQuery}
                                                onBlur={() =>
                                                    setTimeout(
                                                        () =>
                                                            setSearchQuery(""),
                                                        200
                                                    )
                                                }
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-64 pl-4 pr-4 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                                            />
                                            {searchResult.length > 0 && (
                                                <div className="absolute z-50 bg-gray-800/95 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-xl mt-2 w-full max-h-60 overflow-y-auto">
                                                    <ul className="divide-y divide-gray-700">
                                                        {searchResult.map(
                                                            (user) => (
                                                                <li
                                                                    key={
                                                                        user._id
                                                                    }
                                                                    onClick={() =>
                                                                        setSearchQuery(
                                                                            ""
                                                                        )
                                                                    }
                                                                >
                                                                    <Link
                                                                        to={`/profile/${user._id}`}
                                                                        className="flex items-center p-4 hover:bg-gray-700/50 transition-colors duration-200"
                                                                    >
                                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                                                                            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                                                                                {user.profilePic ? (
                                                                                    <img
                                                                                        src={
                                                                                            user.profilePic
                                                                                        }
                                                                                        alt="User profile"
                                                                                        className="w-full h-full object-cover rounded-full"
                                                                                    />
                                                                                ) : (
                                                                                    <CgProfile
                                                                                        className="text-gray-300"
                                                                                        size={
                                                                                            24
                                                                                        }
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        <span className="ml-3 font-medium text-white">
                                                                            {
                                                                                user.username
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Profile Button */}
                                    <Link
                                        to={`/profile/${user._id}`}
                                        className="relative group"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50">
                                            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                                                {user.profilePic ? (
                                                    <img
                                                        src={user.profilePic}
                                                        alt="User profile"
                                                        className="w-full h-full object-cover rounded-full"
                                                    />
                                                ) : (
                                                    <CgProfile
                                                        className="text-gray-300 group-hover:text-white"
                                                        size={24}
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="absolute -inset-1 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-all duration-300"></div>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="lg:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 transition-all duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <HiX size={24} className="text-white" />
                            ) : (
                                <HiMenuAlt3 size={24} className="text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
                    isMobileMenuOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                }`}
            >
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>

                <div
                    className={`absolute top-20 left-4 right-4 bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-500 ${
                        isMobileMenuOpen
                            ? "translate-y-0 scale-100"
                            : "-translate-y-4 scale-95"
                    }`}
                >
                    <div className="p-6 space-y-4">
                        {/* Search Bar for Mobile */}
                        {isLoggedIn && (
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Search Users..."
                                    value={searchQuery}
                                    onBlur={() =>
                                        setTimeout(
                                            () => setSearchQuery(""),
                                            200
                                        )
                                    }
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-4 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                />
                                {searchResult.length > 0 && (
                                    <div className="absolute z-50 bg-gray-700/95 backdrop-blur-xl border border-gray-600 shadow-2xl rounded-xl mt-2 w-full max-h-48 overflow-y-auto">
                                        <ul className="divide-y divide-gray-600">
                                            {searchResult.map((user) => (
                                                <li
                                                    key={user._id}
                                                    onClick={() => {
                                                        setSearchQuery("");
                                                        setIsMobileMenuOpen(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <Link
                                                        to={`/profile/${user._id}`}
                                                        className="flex items-center p-3 hover:bg-gray-600/50 transition-colors duration-200"
                                                    >
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                                                            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                                                                <CgProfile
                                                                    size={16}
                                                                    className="text-gray-300"
                                                                />
                                                            </div>
                                                        </div>
                                                        <span className="ml-3 font-medium text-white text-sm">
                                                            {user.username}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        <MobileNavLink
                            text="Home"
                            navigateTo=""
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        {isLoggedIn && (
                            <MobileNavLink
                                text="Dashboard"
                                navigateTo="dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                        )}
                        {isLoggedIn && (
                            <MobileNavLink
                                text="Discussion"
                                navigateTo="chatpage"
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                        )}
                        <MobileNavLink
                            text="Problems"
                            navigateTo="problems"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <MobileNavLink
                            text="Rankings"
                            navigateTo="rankings"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <MobileNavLink
                            text="Contact"
                            navigateTo="contactus"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <div className="pt-6 border-t border-gray-700">
                            {!isLoggedIn ? (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => {
                                            loginRedirect();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full px-6 py-3 text-white hover:bg-gray-700/50 rounded-xl font-medium transition-all duration-300 border border-gray-600"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            signupRedirect();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-blue-700"
                                    >
                                        Register
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to={`/profile/${user._id}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-700/50 transition-colors duration-200 border border-gray-700"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                                            {user.profilePic ? (
                                                <img
                                                    src={user.profilePic}
                                                    alt="User profile"
                                                    className="w-full h-full object-cover rounded-full"
                                                />
                                            ) : (
                                                <CgProfile
                                                    className="text-gray-300"
                                                    size={24}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <span className="font-medium text-white">
                                        View Profile
                                    </span>
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
            className="relative px-4 py-2 text-gray-300 hover:text-white font-medium transition-all duration-300 group rounded-lg"
        >
            {text}
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-xl font-medium transition-all duration-300 border border-transparent hover:border-gray-600"
        >
            {text}
        </button>
    );
};

export default Navbar;

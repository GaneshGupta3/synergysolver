import React from "react";
import { useNavigate } from "react-router-dom";

const NavLink = ({text , navigateTo}) => {
    const navigate = useNavigate();

    return (
        <h1
            onClick={() => navigate(`/${navigateTo}`)}
            className="relative block text-black text-lg font-medium px-4 py-2 cursor-pointer transition-all duration-300 hover:text-cyan-300 hover:scale-105 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-cyan-300 after:transition-all after:duration-300 hover:after:w-full"
        >
            {text}
        </h1>
    );
};

export default NavLink;

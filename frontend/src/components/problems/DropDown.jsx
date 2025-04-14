import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const DropDown = ({ text }) => {
    return (
        <div className="flex justify-center cursor-pointer items-center text-black bg-gray-400/20 p-[4px] rounded-sm hover:bg-gray-400/40 transition duration-300 ease-in-out">
            {text}
            <RiArrowDropDownLine className="text-black"/>
        </div>
    );
};

export default DropDown;

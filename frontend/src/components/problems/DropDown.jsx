import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

const DropDown = ({ text, options = [], onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
        setSelected(option);
        onSelect?.(option);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <div 
                className="flex justify-center cursor-pointer items-center text-gray-700 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-white/90 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md min-w-[120px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-sm">
                    {selected || text}
                </span>
                {isOpen ? (
                    <RiArrowDropUpLine className="text-gray-600 ml-1 text-xl"/>
                ) : (
                    <RiArrowDropDownLine className="text-gray-600 ml-1 text-xl"/>
                )}
            </div>
            
            {isOpen && options.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {options.map((option, idx) => (
                        <div
                            key={idx}
                            className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropDown;
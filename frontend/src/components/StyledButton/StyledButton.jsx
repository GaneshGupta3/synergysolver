import React from "react";

const StyledButton = ({ executeFunction, displayText, disabled }) => {
  return (
    <button
      onClick={executeFunction}
      disabled={disabled}
      className={`px-6 py-3 
        bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 cursor-pointer
        text-white font-semibold text-lg rounded-xl 
        shadow-lg hover:shadow-xl 
        transition duration-300 ease-in-out 
        transform hover:-translate-y-1 hover:scale-105 
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-blue-300`}
    >
      {displayText}
    </button>
  );
};

export default StyledButton;

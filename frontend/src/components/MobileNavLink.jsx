import { useNavigate } from "react-router-dom";

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

export default MobileNavLink ;
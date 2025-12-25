const DropDown = ({ text, options, onSelect }) => {
    return (
        <select
            className="bg-slate-600 text-white px-4 py-2 rounded-lg"
            onChange={(e) => onSelect(e.target.value)}
        >
            {options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    );
};

export default DropDown;

const Select = ({ value, onValueChange, children, placeholder }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {children}
    </select>
  );
};

const SelectOption = ({ value, children }) => (
  <option value={value}>{children}</option>
);
export { Select, SelectOption };

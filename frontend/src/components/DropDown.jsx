

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}

      <select value={value} onChange={onChange}>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};


export { Dropdown };

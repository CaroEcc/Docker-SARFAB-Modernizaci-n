import { RiArrowDownSLine } from "@remixicon/react";
import { useState, useEffect } from "react";

const FilterSelect: React.FC<FilterSelectProps> = ({
  name,
  label,
  options,
  onChange,
  renderOption,
  customArrow,
}) => {
  const initialValue = options.find(o => o.isSelected)?.value || "";
  const [selectedValue, setSelectedValue] = useState(initialValue);

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue]);

  return (
    <div className="w-full">
      <div className="relative z-20 bg-white dark:bg-form-input">
        <select
          id={name}
          name={name}
          aria-placeholder={label}
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
          className="relative z-20 w-full appearance-none rounded border border-stroke 
              bg-transparent py-3 px-6 
              outline-none transition 
              focus:border-primary active:border-primary dark:border-form-strokedark "
        >
          {options.map((option, index) =>
            renderOption ? (
              renderOption(option)
            ) : (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            )
          )}
        </select>
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2 ">
          {customArrow || <RiArrowDownSLine size={20} />}
        </span>
      </div>
    </div>
  );
};

export default FilterSelect;

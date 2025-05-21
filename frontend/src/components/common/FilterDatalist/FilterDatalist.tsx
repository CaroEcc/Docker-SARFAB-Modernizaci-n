import { useEffect, useState, forwardRef } from "react";
import type { FilterDatalistProps } from "./FilterDatalist.type";

const FilterDatalist = forwardRef<HTMLInputElement, FilterDatalistProps>(
  ({ name, label, options, value = "", onChange, showLabel = true, disabled }, ref) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleChange = (value: string) => {
      setInputValue(value);
      onChange(value);
    };

    return (
      <div className="w-full">
        {label && showLabel && (
          <label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
            {label}
          </label>
        )}

        <div className="relative z-20 bg-white dark:bg-form-input">
          <input
            ref={ref}
            type="text"
            autoComplete="off"
            id={name}
            name={name}
            list={`${name}-list`}
            placeholder={label || ""}
            disabled={disabled}
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            className="relative z-20 w-full appearance-none rounded border border-stroke 
                      bg-transparent py-3 px-6 outline-none transition 
                      focus:border-primary active:border-primary 
                      dark:border-form-strokedark"
          />
          <datalist id={`${name}-list`}>
            {options.map((option) => (
              <option key={option.id} value={option.name} />
            ))}
          </datalist>
        </div>
      </div>
    );
  }
);

export default FilterDatalist;
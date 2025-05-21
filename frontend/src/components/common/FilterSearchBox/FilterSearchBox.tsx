import { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterSearchBoxProps } from "./FilterSearchBoxProps.type";

const FilterSearchBox: React.FC<FilterSearchBoxProps> = ({
    name,
    value = '',
    onChange,
    onSearch,
    onKeyUp,
    placeholder = 'Search...',
    disabled = false,
    className = '',
    customInput,
}) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChange?.(e.target.value);
    };

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch();
        }
        onKeyUp?.(e);
    };

    return customInput ? (
        <div className={className}>{customInput}</div>
    ) : (
        <input
            type="text"
            id={name}
            name={name}
            value={inputValue}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium 
                        outline-none transition 
                        bg-white
                        focus:border-primary
                      active:border-primary 
                        disabled:cursor-default disabled:bg-whiter
                      dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary 
                         ${className}`}
        />
    );
};

export default FilterSearchBox;
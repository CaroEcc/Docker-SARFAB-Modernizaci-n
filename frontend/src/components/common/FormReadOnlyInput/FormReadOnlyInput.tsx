import clsx from "clsx";
import { useEffect } from "react";
import { FormReadOnlyInputProps } from "./FormReadOnlyInput.types";

const FormReadOnlyInput: React.FC<FormReadOnlyInputProps> = ({
    label,
    placeholder,
    value,
    register,
    setValue,
    name,
    className
}) => {
    useEffect(() => {
        setValue(name, value);
    })
    return (
        <div className="w-full">
            <label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
                {label}
            </label>
            <div className="relative">
                <input
                    {...register(name)}
                    value={value}
                    placeholder={placeholder}
                    readOnly
                    className={clsx("w-full rounded border-[1.5px] border-stroke py-3 px-5 font-medium outline-none dark:bg-form-input dark:border-form-strokedark", className)}
                />
            </div>
        </div>
    );
};

export default FormReadOnlyInput;

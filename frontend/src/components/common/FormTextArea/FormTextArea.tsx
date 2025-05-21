import { Textarea } from "@headlessui/react";
import clsx from "clsx";

const FormTextArea: React.FC<FormTextAreaProps> = ({
    label,
    placeholder,
    register,
    required,
    name,
    icon,
    readonly = false,
    className,
    defaultValue = "",
}) => {
    return (
        <div className="w-full">
            <label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
                {label} {required && <span className="text-meta-1">*</span>}
            </label>
            <div className="relative">
                <Textarea
                    id={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    {...(readonly ? {} : register(name, {
                        reqauired: required ? `${label} es obligatorio` : false,
                    }))}
                    className={clsx("w-full resize-none rounded border-[1.5px] border-stroke py-3 px-5 pr-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default :bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary", className)}
                    readOnly={readonly}
                />
                {icon && <span className="absolute right-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
            </div>
        </div>
    );
};

export default FormTextArea;
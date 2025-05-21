import { Controller } from "react-hook-form";

const FormCheckbox: React.FC<FormCheckboxProps> = ({ 
    title = "Selecciona una opción", 
    options, 
    control, 
    required = false, 
    register, 
    name, 
    defaultValue 
}) => {
    return (
        <div className="w-full">
            <label className="mb-3 block text-black dark:text-white">
                {title} {required && <span className="text-meta-1">*</span>}
            </label>
            <div className="relative">
                <Controller 
                    control={control}
                    name={name}
                    defaultValue={defaultValue}
                    render={({ field: { onChange, onBlur, value = defaultValue, ref } }) => (
                        <>
                            {options.map((option) => (
                                <label key={option.value.toString()} className="flex cursor-pointer select-none items-center mb-2">
                                    <input
                                        type="radio"
                                        name={name}
                                        onBlur={onBlur}
                                        className="sr-only"
                                        checked={value === option.value}
                                        value={option.value.toString()}
                                        onChange={() => {
                                            onChange(option.value);
                                            register(name);
                                        }}
                                        ref={ref}
                                         
                                    />
                                    <div className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${value === option.value  ? "border-primary" : "border-gray-300"}`}>
                                        <span className={`h-2.5 w-2.5 rounded-full bg-transparent ${value === option.value ? "!bg-primary" : ""}`}></span>
                                    </div>
                                    {option.label}
                                </label>
                            ))}
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default FormCheckbox;
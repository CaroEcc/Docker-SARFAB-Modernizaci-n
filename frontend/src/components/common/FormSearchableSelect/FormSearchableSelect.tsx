import { Controller } from "react-hook-form";

interface Option {
    id: string | number;
    name: string;
}

interface FormSearchableSelectProps {
    name: string;
    label?: string;
    options: Option[];
    control: any;
    defaultValue?: string | number;
    disabled?: boolean;
    onSelectionChange?: (value: number | string) => void
}

const FormSearchableSelect: React.FC<FormSearchableSelectProps> = ({
    name,
    label,
    options,
    control,
    defaultValue = "",
    disabled = false,
    onSelectionChange
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <div className="w-full">
                    {label && (
                        <label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
                            {label}
                        </label>
                    )}
                    <div className="relative z-20 bg-white dark:bg-form-input">
                        <input
                            type="text"
                            autoComplete="off"
                            id={name}
                            list={`${name}-list`}
                            placeholder="Seleccione una opción"
                            disabled={disabled}
                            defaultValue={defaultValue != '' ? options.find(option => option.id === defaultValue)?.name : ''}
                            onChange={(e) => {
                                const text = e.target.value;
                                const selectedOption = options.find(option => option.name === text);
                                field.onChange(selectedOption ? selectedOption.id : 0);
                                onSelectionChange && onSelectionChange(selectedOption ? selectedOption.id : 0)
                            }}
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
            )}
        />
    );
};

export default FormSearchableSelect;
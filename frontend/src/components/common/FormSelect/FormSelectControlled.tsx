import { RiArrowDownSLine } from "@remixicon/react";
import { Controller } from "react-hook-form";

interface FormSelectControlledProps {
  label: string;
  name: string;
  control: any;
  options: { value: string | number; label: string }[];
  required?: boolean;
  readonly?: boolean;
  defaultValue?: string | number;
}

const FormSelectControlled: React.FC<FormSelectControlledProps> = ({ label, name, control, options, required = false, readonly = false, defaultValue }) => {
  return (
    <div className="w-full">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative z-20 bg-white dark:bg-form-input">
            <select
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
              disabled={readonly}
              value={defaultValue}
            >
              <option value="">Seleccione una opción</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <RiArrowDownSLine size={20} color="gray" />
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default FormSelectControlled;

import { Controller } from "react-hook-form";
import { RiArrowDownSLine } from "@remixicon/react";

const FormSelect: React.FC<FormSelectProps> = ({ 
  label, 
  options, 
  required = false, 
  control, 
  name, 
  icon 
}) => {
  return (
    <div className="w-full">
      <label className="mb-2.5 block text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
          {icon}
        </span>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <select 
              {...field}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="" disabled>Seleccionar una opción</option>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          )}
        />
        <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
          <RiArrowDownSLine size={20} color="gray" />
        </span>
      </div>
    </div>
  );
};

export default FormSelect;

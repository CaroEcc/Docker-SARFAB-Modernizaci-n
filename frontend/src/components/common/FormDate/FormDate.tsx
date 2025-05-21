import clsx from "clsx";

const FormDate: React.FC<FormDateProps> = ({
  label,
  placeholder,
  required = false,
  register,
  name,
  readonly,
  className,
  defaultValue,
  customValidation,
}) => {
  const validationRules = customValidation
    ? { validate: customValidation }
    : required
    ? { required: `${label} es obligatorio` }
    : {};

  const inputProps = readonly
    ? {
        value: defaultValue ?? "",
        readOnly: true,
      }
    : {
        defaultValue,
        ...register(name, validationRules),
      };

  return (
    <div className="w-full">
      <label htmlFor={name} className="mb-3 block text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          type="date"
          placeholder={placeholder}
          {...inputProps}
          className={clsx(
            "custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary",
            className
          )}
          onClick={(e) => !readonly && e.currentTarget.showPicker()}
        />
      </div>
    </div>
  );
};

export default FormDate;

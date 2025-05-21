import clsx from "clsx";

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  register,
  required,
  name,
  icon,
  type = "text",
  readonly = false,
  className,
  defaultValue = "",
  value,
  title,
}) => {
  const isControlled = readonly && value !== undefined;

  return (
    <div className="w-full">
      <label htmlFor={name} className="mb-2.5 block text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          type={type}
          title={title}
          placeholder={placeholder}
          {...(isControlled
            ? { value, readOnly: true }
            : {
                defaultValue,
                readOnly: readonly,
                ...(!readonly &&
                  register(name, {
                    required: required ? `${label} es obligatorio` : false,
                  })),
              })}
          className={clsx(
            "w-full rounded border-[1.5px] border-stroke py-3 px-5 pr-10 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default :bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary",
            className
          )}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;

import { VARIANT_STYLES } from "@/constants/common/VariantButtonStyles";
import { ButtonProps } from "./ButtonProps.types";

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "primary", type = "button", disabled = false, isLoading, loadingLabel = "Cargando...", classname }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`px-6 py-2 rounded-md font-semibold transition lg:px-8 xl:px-10 ${VARIANT_STYLES[variant]} ${classname}`}
      >
         {isLoading ? loadingLabel : label}
      </button>
    );
  };
  
  export default Button;
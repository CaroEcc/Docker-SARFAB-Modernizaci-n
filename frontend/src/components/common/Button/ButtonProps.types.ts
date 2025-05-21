import { VARIANT_STYLES } from "@/constants/common/VariantButtonStyles";

export interface ButtonProps {
    label: string;
    onClick?: () => void;
    variant?: keyof typeof VARIANT_STYLES;
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
    isLoading?: boolean;
    loadingLabel?:string;
    classname?:string;
}
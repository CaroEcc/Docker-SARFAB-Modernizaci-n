interface FormDateProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    register?: any; 
    name: string;
    readonly?: boolean;
    className?: string;
    defaultValue?: string;
    customValidation?: (value: string) => boolean;
}
interface FormCheckboxProps {
    title?: string;
    options: { label: string; value: boolean}[];
    control?: any;
    selectedValue?: string;
    onChange?: (selected: string) => void;
    required?: boolean;
    register?: any; 
    name: string;

    readOnly?: boolean;
    className ?: string;
    defaultValue?: boolean;
}
interface FormTextAreaProps {
    label: string;
    placeholder?: string;
    required?: boolean;
    icon?: React.ReactNode;

    register?: any;
    errors?: any;
    name: string;

    readonly?: boolean;
    className?: string;
  defaultValue?: string;
  disabled?: boolean;
}
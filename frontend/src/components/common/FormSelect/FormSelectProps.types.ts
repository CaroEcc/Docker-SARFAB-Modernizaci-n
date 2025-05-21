interface FormSelectProps {
    label: string;
    options: { id: number | string; name: string }[];
    required?: boolean;
    icon: JSX.Element;

    control?: any;
    name: string;
  }
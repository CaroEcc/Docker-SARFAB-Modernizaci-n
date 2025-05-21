import { KeyboardEvent } from "react";

export interface FilterSearchBoxProps {
    name:string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: () => void;
    onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    customInput?: React.ReactNode;
};
import { ReactNode } from "react";

export interface ModalProps {
    title: string | ReactNode;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    fitContent?: boolean
};
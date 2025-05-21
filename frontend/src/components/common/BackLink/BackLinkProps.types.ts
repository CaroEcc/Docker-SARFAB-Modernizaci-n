import { IconType } from "react-icons/lib";

export interface BackLinkProps {
    text: string; 
    link: string;
    icon?: IconType;
    iconSize?: number;
    className?: string;
    onClick?: () => void;
    useRouter?: boolean;
}
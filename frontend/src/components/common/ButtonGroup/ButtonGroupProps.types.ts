import { ButtonProps } from "../Button/ButtonProps.types";

export interface ButtonGroupProps {
    buttons: Array<
    | { type: "button"; label: string; onClick: () => void; variant?: ButtonProps["variant"]; disabled?: boolean; isLoading?: boolean }
    | { type: "link"; label: string; to: string; variant?: ButtonProps["variant"] }
  >;
}
interface DropdownItem {
  type: "link" | "button" | "custom"; 
  icon?: JSX.Element;
  label: string;
  href?: string;
  onClick?: () => void;
  ref?: string;
  renderItem?: (active: boolean) => JSX.Element;
};
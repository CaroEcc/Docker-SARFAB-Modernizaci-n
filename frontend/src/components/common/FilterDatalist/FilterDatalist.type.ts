export interface FilterOption {
  id: number | string;
  name: string;
}

export interface FilterDatalistProps {
  name: string;
  label: string;
  options: FilterOption[];
  value?: string;
  onChange: (value: string) => void;
  showLabel?: boolean;
  className?: string;
  disabled?: boolean; 
}

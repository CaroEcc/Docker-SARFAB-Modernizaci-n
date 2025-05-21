import { Dispatch, SetStateAction } from "react";

export interface VolunteerActiveFiltersProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    gradeIdFilter: string;
    setgradeIdFilter: (value: string) => void;
    gradeIdOptions: { value: string; label: string; isSelected: boolean }[];
    orderByLastNameAsc: boolean;
    setOrderByLastNameAsc: Dispatch<SetStateAction<boolean>>;
}
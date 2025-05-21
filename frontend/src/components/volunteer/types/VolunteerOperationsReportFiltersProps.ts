import { Dispatch, SetStateAction } from "react";

export interface VolunteerOperationsReportFiltersProps {
    searchValue: string;
    setSearchValue: (value: string) => void;

    categoryFilter: string;
    setCategoryFilter: (value: string) => void;
    categoryOptions: { value: string; label: string; isSelected: boolean }[];

    setStartDate: (value: string | undefined) => void,
    setEndDate: (value: string | undefined) => void,
    orderByDateAsc: boolean;
    setOrderByDateAsc: Dispatch<SetStateAction<boolean>>;
    refetch: () => void;
}
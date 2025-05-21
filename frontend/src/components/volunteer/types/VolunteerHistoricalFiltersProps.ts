interface VolunteerHistoricalFiltersProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    gradeIdFilter: string;
    setgradeIdFilter: (value: string) => void;
    gradeIdOptions: { value: string; label: string; isSelected: boolean }[];
    setStartDate: (value: string | undefined) => void,
    setEndDate: (value: string | undefined) => void
    refetch: () => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    statusOptions: { value: string; label: string; isSelected: boolean }[];
}
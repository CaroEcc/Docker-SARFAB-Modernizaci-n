interface VolunteerGuardsReportFiltersProps {
    searchValue: string;
    setSearchValue: (value: string) => void;

    statusFilter: string;
    setStatusFilter: (value: string) => void;
    statusOptions: { value: string; label: string; isSelected: boolean }[];

    shiftFilter: string;
    setShiftFilter: (value: string) => void;
    shiftOptions: { value: string; label: string; isSelected: boolean }[];

    setStartDate: (value: string | undefined) => void,
    setEndDate: (value: string | undefined) => void
    refetch: () => void;
}
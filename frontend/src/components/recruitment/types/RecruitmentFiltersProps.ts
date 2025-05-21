interface RecruitmentPendingFiltersProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
    statusOptions: { value: string; label: string; isSelected: boolean }[];
}

interface RecruitmentFiltersProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
}
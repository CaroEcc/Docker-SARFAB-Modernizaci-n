interface MedicalTreatmentFiltersProp {
    searchValue: string;
    setSearchValue: (value: string) => void;
    setStartDate: (value: string | undefined) => void,
    setEndDate: (value: string | undefined) => void
    refetch: () => void;
}
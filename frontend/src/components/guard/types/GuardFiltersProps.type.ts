interface GuardFiltersProp {
    shiftData: any;
    searchValue: string;
    setSearchValue: (value: string) => void;
    setStartDate: (value: string | undefined) => void;
    setEndDate: (value: string | undefined) => void;
    status: number;
    setStatus: (value: number) => void;
    shift: number;
    setShift: (value: number) => void;
    refetch: () => void;
}
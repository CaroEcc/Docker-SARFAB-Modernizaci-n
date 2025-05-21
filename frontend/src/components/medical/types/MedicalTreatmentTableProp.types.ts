interface MedicalTreatmentTableProps {
    isLoading: boolean;
    data: any;
    columns: any;
    pageIndex: number;
    pageSize: number;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
    refetch: () => void;
}
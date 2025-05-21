interface RecruitmentTableProps {
    isLoading: boolean;
    isFetching: boolean;
    data: any;
    columns: any;
    pageIndex: number;
    pageSize: number;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
    refetch: () => void;
    noItemsMessage:string, noItemsLinkText: string, noItemsLinkUrl: string
}
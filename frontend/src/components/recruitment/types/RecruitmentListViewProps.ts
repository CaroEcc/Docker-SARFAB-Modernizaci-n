interface RecruitmentListViewProps {
    breadcrumb: { label: string; path?: string }[];
    initialStatusFilter: string;
    columns: any;
    modalComponent: JSX.Element;
}
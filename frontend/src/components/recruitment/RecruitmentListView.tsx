import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { RecruitmentFilters } from "./RecruitmentFilters";
import { RecruitmentHeader } from "./RecruitmentHeader";
import { RecruitmentTable } from "./RecruitmentTable";
import { useRecruitment } from "@/hooks/recruitment";

export function RecruitmentListView({ breadcrumb, initialStatusFilter, columns, modalComponent }: RecruitmentListViewProps) {
    useBreadcrumb(breadcrumb);

    const {
        data, isLoading, refetch, isFetching, searchValue,
        setSearchValue,
        pageIndex, setPageIndex, pageSize, setPageSize
    } = useRecruitment({ initialStatusFilter });

    return (
        <>
            <RecruitmentHeader />
            <RecruitmentFilters
                searchValue={searchValue} setSearchValue={setSearchValue}
            />
            <RecruitmentTable
                isLoading={isLoading} isFetching={isFetching} data={data} columns={columns}
                pageIndex={pageIndex} pageSize={pageSize}
                setPageIndex={setPageIndex} setPageSize={setPageSize} refetch={refetch}
                noItemsMessage="No se encontraron candidatos"
                noItemsLinkText="Agregar nuevo candidato"
                noItemsLinkUrl="/recruitment/create"
            />
            {modalComponent}
        </>
    );
}
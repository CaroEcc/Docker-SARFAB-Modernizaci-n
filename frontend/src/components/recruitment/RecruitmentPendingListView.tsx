import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { RecruitmentHeader } from "./RecruitmentHeader";
import { RecruitmentTable } from "./RecruitmentTable";
import { useRecruitment } from "@/hooks/recruitment";
import { RecruitmentPendingFilters } from "./RecruitmentPendingFilters";

export function RecruitmentPendingListView({ breadcrumb, initialStatusFilter, columns, modalComponent }: RecruitmentListViewProps) {
    useBreadcrumb(breadcrumb);

    const {
        data, isLoading, refetch, isFetching, searchValue,
        setSearchValue, statusFilter, setStatusFilter,
        pageIndex, setPageIndex, pageSize, setPageSize
    } = useRecruitment({ initialStatusFilter });

    const statusOptions = [
        { value: '0', label: 'Rechazado' },
        { value: '1', label: 'Pendiente de aprobación' },
        { value: '2', label: 'Apto - Pendiente de registro de voluntario' },
        { value: '3', label: 'Apto - Registrado como voluntario' }
    ].map(option => ({ ...option, isSelected: option.value === initialStatusFilter }));

    return (
        <>
            <RecruitmentHeader />
            <RecruitmentPendingFilters
                searchValue={searchValue} setSearchValue={setSearchValue}
                statusFilter={statusFilter} setStatusFilter={setStatusFilter}
                statusOptions={statusOptions}
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
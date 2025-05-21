import Loader from "../common/Loader";
import { MessageWithLink } from "../common/MesaggeWithLink/MessageWithLink";
import SortableTable from "../common/SortableTable/SortableTable";

export function RecruitmentTable({ isLoading, isFetching, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch }: RecruitmentTableProps) {
    if (isLoading) return <Loader message="Cargando datos..."/>;
    if (isFetching) return <Loader message="Cargando datos..."/>;
    if (!data?.data.length)
        return <MessageWithLink
            message="No existen reclutas."
            linkText="Crear recluta"
            linkUrl="/recruitment/create"
        />;

    return (
        <SortableTable
            columns={columns} data={data.data}
            pagination={{ pageIndex, pageSize }}
            totalPages={data.totalPages}
            totalRecords={data.totalRecords}
            onPaginationChange={({ pageIndex, pageSize }) => {
                setPageIndex(pageIndex);
                setPageSize(pageSize);
                refetch();
            }}
        />
    );
}

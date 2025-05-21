import Loader from "../../common/Loader";
import { MessageWithLink } from "../../common/MesaggeWithLink/MessageWithLink";
import SortableTable from "../../common/SortableTable/SortableTable";

export function VolunteerTable({ isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch, isFetching,
    noItemsMessage, noItemsLinkText, noItemsLinkUrl}: RecruitmentTableProps) {
    if (isLoading) return <Loader message="Cargando datos..."/>;
    if (isFetching) return <Loader message="Cargando datos..."/>;
    
    if (!data?.data.length)
        return <MessageWithLink
            message={noItemsMessage}
            linkText={noItemsLinkText}
            linkUrl={noItemsLinkUrl}
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
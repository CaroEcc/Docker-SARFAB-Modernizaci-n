import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoMedicalTreatmentsMessage } from "./NoMedicalTreatmentsMessage";

export function MedicalTreatmentTable({ isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch, hasFilters }: MedicalTreatmentTableProps & { hasFilters: boolean }) {
    if (isLoading) return <Loader />;
    if (!data?.data.length) return <NoMedicalTreatmentsMessage hasFilters={hasFilters}/>;

        return (
            <SortableTable
                columns={columns} data={data.data}
                pagination={{ pageIndex, pageSize }}
                totalPages={data.totalPages} totalRecords={data.totalRecords}
                onPaginationChange={({ pageIndex, pageSize }) => {
                    setPageIndex(pageIndex);
                    setPageSize(pageSize);
                    refetch();
                }}
            />
        );
}
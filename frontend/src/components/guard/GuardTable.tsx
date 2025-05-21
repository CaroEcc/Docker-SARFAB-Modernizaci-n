import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";

export function GuardTable({ isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch, hasFilters }: GuardTableProps & { hasFilters: boolean }) {
    if (isLoading) return <Loader />;
    if (!data?.data.length)
        return (
            <div className='h-fit'>
                <p className='text-center py-20'>
                    {hasFilters
                        ? "No se encontraron registros con los filtros aplicados."
                        : "No existen guardias. "}
                    {!hasFilters && (
                        <Link to="/guards/create" className='text-primary font-bold'>Crear guardia</Link>
                    )}
                </p>
            </div>
        );

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
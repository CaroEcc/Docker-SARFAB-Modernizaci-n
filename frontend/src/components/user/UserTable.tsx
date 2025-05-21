import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";

interface UserTableProps {
    isLoading: boolean;
    data: any;
    columns: any;
    pageIndex: number;
    pageSize: number;
    setPageIndex: (index: number) => void;
    setPageSize: (size: number) => void;
    refetch: () => void;
}

export function UserTable({ isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch, hasFilters }: UserTableProps & { hasFilters: boolean }) {
    if (isLoading) return <Loader />;
    if (!data?.data.length)
        return (
            <div className='h-fit'>
                <p className='text-center py-20'>
                    {hasFilters
                        ? "No se encontraron registros con los filtros aplicados."
                        : "No existen usuarios. "}
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
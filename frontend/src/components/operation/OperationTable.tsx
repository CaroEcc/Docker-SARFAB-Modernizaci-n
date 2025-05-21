import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoOperationMessage } from "./NoOperationMessage";
import { OperationTableProps } from "./types/OperationTableProps";

export function OperationTable(props: OperationTableProps & { hasFilters: boolean }) {
  const { isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch, hasFilters } = props;
  if (isLoading) return <Loader message="Cargando lista de operaciones..." />;
  if (!data?.data.length) return <NoOperationMessage hasFilters={hasFilters} />;

  const formattedData = data.data.map((row) => ({
    ...row,
    departureDate: row.departureDate || '-',
    arrivalDate: row.arrivalDate || '-',
  }));   
  
  return (
    <SortableTable
      columns={columns} data={formattedData}
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
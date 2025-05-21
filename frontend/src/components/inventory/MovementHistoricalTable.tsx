import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoMovementHistoryMessage } from "./NoMovementHistoryMessage";
import { MovementHistoricalTableProps } from "./types/MovementHistoricalTableProps";

export function MovementHistoricalTable(props: MovementHistoricalTableProps & { hasFilters: boolean }) {
  const { isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch, hasFilters } = props;

  if (isLoading) return <Loader message="Cargando lista del histórico de movimientos" />;
  if (!data?.data.length) return <NoMovementHistoryMessage hasFilters={hasFilters} />;

  return (
    <SortableTable
      columns={columns}
      data={data.data}
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

import Loader from "../common/Loader";
import SortableTable from "../common/SortableTable/SortableTable";
import { NoInventoryMessage } from "./NoInventoryMessage";
import { InventoryTableProps } from "./types/inventoryTableProps";

export function InventoryTable(props: InventoryTableProps & { hasFilters: boolean }) {
  const { isLoading, data, columns, pageIndex, pageSize, setPageIndex, setPageSize, refetch, hasFilters } = props;
  if (isLoading) return <Loader message="Cargando lista de elementos" />;
  if (!data?.data.length) return <NoInventoryMessage hasFilters={hasFilters} />;

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
  )
}
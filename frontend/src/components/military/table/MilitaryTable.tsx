import Loader from "@/components/common/Loader";
import SortableTable from "@/components/common/SortableTable/SortableTable";
import { NoMilitaryMessage } from "@/components/military";

export function MilitaryTable({
  isLoading,
  data,
  columns,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  refetch,
  hasFilters,
}: MilitaryTableProps & { hasFilters: boolean }) {
  
  if (isLoading) return <Loader message="Cargando lista de personal militar..." />;
  if (!data || data.data.length === 0) return <NoMilitaryMessage hasFilters={hasFilters} />;
  const handlePaginationChange = ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    refetch();
  };
  
  return (
    <SortableTable
      columns={columns}
      data={data.data} totalRecords={data.totalRecords}
      pagination={{ pageIndex, pageSize }}
      totalPages={data.totalPages}
      onPaginationChange={handlePaginationChange}
    />
  );
}

import SortableTable from "@/components/common/SortableTable/SortableTable";
import { RequesterType } from "@/types/requester.schema";
import Loader from "@/components/common/Loader";

interface RequesterTableProps {
  data: { data: RequesterType[]; totalPages: number, totalRecords: number } | undefined;
  columns: any;
  pageIndex: number;
  pageSize: number;
  setPageIndex: (page: number) => void;
  setPageSize: (size: number) => void;
  refetch: () => void;
  isLoading?: boolean;
  hasFilters?: boolean;
}

export function RequesterTable({
  data,
  columns,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  refetch,
  isLoading = false,
  hasFilters
}: RequesterTableProps) {
  const requesters = data?.data || [];
  const totalPages = data?.totalPages || 0;
  const totalRecords = data?.totalRecords || 0;

  if (isLoading) return <Loader />;

  if (!requesters.length) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-gray-500">
          {hasFilters
            ? "No se encontraron solicitantes con los filtros aplicados."
            : "No hay solicitantes registrados."}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <SortableTable
        columns={columns}
        data={requesters}
        pagination={{ pageIndex, pageSize }}
        totalPages={totalPages} totalRecords={totalRecords}
        onPaginationChange={({ pageIndex, pageSize }) => {
          setPageIndex(pageIndex);
          setPageSize(pageSize);
          refetch();
        }}
       
      />
    </div>
  );
}

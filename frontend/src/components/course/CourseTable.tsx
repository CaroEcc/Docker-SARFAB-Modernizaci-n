import { ColumnDef } from "@tanstack/react-table";
import { Course } from "@/types/courses.schema";
import Loader from "@/components/common/Loader";
import SortableTable from "@/components/common/SortableTable/SortableTable";

interface CourseTableProps {
  isLoading: boolean;
  data: Course[];
  columns: ColumnDef<Course, any>[];
  pageIndex: number;
  pageSize: number;
  setPageIndex: (page: number) => void;
  setPageSize: (size: number) => void;
  refetch: () => void;
  totalPages: number;
  totalRecords:number;
  hasFilters?: boolean;
}

export function CourseTable({
  isLoading,
  data,
  columns,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  refetch,
  totalPages,
  totalRecords,
  hasFilters
}: CourseTableProps) {
  if (isLoading) return <Loader message="Cargando lista de cursos" />;

  if (!data.length)
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-gray-500">
          {hasFilters
            ? "No se encontraron cursos con los filtros aplicados."
            : "No hay cursos registrados."}
        </p>
      </div>
    );

  return (
    <SortableTable
      columns={columns} data={data}
      pagination={{ pageIndex, pageSize }}
      totalPages={totalPages} totalRecords={totalRecords}
      onPaginationChange={({ pageIndex, pageSize }) => {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
        refetch();
      }}
    />
  );
}

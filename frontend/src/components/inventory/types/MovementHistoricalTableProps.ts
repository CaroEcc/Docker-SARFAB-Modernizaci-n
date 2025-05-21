import { MovementHistory } from "@/types/invetory.schema";
import { ColumnDef } from "@tanstack/react-table";

export type MovementHistoricalTableProps = {
  isLoading: boolean;
  data?: {
    data: MovementHistory[];
    totalPages: number;
    totalRecords: number;
  };
  columns: ColumnDef<MovementHistory>[];
  pageIndex: number;
  pageSize: number;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (pageSize: number) => void;
  refetch: () => void;
};

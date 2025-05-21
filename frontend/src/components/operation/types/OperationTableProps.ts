import { ActiveOperation, ListOperationResponse } from "@/types/operation.schema";
import { ColumnDef } from "@tanstack/react-table";

export interface OperationTableProps {
  data?: ListOperationResponse; 
  isLoading: boolean;
  columns: ColumnDef<ActiveOperation>[];
  pageIndex: number;
  setPageIndex: (index: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  refetch: () => void;
}

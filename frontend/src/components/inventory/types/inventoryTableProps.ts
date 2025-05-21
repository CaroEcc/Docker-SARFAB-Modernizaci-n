import { InventoryItem, ListInventoryResponse } from "@/types/invetory.schema";
import { ColumnDef } from "@tanstack/react-table";

export interface InventoryTableProps {
  data?: ListInventoryResponse;
  isLoading: boolean;
  columns: ColumnDef<InventoryItem>[];
  pageIndex: number;
  setPageIndex: (index: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  refetch: () => void;
}
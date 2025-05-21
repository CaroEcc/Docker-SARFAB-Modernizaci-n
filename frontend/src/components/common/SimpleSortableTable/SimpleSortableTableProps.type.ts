import { ColumnDef } from "@tanstack/react-table";

export interface SimpleSortableTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  initialPageSize?: number;
}
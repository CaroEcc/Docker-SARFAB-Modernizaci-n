import { ColumnDef } from "@tanstack/react-table";

export interface SortableTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pagination: { pageIndex: number; pageSize: number };
  totalPages: number;
  totalRecords: number;
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
}
import { InventoryItem } from '@/types/invetory.schema';
import { ColumnDef } from '@tanstack/react-table';
export type InventoryListComponentProps = {
  breadcrumb: { label: string; path?: string }[];
  columns: ColumnDef<InventoryItem>[];
}
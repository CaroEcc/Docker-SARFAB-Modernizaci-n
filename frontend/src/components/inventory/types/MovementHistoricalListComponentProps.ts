import { MovementHistory } from '@/types/invetory.schema';
import { ColumnDef } from '@tanstack/react-table';

export type MovementHistoricalListComponentProps = {
  breadcrumb: { label: string; path?: string }[];
  columns: ColumnDef<MovementHistory>[];
}

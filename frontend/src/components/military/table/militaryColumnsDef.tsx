import { baseColumns } from './baseColumns';
import { ColumnDef } from '@tanstack/react-table';
import { Military } from '@/types/index';
import { ActionsColumn } from './ActionsColumn';

export const militaryColumnsDef: ColumnDef<Military>[] = [
  ...baseColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <ActionsColumn row={row} />
    ),
    enableSorting: false,
    size: 100,
  }  
];

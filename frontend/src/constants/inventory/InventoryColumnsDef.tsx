import { InventoryItem } from "@/types/invetory.schema";
import { ColumnDef } from "@tanstack/react-table";
import { InventoryColumns } from "./InventoryColumns";
import { ActionsColumn } from "./ActionsColumn";

export const InventoryColumnsDef: ColumnDef<InventoryItem>[] = [
  ...InventoryColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <div className="flex justify-center relative">
        <ActionsColumn row={row} />
      </div>
    ),
    enableSorting: false,
  }
];
import { InventoryItem } from "@/types/invetory.schema";
import { ColumnDef } from "@tanstack/react-table";

export const InventoryColumns: ColumnDef<InventoryItem>[] = [
  {
    header: "Nombre del elemento",
    accessorKey: "name",
  },
  {
    header: "Cantidad disponible",
    accessorKey: "availableQuantity",
  },
  {
    header: "Cantidad asignada",
    accessorKey: "assignedQuantity",
  },
  {
    header: "Total de stock",
    accessorKey: "totalStock",  
  }
];
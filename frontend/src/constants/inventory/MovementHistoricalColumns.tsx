import { MovementHistory } from "@/types/invetory.schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const MovementHistoricalColumns: ColumnDef<MovementHistory>[] = [
  {
    header: "Nombre del voluntario",
    accessorKey: "volunteerName",
  },
  {
    header: "Nombre del elemento",
    accessorKey: "itemName",
  },
  {
    header: "Fecha del movimiento",
    accessorKey: "movementDate",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return format(new Date(date), "dd/MM/yyyy");
    },
  },
  {
    header: "Tipo de Acción",
    accessorKey: "action",
  },
  {
    header: "Cantidad",
    accessorKey: "quantity",
  }
];
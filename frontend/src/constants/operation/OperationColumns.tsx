import { ActiveOperation } from "@/types/operation.schema";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const OperationColumns: ColumnDef<ActiveOperation>[] = [
  {
    header: "Municipio",
    accessorKey: "municipalityName",
  },
  {
    header: "Dirección",
    accessorKey: "address",
  },
  {
    header: "Solicitante",
    accessorKey: "requesterName",
  },
  {
    header: "Actividad",
    accessorKey: "categoryAndOperationType",
  },
  {
    header: "Fecha de salida",
    accessorKey: "departureDate",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return date ? format(date, "dd/MM/yyyy", { locale: es }) : "-";
    },
  },
  {
    header: "Fecha de llegada",
    accessorKey: "arrivalDate",
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return date ? format(date, "dd/MM/yyyy", { locale: es }) : "-";
    },
  },
  {
    header: "Responsable",
    accessorKey: "responsible",
  },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const statusConfig: Record<string, { text: string; className: string }> = {
        1: { text: "Activa", className: "bg-success text-success" },
        0: { text: "Finalizada", className: "bg-warning text-warning" },
      };
      const { text, className } = statusConfig[value] || {
        text: "Desconocido",
        className: "bg-gray-400 text-gray-600"
      };
      return (
        <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold ${className}`}>
          {text}
        </span>
      );
    }
  },
]
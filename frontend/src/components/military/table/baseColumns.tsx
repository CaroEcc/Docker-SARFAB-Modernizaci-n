import { ColumnDef } from "@tanstack/react-table";
import { Military } from "@/types/index";

const statusConfig: Record<number, { text: string; className: string }> = {
  0: { text: "Desactivado", className: "bg-warning text-warning" },
  1: { text: "Habilitado", className: "bg-success text-success" },
};

export const baseColumns: ColumnDef<Military>[] = [
  { header: "ID", accessorKey: "id", enableHiding: true },
  {
    header: "Nombre Completo",
    id: "fullName",
    accessorFn: (row) => [row.lastName, row.firstName].filter(Boolean).join(" "),
  },
  { header: "Teléfono", accessorKey: "mobilePhone" },
  { header: "Grado", accessorKey: "rankName" },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({ getValue }) => {
      const value = getValue<number>();
      const { text, className } = statusConfig[value] || {
        text: "Desconocido",
        className: "bg-gray-400 text-gray-600",
      };
      return (
        <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold ${className}`}>
          {text}
        </span>
      );
    },
  },
];

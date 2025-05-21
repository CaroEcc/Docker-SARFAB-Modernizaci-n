import { ColumnDef } from "@tanstack/react-table";
import { Recruit } from "@/types/index";

export const baseColumns: ColumnDef<Recruit>[] = [
  { header: "ID", accessorKey: "recruitmentId", enableHiding: true },
  { 
    header: "Nombre Completo", 
    accessorKey: "fullName",
    cell: ({ row }) => {
      const firstName = row.original.firstName || "";
      const lastName = row.original.lastName || "";
      return `${lastName} ${firstName}`;
    }
  },
  { header: "CI", accessorKey: "ci" },
  { header: "Fecha de Nacimiento", accessorKey: "birthDate" },
  {
    header: "Opta por libreta de servicio militar",
    accessorKey: "wantsMilitaryService",
    cell: ({ getValue }) => {
      const value = getValue<boolean>();
      return (  
        <span
          className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold ${value ? 'bg-success text-success' : 'bg-danger text-danger'}`}
        >
          {value ? 'Sí aplica' : 'No aplica'}
        </span>
      );
    },
  },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      
      const statusConfig: Record<string, { text: string; className: string }> = {
        "0": { text: "No apto", className: "bg-danger text-danger" },
        "1": { text: "Pendiente de aprobación", className: "bg-warning text-warning" },
        "2": { text: "Apto - Pendiente de registro", className: "bg-warning text-warning" },
        "3": { text: "Apto - Registrado como voluntario", className: "bg-success text-success" }
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
];

import { ColumnDef } from "@tanstack/react-table";
import { VolunteerOperation } from "@/types/volunteer.schema";

export const volunteerOperationsReportColumnsDef: ColumnDef<VolunteerOperation>[] = [
    {
        header: "Fecha del operativo", accessorKey: "operationDate",
        cell: ({ row }) => {
            const date = new Date(row.original.operationDate);
            const formatted = date.toISOString().split("T")[0];
            return formatted;
        }
    },
    { header: "Actividad", accessorKey: "activity" },
    { header: "Ubicación", accessorKey: "location" },
    { header: "Dirección", accessorKey: "address" },
    { header: "Responsable", accessorKey: "responsible" },
    { header: "Observaciones", accessorKey: "observations" },
    {
        header: "Estado",
        accessorKey: "status",
        cell: ({ getValue }) => {
            const status = getValue<number>();
            return (
                <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-semibold 
                        ${status === 1 ? 'bg-success text-success' : status === 2 ? 'bg-danger text-danger' : 'bg-warning text-warning'}`}
                >
                    {status === 1 ? "Asistió" : status === 2 ? "No asistió" : 'Pendiente'}
                </span>
            );
        }
    }
];
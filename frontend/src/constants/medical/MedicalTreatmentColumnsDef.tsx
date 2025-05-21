import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiEdit2Line, RiEyeFill } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import { MedicalTreatment } from "@/types/medicalTreatment.schema";

export const medicalTreatmentColumnDef: ColumnDef<MedicalTreatment>[] = [
  { header: "Fecha del tratamiento", accessorKey: "treatmentDate" },
  { header: "Paciente", accessorKey: "patientPersonFullname" },
  { header: "Persona que atendió", accessorKey: "attendingPersonFullname" },
  { 
    header: "Diagnóstico", 
    accessorKey: "diagnosis",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const truncatedValue = value.length > 30 ? `${value.slice(0, 30)}...` : value;

      return (
        <span className="text-left">
          {truncatedValue}
        </span>
      );
    } 
  },
  {
    header: "Descripción del tratamiento",
    accessorKey: "description",
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const truncatedValue = value.length > 50 ? `${value.slice(0, 50)}...` : value;

      return (
        <span className="text-left">
          {truncatedValue}
        </span>
      );
    }
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
    enableSorting: false,
  }
];

const ActionsColumn = ({ row }: { row: any }) => {
  return (
    <DropdownMenu
      items={[
        {
          type: "link", label: "Editar tratamiento",
          href: `/medical-treatment/${row.original.medicalTreatmentId}/edit`,
          icon: <RiEdit2Line size={20} />
        },
        {
          type: "link", label: "Ver tratamiento",
          href: `/medical-treatment/${row.original.medicalTreatmentId}`,
          icon: <RiEyeFill size={20} />
        }
      ]}
    />
  );
};
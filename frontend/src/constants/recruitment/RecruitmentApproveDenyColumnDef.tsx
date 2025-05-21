import { ColumnDef } from "@tanstack/react-table";
import { Recruit } from "@/types/index";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiCheckboxCircleFill, RiCloseCircleFill, RiEdit2Line } from "@remixicon/react";
import { baseColumns } from "./baseColumns";
import { useNavigate } from "react-router-dom";

const ActionsColumn = ({ row }: { row: any }) => {
  const navigate = useNavigate(); 

  return (
    <DropdownMenu
      items={[
        { 
          type: "link", 
          label: "Editar recluta", 
          href: `/recruitment/${row.original.recruitmentId}/edit`, 
          icon: <RiEdit2Line size={20} /> 
        },
        { 
          type: "button", 
          label: "Rechazar recluta", 
          onClick: () => navigate(`?denyRecruit=true&recruitId=${row.original.recruitmentId}`), 
          icon: <RiCloseCircleFill size={20} />, 
          ref: "text-danger" 
        },
        { 
          type: "button", 
          label: "Aprobar recluta", 
          onClick: () => navigate(`?approveRecruit=true&recruitId=${row.original.recruitmentId}`), 
          icon: <RiCheckboxCircleFill size={20} />, 
          ref: "text-success" 
        }
      ]}
    />
  );
};

export const RecruitmentApproveDenyColumnDef: ColumnDef<Recruit>[] = [
  ...baseColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,  // Usamos el componente aquí
    enableSorting: false,
  }
];

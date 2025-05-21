import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { baseColumns } from "./baseColumns";
import { RiEdit2Line, RiEyeFill, RiUserFollowLine } from "@remixicon/react";
import { ColumnDef } from "@tanstack/react-table";
import { Recruit } from "@/types/index";
import { useNavigate } from "react-router-dom";
const ActionsColumn = ({ row }: { row: any }) => {
  const navigate = useNavigate();
  const status = row.original.status;

  let menuItems: DropdownItem[] = [
    {
      type: "link", label: "Ver recluta",
      onClick: () => navigate(`?viewRecruit=true&recruitId=${row.original.recruitmentId}`),
      icon: <RiEyeFill size={20} />
    }
  ];

  if (status != "0" && status != "3") {
    menuItems.push({
      type: "button", label: "Afiliar recluta",
      onClick: () => navigate(`/volunteers/create?recruitId=${row.original.recruitmentId}`),
      icon: <RiUserFollowLine size={20} />,
      ref: "text-success "
    });
    menuItems.push({
      type: "link", label: "Editar recluta",
      href: `/recruitment/${row.original.recruitmentId}/edit`,
      icon: <RiEdit2Line size={20} />
    });
  }

  if (status == "1") {
    menuItems = menuItems.filter(item => item.label !== "Afiliar recluta");
  }

  return <DropdownMenu items={menuItems} />;
};

export const recruitmentColumnsDef: ColumnDef<Recruit>[] = [
  ...baseColumns,
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <ActionsColumn row={row} />,
    enableSorting: false,
  }
];

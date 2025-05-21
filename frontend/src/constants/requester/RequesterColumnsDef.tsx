import { ColumnDef } from "@tanstack/react-table";
import { baseColumns } from "@/constants/requester/baseColumns";
import { RequesterType } from "@/types/requester.schema";
/*import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { RiEyeFill } from "@remixicon/react";*/

/*const ActionsColumn = ({ row }: { row: any }) => {
  return (
    <DropdownMenu
      items={[
        {
          type: "link", label: "Ver operación",
          href: `/requester/${row.original.requesterId}/edit`, 
          icon: <RiEyeFill size={20} />
        }
      ]}
    />
  );
};*/

export const requesterColumnsDef: ColumnDef<RequesterType>[] = [
  ...baseColumns,
  // {
  //   id: "actions",
  //   header: "Acciones",
  //   cell: ({ row }) => <ActionsColumn row={row} />,
  //   enableSorting: false,
  // }
];
  
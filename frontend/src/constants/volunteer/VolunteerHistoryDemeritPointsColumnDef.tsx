import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { DemeritPointList } from "@/types/demeritPoint.schema";
import { ColumnDef } from "@tanstack/react-table";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ActionsColumn = ({ row }: { row: any; table: any }) => {
    const navigate = useNavigate();

    const items: DropdownItem[] = [
        {
            type: "button",
            label: "Remover punto de demerito",
            onClick: () => navigate(`?delete-demerit-point=true&demeritPointId=${row.original.demeritId}`),
            icon: <RiIndeterminateCircleLine size={20} />,
            ref: "text-danger",
        }
    ];

    return <DropdownMenu items={items} />;
};

export const VolunteerHistoryDemeritPointsColumnDef: ColumnDef<DemeritPointList>[] = [
    { header: "Razón", accessorKey: "reason" },
    { header: "Fecha", accessorKey: "date" },
    { header: "Puntos perdidos", accessorKey: "pointsLost" },
    { header: "Observación", accessorKey: "observation" },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row, table }) => <ActionsColumn row={row} table={table} />,
        enableSorting: false,
    }
];
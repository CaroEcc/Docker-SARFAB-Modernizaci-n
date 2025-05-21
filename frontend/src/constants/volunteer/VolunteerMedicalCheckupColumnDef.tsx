import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { RiEdit2Line } from "@remixicon/react";
import { MedicalCheckup } from "@/types/volunteerMedicalCheckup";
import ExpandableText from "@/components/common/ShowMoreText/ShowMoreText";

const ActionsColumn = ({ row }: { row: any; table: any }) => {
    const navigate = useNavigate();
    const isFirstRow = row.index === 0;

    if (!isFirstRow) return <></>;

    const items: DropdownItem[] = [
        {
            type: "button",
            label: "Editar chequeo",
            onClick: () => navigate(`?edit-medical-checkup=true&medicalCheckupId=${row.original.checkupId}`),
            icon: <RiEdit2Line size={20} />,
        }
    ];

    return <DropdownMenu items={items} />;
};

export const volunteerMedicalCheckupColumnsDef: ColumnDef<MedicalCheckup>[] = [
    { header: "Fecha de chequeo", accessorKey: "checkupDate" },
    {
        header: "Fecha de expiración",
        accessorKey: "expirationDate",
        cell: ({ row }) => {
            const expiration = new Date(row.original.expirationDate);
            const today = new Date();

            // Resetear la hora para comparar solo por fecha
            expiration.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);

            const diffInDays = Math.ceil((expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            const isExpired = diffInDays < 0;
            const isExpiringSoon = diffInDays <= 7 && diffInDays >= 0;

            let statusText = "";
            let statusStyle = "";

            if (isExpired) {
                statusText = "Expirado";
                statusStyle = "text-danger font-bold";
            } else if (isExpiringSoon) {
                statusText = `Expira en ${diffInDays} día${diffInDays !== 1 ? "s" : ""}`;
                statusStyle = "text-warning font-bold";
            } else {
                statusText = "Vigente";
                statusStyle = "text-success font-bold";
            }

            return (
                <div className="flex flex-col items-center gap-2">
                    <span>{row.original.expirationDate}</span>
                    <span className={`text-sm ${statusStyle}`}>{statusText}</span>
                </div>
            );
        }
    },
    {
        header: "Observaciones",
        accessorKey: "observations",
        cell: ({ getValue }) => {
            const value = getValue<string>();
            return <ExpandableText text={value && value.trim() !== "" ? value : "Sin observaciones"} />;
        }
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row, table }) => <ActionsColumn row={row} table={table} />,
        enableSorting: false,
    }
];

export const volunteerHistoricalMedicalCheckupColumnsDef: ColumnDef<MedicalCheckup>[] = [
    { header: "Fecha de chequeo", accessorKey: "checkupDate" },
    { header: "Fecha de expiración", accessorKey: "expirationDate" },
    {
        header: "Observaciones", accessorKey: "observations",
        cell: ({ getValue }) => {
            const value = getValue<string>();

            return (
                <ExpandableText text={value ?? "Sin observaciones"} />
            );
        }
    },
];

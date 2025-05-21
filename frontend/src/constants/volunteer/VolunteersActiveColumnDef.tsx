import { Volunteer } from "@/types/volunteer.schema";
import { ColumnDef } from "@tanstack/react-table";
import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { useNavigate } from "react-router-dom";
import { RiArrowUpCircleLine, RiEdit2Line, RiEyeFill, RiFileUserFill, RiGraduationCapLine, RiShakeHandsFill } from "@remixicon/react";

const ActionsColumn = ({ row }: { row: any }) => {
    const navigate = useNavigate();
    const { gradeName, id} = row.original;

    const items: DropdownItem[] = [
        {
            type: "link",
            label: "Editar voluntario",
            href: `/volunteers/${id}/edit`,
            icon: <RiEdit2Line size={20} />,
        },
        {
            type: "link",
            label: "Ver voluntario",
            href: `/volunteers/${id}/view`,
            icon: <RiEyeFill size={20} />,
        },
        {
            type: "link",
            label: "Reporte de guardias",
            href: `/volunteers/${id}/report-guards?from=active`,
            icon: <RiFileUserFill size={20} />,
        },
        {
            type: "link",
            label: "Rep. de operaciones",
            href: `/volunteers/${id}/report-operations?from=active`,
            icon: <RiShakeHandsFill size={20} />,
        },
        ...(gradeName !== "Rescatista"
            ? ([
                  {
                      type: "button",
                      label: "Ascender de grado",
                      onClick: () =>
                          navigate(`?gradePromotion=true&volunteerId=${id}`),
                      icon: <RiArrowUpCircleLine size={20} />,
                      ref: "text-success",
                  },
              ] as DropdownItem[])
            : []),
        {
            type: "button",
            label: "Agregar curso",
            onClick: () => navigate(`?assingCourse=true&volunteerId=${id}`),
            icon: <RiGraduationCapLine size={20} />,
            ref: "text-primary",
        },
    ];

    return <DropdownMenu items={items} />;
};

export const volunteerColumnsDef: ColumnDef<Volunteer>[] = [
    { header: "Apellidos", accessorKey: "lastName" },
    { header: "Nombres", accessorKey: "name" },
    { header: "CI", accessorKey: "ci" },
    { header: "Número de celular", accessorKey: "mobilePhone" },
    { header: "Correo elétronico", accessorKey: "email" },
    { header: "Grado", accessorKey: "gradeName" },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => <ActionsColumn row={row} />,
        enableSorting: false,
    }
];
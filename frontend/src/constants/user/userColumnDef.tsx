import DropdownMenu from "@/components/common/DropdownMenu/DropdownMenu";
import { DeleteUserModal } from "@/components/user/DeleteUserModal";
import { PasswordRecoveryByAdminModal } from "@/components/user/PasswordRecoveryByAdminModal";
import UpdateUserModal from "@/components/user/UpdateUserModal";
import { UserSchema } from "@/types/user.schema";
import { RiEyeFill, RiLockPasswordFill } from "@remixicon/react";
import { FaUserCheck, FaUserEdit, FaUserTimes } from "react-icons/fa";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { EnableUserModal } from "@/components/user/EnableUserModal";

const statusConfig: Record<number, { text: string; className: string }> = {
    0: { text: "Deshabilitado", className: "bg-warning text-warning" },
    1: { text: "Habilitado", className: "bg-success text-success" },
};

export const userColumnDef: ColumnDef<UserSchema>[] = [

    { header: "Nombre completo", accessorKey: "fullName" },
    { header: "Nombre de usuario", accessorKey: "userName" },
    { header: "Correo electrónico", accessorKey: "email" },
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
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => <ActionsColumn row={row} />,
        enableSorting: false,
    }
];

const ActionsColumn = ({ row }: { row: any }) => {
    const [isModalOpen, setIsModalOpen] = useState<number>(0);

    const [userId, setUserId] = useState<number | null>(
        null,
    );

    const openModal = (operationId: number, modal: number) => {
        setUserId(operationId);
        setIsModalOpen(modal);
    };

    const closeModal = () => {
        setIsModalOpen(0);
        setUserId(null);
    };

    return (
        <>
            <DropdownMenu
                items={[
                    {
                        type: "button", label: "Ver usuario",
                        onClick: () => openModal(row.original.userId, 5),
                        icon: <RiEyeFill size={20} />
                    },
                    {
                        type: "button", label: "Editar usuario",
                        onClick: () => openModal(row.original.userId, 4),
                        icon: <FaUserEdit size={20} />
                    },
                    {
                        type: "button", label: "Restaurar contraseña",
                        onClick: () => openModal(row.original.userId, 3),
                        icon: <RiLockPasswordFill size={20} />
                    },
                    ...(row.original.status === 0
                        ? ([
                            {
                                type: 'button' as const,
                                label: 'Habilitar usuario',
                                onClick: () => openModal(row.original.userId, 2),
                                icon: <FaUserCheck size={20} />,
                            },
                        ] as const)
                        : []),
                    ...(row.original.status !== 0
                        ? ([
                            {
                                type: 'button' as const,
                                label: 'Deshabilitar usuario',
                                onClick: () => openModal(row.original.userId, 1),
                                icon: <FaUserTimes size={20} />,
                            },
                        ] as const)
                        : []),
                ]}
            />
            {
                (userId !== null && isModalOpen === 1) &&
                <DeleteUserModal isOpen={isModalOpen === 1} onClose={closeModal} userId={userId} />
            }
            {
                (userId !== null && isModalOpen === 2) &&
                <EnableUserModal isOpen={isModalOpen === 2} onClose={closeModal} userId={userId} />
            }
            {
                (userId !== null && isModalOpen === 3) &&
                <PasswordRecoveryByAdminModal isOpen={isModalOpen === 3} onClose={closeModal} userId={userId} />
            }
            {
                (userId !== null && (isModalOpen === 4 || isModalOpen === 5)) &&
                <UpdateUserModal isOpen={isModalOpen === 4 || isModalOpen === 5} onClose={closeModal} userId={userId} readonly={isModalOpen === 5} />
            }
        </>
    );
};
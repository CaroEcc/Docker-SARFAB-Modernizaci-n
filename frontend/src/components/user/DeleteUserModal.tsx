import { useCallback, useMemo } from "react";
import Modal from "../common/Modal/Modal";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { useDeleteUser } from "@/hooks/user/mutations/useDeleteUser";

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
}

export const DeleteUserModal = ({ isOpen, onClose, userId }: DeleteUserModalProps) => {
    const { mutate, isPending } = useDeleteUser();

    const handleConfirm = useCallback(() => {
        if (!userId) {
            return;
        }

        mutate(
            userId,
            { onSuccess: onClose }
        );
    }, [mutate, userId, onClose]);

    const buttons = useMemo(
        () => [
            {
                type: "button" as const,
                label: "Cancelar",
                onClick: onClose,
                variant: "secondary" as const,
                disabled: isPending,
            },
            {
                type: "button" as const,
                label: "Sí, estoy seguro",
                onClick: handleConfirm,
                variant: "primary" as const,
                isLoading: isPending,
                disabled: isPending,
            },
        ],
        [isPending, handleConfirm, onClose]
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Deshabilitar usuario">
            <div className="flex flex-col items-center gap-4">
                <p className="text-center">
                    Parece que quieres deshabilitar un usuario. <br />
                    ¿Estás seguro de que deseas deshabilitar a este usuario?
                </p>
            </div>
            <div className="mt-4">
                <ButtonGroup buttons={buttons} />
            </div>
        </Modal>
    );
};
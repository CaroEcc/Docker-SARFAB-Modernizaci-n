import { useCallback, useMemo } from "react";
import Modal from "../common/Modal/Modal";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { useEnableUser } from "@/hooks/user/mutations/useEnableUser";

interface EnableUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
}

export const EnableUserModal = ({ isOpen, onClose, userId }: EnableUserModalProps) => {
    const { mutate, isPending } = useEnableUser();

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
        <Modal isOpen={isOpen} onClose={onClose} title="Habilitar usuario">
            <div className="flex flex-col items-center gap-4">
                <p className="text-center">
                    Parece que quieres habilitar un usuario. <br />
                    ¿Estás seguro de que deseas habilitar a este usuario?
                </p>
            </div>
            <div className="mt-4">
                <ButtonGroup buttons={buttons} />
            </div>
        </Modal>
    );
};
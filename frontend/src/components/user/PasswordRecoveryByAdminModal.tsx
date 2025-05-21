import { useCallback, useMemo } from "react";
import Modal from "../common/Modal/Modal";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { usePasswordRecoveryByAdmin } from "@/hooks/user/mutations/usePasswordRecoveryByAdmin";

interface PasswordRecoveryByAdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: number;
}

export const PasswordRecoveryByAdminModal = ({ isOpen, onClose, userId }: PasswordRecoveryByAdminModalProps) => {
    const { mutate, isPending } = usePasswordRecoveryByAdmin();

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
        <Modal isOpen={isOpen} onClose={onClose} title="Restaurar contraseña">
            <div className="flex flex-col items-center gap-4">
                <p className="text-center">
                    Parece que quieres restaurar la contraseña de un usuario. <br />
                    ¿Estás seguro de que deseas restaurar la contraseña a este usuario?
                </p>
            </div>
            <div className="mt-4">
                <ButtonGroup buttons={buttons} />
            </div>
        </Modal>
    );
};
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import Modal from "../common/Modal/Modal";
import { RiArrowUpCircleFill } from "@remixicon/react";
import FormTextArea from "../common/FormTextArea/FormTextArea";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { useEndGuard } from "@/hooks/guard/mutations/useEndGuard";
import { VolunteerAttendance } from "@/types/guard.schema";

interface FinalizeGuardModalProps {
    isOpen: boolean;
    onClose: () => void;
    guardId: number;
    volunteerAttendance: VolunteerAttendance[];
}

export const FinalizeGuardModal = ({ isOpen, onClose, guardId, volunteerAttendance }: FinalizeGuardModalProps) => {
    const { mutate, isPending } = useEndGuard();
    const [observations, setObservations] = useState<string>("");

    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setObservations(e.target.value);
    }, []);

    const handleConfirm = useCallback(() => {
        mutate(
            { observations: observations.trim() || "Sin observaciones", guardId: guardId, volunteerAttendances: volunteerAttendance },
            { onSuccess: onClose }
        );
    }, [mutate, guardId, observations, onClose]);

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
        <Modal isOpen={isOpen} onClose={onClose} title="Finalizar guardia">
            <div className="flex flex-col items-center gap-4">
                <RiArrowUpCircleFill className="w-16 h-16 text-primary" />
                <p className="text-center">
                    Parece que quieres finalizar esta guardia. <br />
                    ¿Estás seguro de que deseas finalizarla?
                </p>
                <div className="w-full">
                    <FormTextArea
                        label="Observación"
                        placeholder="Añadir observaciones si es necesario"
                        name="observations"
                        defaultValue={observations}
                        register={() => ({ onChange: handleChange })}
                    />
                </div>
            </div>
            <div className="mt-4">
                <ButtonGroup buttons={buttons} />
            </div>
        </Modal>
    );
};
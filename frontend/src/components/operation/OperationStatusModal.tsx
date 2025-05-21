import { useCallback, useMemo, useState, ChangeEvent } from "react";
import Modal from "@/components/common/Modal/Modal";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { RiArrowUpCircleFill } from "@remixicon/react";
import { useOperationStatusMutation } from "@/hooks/operation/mutations/useOperationStatusMutation";
import FormTextArea from "@/components/common/FormTextArea/FormTextArea";
import { StatusEnum } from "@/types/military.schema";

interface FinalizeOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  operationId: number;
  onConfirm: () => void;
  isFinalizing: boolean;
}

export const OperationStatusModal = ({
  isOpen,
  onClose,
  operationId,
  onConfirm,
  isFinalizing,
}: FinalizeOperationModalProps) => {
  const { mutate, isPending } = useOperationStatusMutation();
  const [observations, setObservations] = useState<string>("");

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setObservations(e.target.value);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm();
    mutate(
      {
        id: operationId,
        formData: {
          status: StatusEnum.Disabled,
          observations: observations.trim() || "Sin observaciones",
        },
      },
      { onSuccess: onClose }
    );
  }, [mutate, operationId, observations, onClose, onConfirm]);

  const buttons = useMemo(
    () => [
      {
        type: "button" as const,
        label: "Cancelar",
        onClick: onClose,
        variant: "secondary" as const,
        disabled: isPending || isFinalizing,
      },
      {
        type: "button" as const,
        label: "Sí, estoy seguro",
        onClick: handleConfirm,
        variant: "primary" as const,
        isLoading: isPending || isFinalizing,
        disabled: isPending || isFinalizing,
      },
    ],
    [isPending, isFinalizing, handleConfirm, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Finalizar Operación">
      <div className="flex flex-col items-center gap-4">
        <RiArrowUpCircleFill className="w-16 h-16 text-primary" />
        <p className="text-center">
          Parece que quieres finalizar esta operación. <br />
          ¿Estás seguro de que deseas finalizarla?
        </p>
        <div className="w-full">
          <fieldset disabled={isFinalizing}>
            <FormTextArea
              label="Observación"
              placeholder="Añadir observaciones si es necesario"
              name="observations"
              defaultValue={observations}
              register={() => ({ onChange: handleChange })}
              disabled={isPending || isFinalizing}
            />
          </fieldset>
        </div>
      </div>
      <div className="mt-4">
        <ButtonGroup buttons={buttons} />
      </div>
    </Modal>
  );
};

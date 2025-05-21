import { useCallback, useMemo } from "react";
import Modal from "@/components/common/Modal/Modal";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { RiUserUnfollowLine, RiUserFollowLine } from "@remixicon/react";
import { useMilitaryStatusMutation } from "@/hooks/military/mutations/useMilitaryStatusMutation";

interface MilitaryStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  militaryId: number;
  currentStatus: number;
}

export const MilitaryStatusModal = ({ isOpen, onClose, militaryId, currentStatus }: MilitaryStatusModalProps) => {
  const { mutate, isPending } = useMilitaryStatusMutation();
  
  const isActivating = currentStatus === 0;
  const newStatus = isActivating ? 1 : 0;
  const title = isActivating ? "Activar Personal Militar" : "Desactivar Personal Militar";
  const description = isActivating
    ? "¿Estás seguro de que deseas activar a este personal militar?"
    : "¿Estás seguro de que deseas desactivar a este personal militar?";
  const Icon = isActivating ? RiUserFollowLine : RiUserUnfollowLine;

  const handleConfirm = useCallback(() => {
    mutate({ militaryId, status: newStatus }, { onSuccess: onClose });
  }, [mutate, militaryId, newStatus, onClose]);

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
        label: isActivating ? "Activar" : "Desactivar",
        onClick: handleConfirm,
        variant: "primary" as const,
        isLoading: isPending,
        disabled: isPending,
      },
    ],
    [isPending, isActivating, handleConfirm, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center gap-4">
        <Icon className="w-16 h-16 text-primary" />
        <p className="text-center">{description}</p>
      </div>
      <div className="mt-4">
        <ButtonGroup buttons={buttons} />
      </div>
    </Modal>
  );
};

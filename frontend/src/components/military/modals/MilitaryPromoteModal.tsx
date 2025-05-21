import Modal from "@/components/common/Modal/Modal";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { RiArrowUpCircleLine } from "@remixicon/react";
import { useMilitaryPromotionMutation } from "@/hooks/military/mutations/useMilitaryPromotionMutation";

interface MilitaryPromoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  militaryId: number;
}

export const MilitaryPromoteModal = ({ isOpen, onClose, militaryId }: MilitaryPromoteModalProps) => {
  const { mutate, isPending } = useMilitaryPromotionMutation();

  const handleConfirm = () => {
    mutate(militaryId, { 
      onSuccess: onClose
    });
  };

  const buttons = [
    {
      type: "button" as const,
      label: "Cancelar",
      onClick: onClose,
      variant: "secondary" as const,
      disabled: isPending,
    },
    {
      type: "button" as const,
      label: "Ascender",
      onClick: handleConfirm,
      variant: "primary" as const,
      isLoading: isPending,
      disabled: isPending,
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Ascenso">
      <div className="flex flex-col items-center gap-4">
        <RiArrowUpCircleLine className="w-16 h-16 text-primary" />
        <p className="text-center">¿Estás seguro de que deseas ascender a este militar?</p>
      </div>
      <div className="mt-4">
        <ButtonGroup buttons={buttons} />
      </div>
    </Modal>
  );
};

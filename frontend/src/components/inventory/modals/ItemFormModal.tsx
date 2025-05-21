import { useItemFormLogic } from "@/hooks/inventory/useItemFormLogic";
import Modal from "@/components/common/Modal/Modal";
import { ItemForm } from "../forms/ItemForm";
import Loader from "@/components/common/Loader";

interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId?: number;
}

export function ItemFormModal({
  isOpen,
  onClose,
  itemId,
}: ItemFormModalProps) {
  const { isLoading, handleFormSubmit, formProps, assignedQuantity } = useItemFormLogic({
    isOpen,
    itemId,
    onClose,
  });

  return (
    <Modal
      key={itemId}
      title={
        itemId
          ? "Editar elemento"
          : "Registrar elemento"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {isLoading ? (
        <Loader message="Cargando datos previos para edición de elemento" />
      ) : (
        <ItemForm
          {...formProps}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          onClose={onClose}
          itemId={itemId}
          assignedQuantity={assignedQuantity}
        />
      )}
    </Modal>
  );
}

import { useOperationTypeFormLogic } from "@/hooks/configuration/useOperationTypeFormLogic";
import Modal from "@/components/common/Modal/Modal";
import { OperationTypeForm } from "../forms/OperationTypeForm";
import Loader from "@/components/common/Loader";

interface OperationTypeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  typeId?: number;
  typeData?: { name: string; operationCategoryId: number };
}

export function OperationTypeFormModal({
  isOpen,
  onClose,
  typeId,
  typeData,
}: OperationTypeFormModalProps) {
  const { 
    isLoading, 
    handleFormSubmit, 
    formProps, 
    categoryOptions, 
    selectedCategoryName, 
    handleCategoryChange 
  } = useOperationTypeFormLogic({
    isOpen,
    typeId,
    typeData,
    onClose,
  });

  return (
    <Modal
      key={typeId}
      title={
        typeId
          ? "Editar tipo de operación"
          : "Registrar tipo de operación"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {isLoading && !formProps.form ? (
        <Loader message="Cargando datos previos" />
      ) : (
        <OperationTypeForm
          {...formProps}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          onClose={onClose}
          typeId={typeId}
          categoryOptions={categoryOptions}
          selectedCategoryName={selectedCategoryName}
          handleCategoryChange={handleCategoryChange}
        />
      )}
    </Modal>
  );
}

import { RiAddLine } from "@remixicon/react";
import { useState } from "react";
import { OperationCategoryFormModal } from "./modals/OperationCategoryFormModal";

interface OperationCategoryHeaderProps {
  onOpenTypeModal?: () => void;
}

export function OperationCategoryHeader({ onOpenTypeModal }: OperationCategoryHeaderProps) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const openCategoryModal = () => setIsCategoryModalOpen(true);
  const closeCategoryModal = () => setIsCategoryModalOpen(false);

  return (
    <>
      <nav className="flex flex-wrap items-center gap-3 mb-5">
        <button 
          onClick={openCategoryModal}
          className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-white hover:bg-opacity-90"
        >
          <RiAddLine className="me-2" /> Registrar categoría de operación
        </button>
        <button 
          onClick={onOpenTypeModal}
          className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-white hover:bg-opacity-90"
        >
          <RiAddLine className="me-2" /> Registrar tipo de operación
        </button>
      </nav>
      <OperationCategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={closeCategoryModal}
      />
    </>
  );
}

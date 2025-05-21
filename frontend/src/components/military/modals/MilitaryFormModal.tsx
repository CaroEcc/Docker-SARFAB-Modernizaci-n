import { useMilitaryFormLogic } from '@/hooks/military/forms/useMilitaryFormLogic';
import Modal from '@/components/common/Modal/Modal';
import { MilitaryForm } from './MilitaryForm';
import { MilitaryFormModalProps } from '@/components/military/types/MilitaryFormModalProps';
import Loader from '@/components/common/Loader';

export function MilitaryFormModal({
  isOpen,
  onClose,
  militaryId,
}: MilitaryFormModalProps) {
  const { isLoading, handleFormSubmit, formProps } = useMilitaryFormLogic({
    isOpen,
    militaryId,
    onClose,
  });

  return (
    <Modal
      key={militaryId}
      title={
        militaryId ? 'Editar personal militar' : 'Registrar personal militar'
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      {isLoading ? (
        <Loader message={`Cargando datos previos para ${militaryId ? 'edición' : 'registro'} de personal militar`} />
      ) : (
        <MilitaryForm
          {...formProps}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          onClose={onClose}
          militaryId={militaryId}
        />
      )}
    </Modal>
  );
}

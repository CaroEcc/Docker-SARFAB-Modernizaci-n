import { useState } from 'react';
import { useRegisterDemeritAndUpdateStatus } from '@/hooks/operation/mutations/useRegisterDemeritAndUpdateStatus';
import { AbsenceMarkResponse, UpdatePersonStatusForm } from '@/types/operation.schema';
import { DemeritPoint } from '@/types/demeritPoint.schema';
import { FaRegCircleCheck, FaRegCircleXmark } from 'react-icons/fa6';
import BackLink from '../common/BackLink/BackLink';
import FormDate from '../common/FormDate/FormDate';
import FormInput from '../common/FormInput/FormInput';
import FormTextArea from '../common/FormTextArea/FormTextArea';
import Modal from '@/components/common/Modal/Modal';
import ButtonGroup from '../common/ButtonGroup/ButtonGroup';
import { OperationStatusModal } from './OperationStatusModal';
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import ErrorFormMessage from '../common/ErrorFormMessage/ErrorFormMessage';

export default function OperationAbsenceInfo({
  data,
  operationId,
}: {
  data: AbsenceMarkResponse;
  operationId: number;
}) {
  const { mutate: finalizeChanges, isPending } = useRegisterDemeritAndUpdateStatus();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [selectedPerson, setSelectedPerson] = useState<{ personId: number; fullName: string } | null>(null);
  const [observation, setObservation] = useState('');
  const [attendanceList, setAttendanceList] = useState<{
    statusData: UpdatePersonStatusForm;
    demeritData?: DemeritPoint;
  }[]>([]);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pendingFinalize, setPendingFinalize] = useState(false);

  const allMarked = data.volunteers.every((v) =>
    attendanceList.some((a) => a.statusData.personId === v.personId)
  );

  const handleAssignAssistance = (personId: number, status: number) => {
    if (status === 2) {
      const person = data.volunteers.find((v) => v.personId === personId);
      if (person) setSelectedPerson({ personId, fullName: person.fullName });
      return;
    }

    setAttendanceList((prev) => [
      ...prev.filter((a) => a.statusData.personId !== personId),
      {
        statusData: { operationId, personId, status },
      },
    ]);
  };

  const handleConfirmNoAssistance = () => {
    if (!selectedPerson) return;

    setAttendanceList((prev) => [
      ...prev.filter((a) => a.statusData.personId !== selectedPerson.personId),
      {
        statusData: {
          operationId,
          personId: selectedPerson.personId,
          status: 2,
        },
        demeritData: {
          volunteerId: selectedPerson.personId,
          reason: `Operación: ${data.activity}`,
          date: data.departureDate.split('T')[0],
          observation: observation.trim() || 'Ninguna',
        },
      },
    ]);

    setSelectedPerson(null);
    setObservation('');
  };

  const handleFinalize = () => {
    if (!allMarked) {
      setErrorMessage('Debes registrar todas las asistencias antes de finalizar la operación.');
      return;
    }

    setErrorMessage('');
    setShowFinalizeModal(true);
  };

  const handleConfirmFinalize = () => {
    setPendingFinalize(true);
    finalizeChanges(attendanceList, {
      onSuccess: () => {
        setPendingFinalize(false);
        setShowFinalizeModal(false);
        queryClient.invalidateQueries({ queryKey: ['operationDetail', operationId] });
        navigate("/operation/list");
      },
    });
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="rounded-md border border-stroke bg-white py-6 px-2 sm:p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="-mx-6 -mt-2">
          <BackLink
            text="Volver al listado de operaciones"
            link="/operation/list"
            className="pt-0"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white mt-4 ml-4">
          Datos generales de la operación
        </h2>
        <div className="flex flex-col sm:flex-row m-4 gap-4">
          <article className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 flex-1 w-full">
            <FormInput label="Departamento" name="departmentName" type="text" readonly defaultValue={data.departmentName} className="bg-gray text-black dark:text-white text-center" />
            <FormInput label="Provincia" name="provinceName" type="text" readonly defaultValue={data.provinceName} className="bg-gray text-black dark:text-white text-center" />
            <div className="flex flex-col md:col-span-2">
              <FormInput label="Categoría y tipo de operación" name="activity" type="text" readonly defaultValue={data.activity} className="bg-gray text-black dark:text-white text-center" />
            </div>
          </article>
          <article className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 flex-1 w-full">
            <FormInput label="Municipio" name="municipalityName" type="text" readonly defaultValue={data.municipalityName} className="bg-gray text-black dark:text-white text-center" />
            <FormDate label="Fecha de salida" name="departureDate" readonly defaultValue={data.departureDate?.split('T')[0]} className="bg-gray text-black dark:text-white text-center" />
            <div className="flex flex-col md:col-span-2">
              <FormDate label="Fecha de llegada" name="arrivalDate" readonly defaultValue={data.arrivalDate?.split('T')[0]} className="bg-gray text-black dark:text-white text-center" />
            </div>
          </article>
        </div>
      </div>

      <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
          Control de asistencia
        </h2>
        <p className="mb-2">Lista de voluntarios que asistieron a la operación</p>
        <div className="overflow-x-auto mx-auto px-0 sm:px-4">
          <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Nombre completo
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Grado
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {data.volunteers?.map((person) => {
                const attendance = attendanceList.find((a) => a.statusData.personId === person.personId);
                return (
                  <tr key={person.personId} className="border border-stroke dark:border-strokedark">
                    <td className="py-2 px-4 border border-stroke dark:border-strokedark">{person.fullName}</td>
                    <td className="py-2 px-4 border border-stroke dark:border-strokedark">{person.rankOrGrade}</td>
                    <td className="flex justify-center items-center gap-8 py-2 px-4 border border-stroke dark:border-strokedark">
                      <FaRegCircleCheck
                        size={24}
                        color={attendance?.statusData.status === 1 ? 'green' : 'grey'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleAssignAssistance(person.personId, 1)}
                      />
                      <FaRegCircleXmark
                        size={24}
                        color={attendance?.statusData.status === 2 ? 'red' : 'grey'}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleAssignAssistance(person.personId, 2)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {errorMessage && (
          <div className="mt-4 text-right">
            <ErrorFormMessage customClass="text-sm md:text-sm font-semibold">{errorMessage}</ErrorFormMessage>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <ButtonGroup
          buttons={[
            {
              type: 'button',
              label: 'Finalizar operación',
              onClick: handleFinalize,
              variant: 'primary',
              disabled: isPending,
              isLoading: isPending,
            },
            {
              type: 'button',
              label: 'Cancelar',
              onClick: () => navigate("/operation/list"),
              variant: 'secondary',
              disabled: isPending,
            },
          ]}
        />
      </div>

      {selectedPerson && (
        <Modal
          title="Confirmar inasistencia"
          isOpen={!!selectedPerson}
          onClose={() => setSelectedPerson(null)}
        >
          <p className="text-gray-600 mb-4">
            ¿Estás seguro de que <strong>{selectedPerson.fullName}</strong> NO asistió a la operación?
          </p>
          <FormTextArea
            label="Observaciones"
            placeholder="Ingrese observaciones..."
            name="observation"
            defaultValue={observation}
            className="mb-4"
            register={() => ({
              onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setObservation(e.target.value),
            })}
          />
          <div className="flex justify-end gap-4 mt-6">
            <ButtonGroup
              buttons={[
                {
                  type: 'button',
                  label: 'Confirmar',
                  onClick: handleConfirmNoAssistance,
                  variant: 'primary',
                },
                {
                  type: 'button',
                  label: 'Cancelar',
                  onClick: () => setSelectedPerson(null),
                  variant: 'secondary',
                },
              ]}
            />
          </div>
        </Modal>
      )}

      <OperationStatusModal
        isOpen={showFinalizeModal}
        onClose={() => setShowFinalizeModal(false)}
        operationId={operationId}
        onConfirm={handleConfirmFinalize}
        isFinalizing={pendingFinalize}
      />
    </section>
  );
}

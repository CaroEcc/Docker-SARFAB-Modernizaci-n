import { useState } from 'react';
import { OperationPersonnelFormProps } from './types/OperationPersonnelFormProps';
import FilterDatalist from '@/components/common/FilterDatalist/FilterDatalist';
import Button from '@/components/common/Button/Button';
import ErrorFormMessage from '../common/ErrorFormMessage/ErrorFormMessage';

export default function OperationPersonnelForm({
  errors,
  setValue,
  military,
  volunteers,
}: OperationPersonnelFormProps) {
  const [selectedResponsible, setSelectedResponsible] = useState<number | null>(
    null,
  );
  const [personnel, setPersonnel] = useState<
    { personId: number; role: string; displayName: string; rank: string }[]
  >([]);
  const [selectedMilitary, setSelectedMilitary] = useState<string>('');
  const [selectedVolunteer, setSelectedVolunteer] = useState<string>('');

  const mappedMilitary =
    military?.map(
      ({ militaryId, firstName, lastName, rankName, abbreviation }) => ({
        id: militaryId,
        name: `${abbreviation} ${lastName} ${firstName}`,
        displayName: `${lastName} ${firstName}`,
        rank: rankName,
      }),
    ) || [];

  const mappedVolunteers =
    volunteers?.map(
      ({ volunteerId, firstName, lastName, gradeName, abbreviation }) => ({
        id: volunteerId,
        name: `${abbreviation} ${lastName} ${firstName}`,
        displayName: `${lastName} ${firstName}`,
        rank: gradeName,
      }),
    ) || [];

  const availableMilitary = mappedMilitary.filter(
    (m) =>
      m.id !== selectedResponsible &&
      !personnel.some((p) => p.personId === m.id),
  );
  const availableVolunteers = mappedVolunteers.filter(
    (v) => !personnel.some((p) => p.personId === v.id),
  );

  const availableResponsibleMilitary = mappedMilitary.filter(
    (m) => !personnel.some((p) => p.personId === m.id),
  );

  const handleAddPersonnel = (
    personId: number,
    role: string,
    displayName: string,
    rank: string,
  ) => {
    if (!personnel.some((p) => p.personId === personId)) {
      const updatedPersonnel = [
        ...personnel,
        { personId, role, displayName, rank },
      ];
      setPersonnel(updatedPersonnel);
      setValue('personnel', updatedPersonnel, { shouldValidate: true });
    }
  };

  const handleRemovePersonnel = (personId: number) => {
    const updatedPersonnel = personnel.filter((p) => p.personId !== personId);
    setPersonnel(updatedPersonnel);
    setValue('personnel', updatedPersonnel, { shouldValidate: true });
  };

  return (
    <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        Asignación de rescatistas / voluntarios y responsable
      </h2>

      <FilterDatalist
        name="responsible"
        label="Responsable"
        options={availableResponsibleMilitary}
        onChange={(value) => {
          if (!value) {
            setSelectedResponsible(null);
            setValue('responsible', { personId: 0, role: 'Responsable' }, { shouldValidate: true });
            return;
          }
          const selected = mappedMilitary.find(
            (option) => option.name === value,
          );
          setSelectedResponsible(selected?.id || null);
          setValue('responsible', {
            personId: selected?.id || 0,
            role: 'Responsable',
          }, { shouldValidate: true });
        }}
        value={
          selectedResponsible
            ? mappedMilitary.find((option) => option.id === selectedResponsible)
                ?.name || ''
            : ''
        }
      />
      {errors.responsible && (
        <ErrorFormMessage>{errors.responsible.message}</ErrorFormMessage>
      )}

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
          <div className="flex-1">
            <FilterDatalist
              name="military"
              label="Seleccionar al personal militar"
              options={availableMilitary}
              onChange={(value) => setSelectedMilitary(value)}
              value={selectedMilitary}
            />
          </div>
          <div className="sm:flex-none mt-2 sm:mt-0">
            <Button
              label="Agregar"
              onClick={() => {
                const selected = availableMilitary.find(
                  (option) => option.name === selectedMilitary,
                );
                if (selected) {
                  handleAddPersonnel(
                    selected.id,
                    'Personal Militar',
                    selected.displayName,
                    selected.rank,
                  );
                  setSelectedMilitary('');
                }
              }}
              variant="primary"
              disabled={!selectedMilitary}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
          <div className="flex-1">
            <FilterDatalist
              name="volunteer"
              label="Seleccionar a un voluntario"
              options={availableVolunteers}
              onChange={(value) => setSelectedVolunteer(value)}
              value={selectedVolunteer}
            />
          </div>
          <div className="sm:flex-none mt-2 sm:mt-0">
            <Button
              label="Agregar"
              onClick={() => {
                const selected = availableVolunteers.find(
                  (option) => option.name === selectedVolunteer,
                );
                if (selected) {
                  handleAddPersonnel(
                    selected.id,
                    'Voluntario',
                    selected.displayName,
                    selected.rank,
                  );
                  setSelectedVolunteer('');
                }
              }}
              variant="primary"
              disabled={!selectedVolunteer}
            />
          </div>
        </div>
        {errors.personnel && (
          <ErrorFormMessage>{errors.personnel.message}</ErrorFormMessage>
        )}
      </div>

      <div className="mt-4 border border-stroke dark:border-strokedark rounded-md">
        <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
              <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                Nombre
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
            {personnel.length > 0 ? (
              personnel
                .slice()
                .sort((a) => (a.role === 'Personal Militar' ? -1 : 1))
                .map((person) => (
                  <tr
                    key={person.personId}
                    className="border border-stroke dark:border-strokedark"
                  >
                    <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                      {person.displayName}
                    </td>
                    <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                      {person.rank}
                    </td>
                    <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                      <button
                        onClick={() => handleRemovePersonnel(person.personId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr className="border border-stroke dark:border-strokedark">
                <td
                  colSpan={3}
                  className="py-4 text-center text-gray-500 border border-stroke dark:border-strokedark"
                >
                  Aún no se han agregado registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

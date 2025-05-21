import { OperationDetailResponse } from '@/types/operation.schema';
import Button from '../common/Button/Button';
import { Link } from 'react-router-dom';

export default function OperationPersonnelDetail({
  operation,
}: {
  operation: OperationDetailResponse;
}) {
  return (
    <>
      <section className="space-y-6">
        {operation.operationStatus !== 'Finalizada' && (
          <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Acciones
            </h2>
            <article className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-10">
              <div className="flex flex-col md:col-span-2">
                <Link to={`/operation/${operation.operationId}/absence`}>
                  <Button label="Marcar operación como finalizada" classname="w-full" />
                </Link>
              </div>
              <div className="flex flex-col md:col-span-2">
                <Link to={`/operation/${operation.operationId}/edit`}>
                  <Button label="Editar operación" classname="w-full" />
                </Link>
              </div>
            </article>
          </div>
        )}


        <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
            Apartado de responsable, personal militar y voluntarios
          </h2>
          <div className="mb-4">
            <label className="mb-2.5 block text-black dark:text-white">
              Responsable
            </label>
            <div className="w-full rounded border-[1.5px] border-stroke py-3 px-5 font-medium outline-none bg-[#F1F5F9] text-black dark:text-white text-center break-words dark:border-form-strokedark dark:bg-form-input">
              {operation.responsible
                ? `${operation.responsible.rankOrGrade} - ${operation.responsible.fullName}`
                : ''}
            </div>
          </div>

          <label className="mb-2.5 block text-black dark:text-white">Personal asignado</label>
          <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Nombre
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Grado
                </th>
              </tr>
            </thead>
            <tbody>
              {operation.personnel?.length > 0 ? (
                operation.personnel
                  .slice()
                  .sort((a) => (a.rankOrGrade.includes('Militar') ? -1 : 1))
                  .map((person) => (
                    <tr
                      key={person.personId}
                      className="border border-stroke dark:border-strokedark"
                    >
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        {person.fullName}
                      </td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        {person.rankOrGrade}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr className="border border-stroke dark:border-strokedark">
                  <td
                    colSpan={2}
                    className="py-4 text-center text-gray-500 border border-stroke dark:border-strokedark"
                  >
                    Aún no se han agregado registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

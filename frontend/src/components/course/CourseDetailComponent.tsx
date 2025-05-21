import { useState } from "react";
import { CourseDetail } from "@/types/courses.schema";
import FormInput from "../common/FormInput/FormInput";
import BackLink from "../common/BackLink/BackLink";

export default function CourseDetailComponent({ course }: { course: CourseDetail }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(course.participants.length / itemsPerPage);

  const currentParticipants = course.participants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="flex flex-col gap-6">
        <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <div className="-mx-6 -mt-2">
            <BackLink
              text="Regresar al listado de cursos"
              link="/courses/list"
              className="pt-0"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4 ml-4 text-black dark:text-white mt-4">
            Datos generales del curso
          </h2>
          <div className="flex flex-col gap-4 mb-4 mx-4">
            <FormInput
              label="Nombre del curso"
              name="name"
              type="text"
              readonly
              defaultValue={course.name}
              className="bg-gray text-black dark:text-white text-center"
            />

            <div className="w-full">
              <label htmlFor="description" className="mb-2.5 block text-black dark:text-white">
                Descripción del curso
              </label>
              <div className="relative">
                <div
                  className="w-full rounded border-[1.5px] border-stroke bg-gray py-3 px-5 pr-10 font-medium outline-none dark:border-form-strokedark dark:bg-form-input text-black dark:text-white text-left whitespace-pre-wrap"
                >
                  {course.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mt-4">
        <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-2xl font-semibold mb-4 mx-4 text-black dark:text-white">
            Detalle de personas que realizaron el curso
          </h2>
          <div className="px-4">
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
                    Fecha de finalización
                  </th>
                </tr>
              </thead>
              <tbody>
                {course.participants.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-4 px-4 text-center text-black dark:text-white">
                      No hay personas registradas en el curso aún.
                    </td>
                  </tr>
                ) : (
                  currentParticipants.map((participant) => (
                    <tr key={participant.fullName} className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                      <td className="py-4 px-4 text-center text-black dark:text-white">
                        {participant.fullName}
                      </td>
                      <td className="py-4 px-4 text-center text-black dark:text-white">
                        {participant.rank}
                      </td>
                      <td className="py-4 px-4 text-center text-black dark:text-white">
                      {participant.completionDate.split('-').reverse().join('/')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {course.participants.length > 0 && (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-6 border-t border-stroke py-5 px-4 dark:border-strokedark">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className={`flex items-center justify-center rounded border border-stroke bg-white py-1 px-3.5 text-sm font-medium text-black hover:bg-gray-2 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:bg-graydark ${
                      currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="block sm:hidden">«</span>
                    <span className="hidden sm:block">Anterior</span>
                  </button>

                  <div className="font-medium text-sm text-black dark:text-white">
                    Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className={`flex items-center justify-center rounded border border-stroke bg-white py-1 px-3.5 text-sm font-medium text-black hover:bg-gray-2 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:bg-graydark ${
                      currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="block sm:hidden">»</span>
                    <span className="hidden sm:block">Siguiente</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 items-center">
                  <span className="text-sm text-black dark:text-white">Ir a la página:</span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                    className="rounded border border-stroke py-1 px-2 text-sm text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary w-16 text-center"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

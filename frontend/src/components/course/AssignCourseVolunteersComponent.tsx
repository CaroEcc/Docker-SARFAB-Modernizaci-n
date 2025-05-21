import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  assignCourseVolunteersSchema,
  AssignCourseVolunteersForm,
  CourseDetail,
} from "@/types/courses.schema";
import { useAssignMultipleVolunteersToCourse } from "@/hooks/courseVolunteer/mutations/useAssignMultipleVolunteersToCourse";
import BackLink from "../common/BackLink/BackLink";
import FormInput from "../common/FormInput/FormInput";
import FilterDatalist from "../common/FilterDatalist/FilterDatalist";
import Button from "../common/Button/Button";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "../common/FormDate/FormDate";

interface SelectedVolunteer {
  volunteerId: number;
  fullName: string;
  rank: string;
  completionDate: string;
}

interface VolunteerWithoutCourse {
  volunteerId: number;
  firstName: string;
  lastName: string;
  abbreviation: string;
}

interface Props {
  course: CourseDetail;
  volunteersWithoutCourse: VolunteerWithoutCourse[];
}

export default function AssignCourseVolunteersComponent({ course, volunteersWithoutCourse }: Props) {
  const [selectedVolunteerName, setSelectedVolunteerName] = useState("");
  const [addedVolunteers, setAddedVolunteers] = useState<SelectedVolunteer[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [addError, setAddError] = useState("");
  const navigate = useNavigate();

  const courseId = (course as any).courseId || course.id;
  const assignMutation = useAssignMultipleVolunteersToCourse();

  const {
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AssignCourseVolunteersForm>({
    resolver: zodResolver(assignCourseVolunteersSchema),
    defaultValues: {
      courseId,
      volunteers: [],
    },
  });

  useEffect(() => {
    setValue(
      "volunteers",
      addedVolunteers.map(v => ({
        volunteerId: v.volunteerId,
        completionDate: v.completionDate,
      }))
    );
    trigger("volunteers");
  }, [addedVolunteers, setValue, trigger]);

  const volunteerOptions = volunteersWithoutCourse.map(volunteer => ({
    id: volunteer.volunteerId.toString(),
    name: `${volunteer.abbreviation} - ${volunteer.lastName} ${volunteer.firstName}`,
    key: volunteer.volunteerId.toString()
  })) || [];

  const filteredOptions = volunteerOptions.filter(
    option => !addedVolunteers.some(v => v.volunteerId.toString() === option.id)
  );

  const handleVolunteerChange = (value: string) => {
    setSelectedVolunteerName(value);
    setAddError("");
  };

  const handleAddVolunteer = () => {
    const input = selectedVolunteerName.trim();
    if (!input) {
      setAddError("Debe seleccionar un voluntario válido.");
      return;
    }

    const selectedOption = volunteerOptions.find(option => option.name === input);
    if (!selectedOption) {
      setAddError("Debe seleccionar un voluntario válido.");
      return;
    }

    const volunteerData = volunteersWithoutCourse.find(
      v => v.volunteerId.toString() === selectedOption.id
    );
    if (!volunteerData) return;

    const isDuplicate = addedVolunteers.some(v => v.volunteerId === volunteerData.volunteerId);
    if (isDuplicate) {
      setAddError("El voluntario ya fue agregado.");
      return;
    }

    const newVolunteer: SelectedVolunteer = {
      volunteerId: volunteerData.volunteerId,
      fullName: `${volunteerData.lastName} ${volunteerData.firstName}`,
      rank: volunteerData.abbreviation,
      completionDate: "",
    };

    setAddedVolunteers(prev => [...prev, newVolunteer]);
    setSelectedVolunteerName("");
    setAddError("");
  };

  const handleDateChange = (volunteerId: number, date: string) => {
    setAddedVolunteers(prev =>
      prev.map(v => v.volunteerId === volunteerId ? { ...v, completionDate: date } : v)
    );
  };

  const handleRemoveVolunteer = (volunteerId: number) => {
    setAddedVolunteers(prev => prev.filter(v => v.volunteerId !== volunteerId));
  };

  const onSubmit = (data: AssignCourseVolunteersForm) => {
    if (addedVolunteers.length === 0) {
      setAddError("Debe agregar al menos un voluntario.");
      return;
    }

    if (addedVolunteers.some(v => !v.completionDate)) {
      setAddError("Debe seleccionar la fecha de finalización para cada voluntario.");
      return;
    }

    setIsAssigning(true);
    assignMutation.mutate(data, {
      onSuccess: () => {
        setIsAssigning(false);
        navigate("/courses/list");
      },
      onError: () => {
        setIsAssigning(false);
      },
    });
  };

  return (
    <section>
      <div className="flex flex-col gap-6">
        <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <div className="-mx-6 -mt-2">
            <BackLink text="Regresar al listado de cursos" link="/courses/list" className="pt-0" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 mx-4 text-black dark:text-white mt-4">
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
                <div className="w-full rounded border-[1.5px] border-stroke bg-gray py-3 px-5 pr-10 font-medium outline-none dark:border-form-strokedark dark:bg-form-input text-black dark:text-white text-left whitespace-pre-wrap">
                  {course.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
          <h2 className="text-2xl font-semibold mb-4 mx-4 text-black dark:text-white">
            Seleccionar los voluntarios que realizarán el curso
          </h2>
          <div className="mb-4 mx-4">
            <div className="w-full flex flex-col sm:flex-row sm:w-1/2 gap-4">
              <FilterDatalist
                label="Seleccionar voluntario"
                name="volunteer"
                options={filteredOptions}
                onChange={handleVolunteerChange}
                value={selectedVolunteerName}
                showLabel={false}
                disabled={isAssigning}
              />
              <Button
                label="Agregar"
                type="button"
                onClick={handleAddVolunteer}
                disabled={isAssigning}
              />
            </div>
            {addError && <ErrorFormMessage>{addError}</ErrorFormMessage>}
          </div>

          <div className="mx-4 mt-4 border border-stroke dark:border-strokedark rounded-md">
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
                  <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {addedVolunteers.length > 0 ? (
                  addedVolunteers.map((volunteer) => (
                    <tr key={volunteer.volunteerId} className="border border-stroke dark:border-strokedark">
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        {volunteer.fullName}
                      </td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        {volunteer.rank}
                      </td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        <FormDate
                          name={`completionDate-${volunteer.volunteerId}`}
                          label=""
                          required={false}
                          defaultValue={volunteer.completionDate}
                          className="text-center"
                          register={() => ({
                            onChange: (e: any) => handleDateChange(volunteer.volunteerId, e.target.value),
                          })}
                        />
                      </td>
                      <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                        <button
                          onClick={() => handleRemoveVolunteer(volunteer.volunteerId)}
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
                      colSpan={4}
                      className="py-4 text-center text-gray-500 border border-stroke dark:border-strokedark"
                    >
                      Aún no se han agregado voluntarios al curso.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {errors.volunteers?.message && (
              <ErrorFormMessage>{errors.volunteers.message}</ErrorFormMessage>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <ButtonGroup
            buttons={[
              {
                type: "button",
                label: isAssigning ? "Asignando..." : "Asignar voluntarios",
                onClick: handleSubmit(onSubmit),
                variant: "primary",
                disabled: isAssigning,
              },
              {
                type: "button",
                label: "Cancelar",
                onClick: () => navigate("/courses/list"),
                variant: "secondary",
                disabled: isAssigning,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

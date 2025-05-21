import Button from "@/components/common/Button/Button";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import FormSelect from "@/components/common/FormSelect/FormSelect";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal/Modal";
import { useCoursesSelect } from "@/hooks/courses/querys/useCoursesSelectData";
import { useAssingCourseVolunteer } from "@/hooks/courseVolunteer/mutations/useAssingCourseVolunteer";
import { useCourseVolunteerForm } from "@/hooks/volunteer/forms/useCourseVolunteerForm";
import { CourseVolunteer } from "@/types/courseVolunteer.schema";
import { RiBook2Line } from "@remixicon/react";
import { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerCourseAssingModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const volunteerId = Number(queryParams.get("volunteerId"));
    const isAssingCourseModal = queryParams.get("assingCourse");
    const isOpen = !!isAssingCourseModal;

    const initialValues: CourseVolunteer = {
        volunteerId: Number(volunteerId),
        courseId: 0,
        completionDate: "",
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, isLoading, error } = useCoursesSelect(volunteerId);
    const { register, handleSubmit, formState: { errors }, control } = useCourseVolunteerForm(initialValues);

    const { mutate } = useAssingCourseVolunteer();

    const onSubmit = async (data: CourseVolunteer) => {
        if (!volunteerId) return;

        const formattedData: CourseVolunteer = {
            volunteerId: Number(volunteerId),
            courseId: Number(data.courseId),
            completionDate: data.completionDate,
        };

        try {
            setIsSubmitting(true);
            await mutate(formattedData);
        } catch (error) {
            console.error("Error al asignar el curso", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal title={"Agregar curso a voluntario"} isOpen={isOpen} onClose={() => navigate(location.pathname, { replace: true })}>
            {
                isLoading ?
                    <Loader message="Cargando cursos..."/> :
                    error ? (
                        <p>Error al cargar los datos del reclutamiento.</p>
                    ) : !data || data.length === 0 ? (
                        <p className="text-gray-500">No hay cursos disponibles.</p>
                    ) : (
                        <>
                            <p className="text-lg font-thin text-gray-600 mb-6">
                                Parece que quieres asignar un curso a este voluntario.
                                <span className="text-body font-semibold"> Selecciona el curso y la fecha de finalización</span> para completar la acción.
                            </p>
                            <form key={volunteerId} onSubmit={handleSubmit(onSubmit)}>
                                <fieldset disabled={isSubmitting}>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="flex-col w-full">
                                            <FormSelect
                                                label="Seleciona un curso"
                                                options={data}
                                                control={control}
                                                name="courseId"
                                                required
                                                icon={<RiBook2Line size={20} />}
                                            />
                                            {errors.courseId && (
                                                <ErrorFormMessage>{errors.courseId.message}</ErrorFormMessage>
                                            )}
                                        </div>
                                        <div className="flex-col w-full">
                                            <FormDate
                                                label="Fecha de finalización de curso"
                                                placeholder="Ingresa la fecha de finalización de curso"
                                                required
                                                register={register}
                                                name="completionDate"
                                            />
                                            {errors.completionDate && (
                                                <ErrorFormMessage>{errors.completionDate.message}</ErrorFormMessage>
                                            )}
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="flex justify-end gap-4.5 mt-6">
                                    <Button
                                        label={isSubmitting ? "Procesando..." : "Agregar curso"}
                                        type="submit"
                                        disabled={isSubmitting}
                                        isLoading={isSubmitting}
                                    />

                                    <button
                                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                        onClick={() => navigate(location.pathname, { replace: true })}
                                        type="button"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </>
                    )
            }
        </Modal>
    );
}

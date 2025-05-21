import Button from "@/components/common/Button/Button";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import FormInput from "@/components/common/FormInput/FormInput";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal/Modal";
import { useVolunteerUpdateMedicalCheckupForm } from "@/hooks/volunteerMedicalCheckup/forms/useVolunteerUpdateMedicalCheckupForm";
import { useUpdateVolunteerMedicalCheckup } from "@/hooks/volunteerMedicalCheckup/mutations/useUpdateVolunteerMedicalCheckup";
import { useEditVolunteerMedicalCheckup } from "@/hooks/volunteerMedicalCheckup/querys/useEditVolunteerMedicalCheckup";
import { MedicalCheckupVolunteerUpdateFormData } from "@/types/volunteerMedicalCheckup";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VolunteerEditMedicalCheckupModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const medicalCheckupId = Number(queryParams.get("medicalCheckupId"));
    const isAssingCourseModal = queryParams.get("edit-medical-checkup");
    const isOpen = Boolean(isAssingCourseModal);

    const [initialValues, setInitialValues] = useState<MedicalCheckupVolunteerUpdateFormData>({
        checkupDate: "",
        expirationDate: "",
        observations: ""
    });

    const { data, isLoading, isError } = useEditVolunteerMedicalCheckup(medicalCheckupId);

    const { register, handleSubmit, formState: { errors }, reset } = useVolunteerUpdateMedicalCheckupForm(initialValues);
    const mutation = useUpdateVolunteerMedicalCheckup();

    useEffect(() => {
        if (isOpen && data) {
            setInitialValues({
                checkupDate: data.checkupDate,
                expirationDate: data.expirationDate,
                observations: data.observations
            });
        }
    }, [isOpen, data]);

    useEffect(() => {
        reset(initialValues);
    }, [initialValues, reset]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleClose = () => {
        navigate(location.pathname, { replace: true });
    };

    const handleForm = async (formData: MedicalCheckupVolunteerUpdateFormData) => {
        setIsSubmitting(true);
        try {
            await mutation.mutateAsync({ medicalCheckupId, formData });
            handleClose();
        } catch (error) {
            console.error("Error al asignar el chequeo médico", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            title={"Editar chequeo médico"}
            isOpen={isOpen}
            onClose={() => navigate(location.pathname, { replace: true })}>
            <p className="text-lg font-thin text-gray-600 mb-6">
                Parece que estás editando un chequeo médico para este voluntario.
                <span className="text-body font-semibold"> Actualiza los datos del chequeo médico.</span>
            </p>

            <form onSubmit={handleSubmit(handleForm)} noValidate>
                {isLoading ? (
                    <Loader />
                ) : isError ? (
                    <p>Error al cargar los datos del reclutamiento.</p>
                ) : (
                    <>
                        <fieldset disabled={isSubmitting}>
                            <div className="w-full">
                                <FormDate
                                    label="Fecha de realización del chequeo médico"
                                    placeholder="Ingresa la fecha en la que se realizó el chequeo"
                                    required
                                    register={register}
                                    name="checkupDate"
                                />
                                {errors.checkupDate && (
                                    <ErrorFormMessage>{errors.checkupDate.message}</ErrorFormMessage>
                                )}
                            </div>
                            <div className="w-full">
                                <FormDate
                                    label="Fecha de caducidad del chequeo médico"
                                    placeholder="Ingresa la fecha de caducidad del chequeo"
                                    required
                                    register={register}
                                    name="expirationDate"
                                />
                                {errors.expirationDate && (
                                    <ErrorFormMessage>{errors.expirationDate.message}</ErrorFormMessage>
                                )}
                            </div>
                            <div className="mb-4.5">
                                <FormInput label="Observaciones" placeholder="Observaciones sobre el chequeo"
                                    register={register}
                                    errors={errors}
                                    name="observations"
                                    type="text" />
                                {errors.observations && (
                                    <ErrorFormMessage>{errors.observations.message}</ErrorFormMessage>
                                )}
                            </div>
                        </fieldset>
                        <div className="flex justify-end gap-4.5 mt-6">
                            <Button
                                label={isSubmitting ? "Procesando..." : "Actualizar chequeo médico"}
                                type="submit"
                                disabled={isSubmitting}
                                isLoading={isSubmitting}
                            />

                            <button
                                className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                onClick={handleClose}
                                type="button"
                            >
                                Cancelar
                            </button>
                        </div>
                    </>
                )}
            </form>
        </Modal>
    );
}
